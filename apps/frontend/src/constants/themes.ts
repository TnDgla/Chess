import { THEME } from '@/context/themeContext';

export type THEME_DATA = {
  id: number;
  name: THEME;
  background: string;
  buttonColor: string;
  'board-light': string;
  'board-dark': string;
  'board-image': string;
};

export const THEMES_DATA: THEME_DATA[] = [
  {
    id: 1,
    name: 'default',
    background: '#302E2B',
    buttonColor: '#16a34a',
    'board-light': '#EBECD0',
    'board-dark': '#739552',
    'board-image': 'https://www.chess.com/bundles/web/images/offline-play/standardboard.1d6f9426.png',
  },
  {
    id: 2,
    name: 'bubblegum',
    background: '#E6455E',
    buttonColor: '#FBD9E1',
    'board-light': '#FEFFFE',
    'board-dark': '#FBD9E1',
    'board-image':
      'https://res.cloudinary.com/dcugqfvvg/image/upload/e_improve,e_sharpen/v1718047051/screenshot-localhost_5173-2024.06.11-00_44_01_pxwr43.png',
  },
  {
    id: 3,
    name: 'Blue',
    background: '#030712',
    buttonColor: '#164e63',
    'board-light': '#cffafe',
    'board-dark': '#164e63',
    'board-image':
      'https://thumbs.dreamstime.com/b/chess-board-blue-colors-chess-pieces-vector-illustration-241711727.jpg',
  },
  {
    id: 4,
    name: 'Violet',
    background: '#6b7280',
    buttonColor: '#3b0764',
    'board-light': '#d8b4fe',
    'board-dark': '#4338ca',
    'board-image':
      'https://thumbs.dreamstime.com/b/chess-board-blue-colors-chess-pieces-vector-illustration-241711727.jpg',
  },
  {
    id: 5,
    name: 'Red',
    background: '#fda4af',
    buttonColor: '#e11d48',
    'board-light': '#fecdd3',
    'board-dark': '#e11d48',
    'board-image':
      'https://thumbs.dreamstime.com/b/chess-board-blue-colors-chess-pieces-vector-illustration-241711727.jpg',
  },
];
