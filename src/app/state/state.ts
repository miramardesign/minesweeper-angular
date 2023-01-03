import {
  GameTypesKeys,
  GameStateDisplay,
  CellData,
  GameTypes,
} from 'src/assets/types/mineTypes';
import {
  getGridDataStructureFromGameConfig,
  getGameSize,
} from '../utils/mineSetup';

export type GameState = {
  isLost: boolean;
  isGameOver: boolean;
  isGameStarted: boolean;
  uncoveredCells: number;
  flagsPlaced: number;
  gridSize: GameTypesKeys;
  gameStateDisplay: GameStateDisplay;
  mineData: CellData[][];
};

export enum GameActionType {
  TOGGLE_LOST = 'TOGGLE_LOST',
  SET_START = 'TOGGLE_START',
  SET_END = 'SET_END',
  UPDATE_UNCOVER_CELL = 'UPDATE_UNCOVER_CELL',
  CHANGE_GAMESTATE_DISPLAY = 'CHANGE_GAMESTATE_DISPLAY',
  INCREMENT_UNCOVER_CELL = 'INCREMENT_UNCOVER_CELL',
  SET_UNCOVER_CELL = 'SET_UNCOVER_CELL',
  INCREMENT_FLAGS_PLACED = 'INCREMENT_FLAGS_PLACED',
  DECREMENT_FLAGS_PLACED = 'DECREMENT_FLAGS_PLACED',
  CHOOSE_SIZE = 'CHOOSE_SIZE',
  RESET_GAME = 'RESET_GAME',
  SET_MINE_DATA = 'SET_MINE_DATA',
}

export const gridSizeSeparate: keyof GameTypes = 'test';

export const emptyMineDataStructure = getGridDataStructureFromGameConfig(
  getGameSize(gridSizeSeparate)
);

export const initialState: GameState = {
  isLost: false,
  isGameOver: false,
  isGameStarted: false,
  uncoveredCells: 99990,
  flagsPlaced: 0,
  gameStateDisplay: GameStateDisplay.UNSTARTED,
  gridSize: gridSizeSeparate,

  //mineData: emptyMineDataStructure,
  mineData: [],
};
