import {
  CellData,
  GameStateDisplay,
  GameTypes,
  GameTypesKeys,
} from 'src/assets/types/mineTypes';
import { GameActions, GameActionType } from 'src/assets/types/state';

export const gridSizeSeparate: keyof GameTypes = 'test';

// export const emptyMineDataStructure = getGridDataStructureFromGameConfig(getGameSize(gridSizeSeparate));

export type GameState = {
  isLost: boolean;
  isGameOver: boolean;
  isGameStarted: boolean;
  uncoveredCells: number;
  flagsPlaced: number;
  gridSize: GameTypesKeys;
  gameStateDisplay: GameStateDisplay;
  mineData: CellData[][]; //emptyMineDataStructure
};

export const initialState: GameState = {
  isLost: false,
  isGameOver: false,
  isGameStarted: false,
  uncoveredCells: 0,
  flagsPlaced: 0,
  gameStateDisplay: GameStateDisplay.UNSTARTED,
  //ridSize: gridSizeSeparate,
  gridSize: 'beginner',

  //mineData: emptyMineDataStructure,
  mineData: [],
  //  mineDataOlde:  JSON.parse(JSON.stringify(emptyMineDataStructure)),
};

/**
 * reset the game state...
 * @param initialState
 * @returns
 */
const initReducer = (initialState: GameState) => {
  return initialState;
};

export function reducer(state = initialState, action: GameActions): GameState {
  switch (action.type) {
    case GameActionType.TOGGLE_LOST:
      return {
        ...state,
        isLost: !state.isLost,
        gameStateDisplay: GameStateDisplay.LOSE,
      };
    case GameActionType.SET_START:
      return {
        ...state,
        isGameStarted: action.payload,
      };
    case GameActionType.SET_END:
      return {
        ...state,
        isGameOver: action.payload,
      };
    case GameActionType.UPDATE_UNCOVER_CELL:
      return {
        ...state,
        uncoveredCells: action.payload,
      };
    case GameActionType.CHANGE_GAMESTATE_DISPLAY:
      return {
        ...state,
        gameStateDisplay: action.payload,
      };
    case GameActionType.INCREMENT_UNCOVER_CELL:
      return {
        ...state,
        uncoveredCells: state.uncoveredCells + 1,
      };

    case GameActionType.INCREMENT_FLAGS_PLACED:
      return {
        ...state,
        flagsPlaced: state.flagsPlaced + 1,
      };
    case GameActionType.DECREMENT_FLAGS_PLACED:
      return {
        ...state,
        flagsPlaced: state.flagsPlaced - 1,
      };
    case GameActionType.CHOOSE_SIZE:
      return {
        ...state,
        gridSize: action.payload,
      };
    case GameActionType.SET_MINE_DATA:
      return {
        ...state,
        mineData: action.payload,
      };
    // case GameActionType.SET_MINE_DATA_OLDE:
    //   return {
    //     ...state,
    //     mineDataOlde: action.payload,
    //   };
    case GameActionType.RESET_GAME:
      return initReducer(action.payload);
    default:
      console.error('Action not implemented', action);
      throw new Error();
  }
}
