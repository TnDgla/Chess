import { WebSocket } from 'ws';
import {
  INIT_GAME,
  JOIN_GAME,
  MOVE,
  OPPONENT_DISCONNECTED,
  JOIN_ROOM,
  GAME_JOINED,
  GAME_NOT_FOUND,
  GAME_ALERT,
  GAME_ADDED,
  RESIGN,
  GAME_OVER,
  OFFER_DRAW,
  DRAW_OFFER_ACCEPTED,
} from './messages';
import { Game, isPromoting } from './Game';
import { db } from './db';
import { SocketManager, User } from './SocketManager';
import { Square } from 'chess.js';

export class GameManager {
  private games: Game[];
  private pendingGameId: string | null;
  private users: User[];

  constructor() {
    this.games = [];
    this.pendingGameId = null;
    this.users = [];
  }

  addUser(user: User) {
    this.users.push(user);
    this.addHandler(user);
  }

  removeUser(socket: WebSocket) {
    const user = this.users.find((user) => user.socket !== socket);
    if (!user) {
      console.error('User not found?');
      return;
    }
    this.users = this.users.filter((user) => user.socket !== socket);
    SocketManager.getInstance().removeUser(user);
  }

  private addHandler(user: User) {
    user.socket.on('message', async (data) => {
      const message = JSON.parse(data.toString());
      if (message.type === INIT_GAME) {
        if (this.pendingGameId) {
          const game = this.games.find((x) => x.gameId === this.pendingGameId);
          if (!game) {
            console.error('Pending game not found?');
            return;
          }
          if (user.userId === game.player1UserId) {
            SocketManager.getInstance().broadcast(
              game.gameId,
              JSON.stringify({
                type: GAME_ALERT,
                payload: {
                  message: 'Trying to Connect with yourself?',
                },
              }),
            );
            return;
          }
          SocketManager.getInstance().addUser(user, game.gameId);
          await game?.updateSecondPlayer(user.userId);
          this.pendingGameId = null;
        } else {
          const game = new Game(user.userId, null);
          this.games.push(game);
          this.pendingGameId = game.gameId;
          SocketManager.getInstance().addUser(user, game.gameId);
          SocketManager.getInstance().broadcast(
            game.gameId,
            JSON.stringify({
              type: GAME_ADDED,
            }),
          );
        }
      }

      if (message.type === MOVE) {
        const gameId = message.payload.gameId;
        const game = this.games.find((game) => game.gameId === gameId);
        if (game) {
          game.makeMove(user, message.payload.move);
        }
      }

      if (message.type === JOIN_ROOM) {
        const gameId = message.payload?.gameId;
        if (!gameId) {
          return;
        }

        const availableGame = this.games.find((game) => game.gameId === gameId);
        const gameFromDb = await db.game.findUnique({
          where: { id: gameId },
          include: {
            moves: {
              orderBy: {
                moveNumber: 'asc',
              },
            },
            blackPlayer: true,
            whitePlayer: true,
          },
        });
        if (!gameFromDb) {
          user.socket.send(
            JSON.stringify({
              type: GAME_NOT_FOUND,
            }),
          );
          return;
        }

        if (!availableGame) {
          const game = new Game(
            gameFromDb?.whitePlayerId!,
            gameFromDb?.blackPlayerId!,
          );
          gameFromDb?.moves.forEach((move) => {
            if (
              isPromoting(game.board, move.from as Square, move.to as Square)
            ) {
              game.board.move({
                from: move.from,
                to: move.to,
                promotion: 'q',
              });
            } else {
              game.board.move({
                from: move.from,
                to: move.to,
              });
            }
          });
          this.games.push(game);
        }

        user.socket.send(
          JSON.stringify({
            type: GAME_JOINED,
            payload: {
              gameId,
              moves: gameFromDb.moves,
              blackPlayer: {
                id: gameFromDb.blackPlayer.id,
                name: gameFromDb.blackPlayer.name,
              },
              whitePlayer: {
                id: gameFromDb.whitePlayer.id,
                name: gameFromDb.whitePlayer.name,
              },
            },
          }),
        );

        SocketManager.getInstance().addUser(user, gameId);
      }

      if (message.type === RESIGN) {
        SocketManager.getInstance().broadcast(
          message.payload.gameId,
          JSON.stringify({
            type: GAME_OVER,
            payload: {
              result: `${message.payload.myColor} resigned. ${message.payload.myColor === 'white' ? 'Black' : 'White'} wins!!!`,
            },
          }),
        );
      }

      if (message.type === OFFER_DRAW) {
        SocketManager.getInstance().broadcast(
          message.payload.gameId,
          JSON.stringify({
            type: OFFER_DRAW,
            payload: {
              from: message.payload.myColor,
              id: message.payload.myId,
            },
          }),
        );
      }

      if (message.type === DRAW_OFFER_ACCEPTED) {
        SocketManager.getInstance().broadcast(
          message.payload.gameId,
          JSON.stringify({
            type: GAME_OVER,
            payload: {
              result: 'Draw Accepted! Game is Draw!!!!',
            },
          }),
        );
      }
    });
  }
}
