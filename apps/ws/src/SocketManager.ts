import { randomUUID } from 'crypto';
import { WebSocket } from 'ws';

export class User {
  public socket: WebSocket;
  public id: string;
  public userId: string;

  constructor(socket: WebSocket, userId: string) {
    this.socket = socket;
    this.userId = userId;
    this.id = randomUUID();
  }
}

export class SocketManager {
  private static instance: SocketManager;
  private interestedSockets: Map<string, User[]>;
  private userRoomMappping: Map<string, string>;
  private spectatorSockets: Map<string, User[]>;

  private constructor() {
    this.interestedSockets = new Map<string, User[]>();
    this.userRoomMappping = new Map<string, string>();
    this.spectatorSockets = new Map<string, User[]>();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new SocketManager();
    return this.instance;
  }

  addUser(user: User, roomId: string) {
    this.interestedSockets.set(roomId, [
      ...(this.interestedSockets.get(roomId) || []),
      user,
    ]);
    this.userRoomMappping.set(user.userId, roomId);
  }

  addSpectator(user: User, roomId: string) {
    this.spectatorSockets.set(roomId, [
      ...(this.spectatorSockets.get(roomId) || []),
      user,
    ]);
    this.userRoomMappping.set(user.id, roomId);
  }

  broadcast(roomId: string, message: string) {
    const users = this.interestedSockets.get(roomId);
    if (!users) {
      console.error('No users in room?');
      return;
    }

    users.forEach((user) => {
      user.socket.send(message);
    });
  }

  broadcastToSpectators(roomId: string, message: string) {
    const users = this.spectatorSockets.get(roomId);
    if (!users) {
      console.error('No users in room?');
      return;
    }

    users.forEach((user) => {
      user.socket.send(message);
    });
  }

  removeUser(user: User) {
    const roomId = this.userRoomMappping.get(user.userId);
    if (!roomId) {
      console.error('User was not interested in any room?');
      return;
    }
    const room = this.interestedSockets.get(roomId) || [];
    const remainingUsers = room.filter((u) => u.userId !== user.userId);
    this.interestedSockets.set(roomId, remainingUsers);
    if (this.interestedSockets.get(roomId)?.length === 0) {
      this.interestedSockets.delete(roomId);
    }
    this.userRoomMappping.delete(user.userId);
  }

  removeSpectator(user: User) {
    const roomId = this.userRoomMappping.get(user.id);
    if (!roomId) {
      console.error('User was not interested in any room?');
      return;
    }
    this.spectatorSockets.set(
      roomId,
      (this.spectatorSockets.get(roomId) || []).filter((u) => u !== user),
    );
    if (this.spectatorSockets.get(roomId)?.length === 0) {
      this.spectatorSockets.delete(roomId);
    }

    this.userRoomMappping.delete(user.id);
  }
}
