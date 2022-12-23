import { createReducer, on } from '@ngrx/store';
import {
  GameStateDisplay,
  GameTypes,
} from 'src/assets/types/mineTypes';
import { GameActions, GameActionType, GameState } from 'src/assets/types/state';
import { toggleLost} from './game.actions';

export const gridSizeSeparate: keyof GameTypes = 'test';

// export const emptyMineDataStructure = getGridDataStructureFromGameConfig(getGameSize(gridSizeSeparate));

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
};

// https://ngrx.io/guide/store
/**
 * reset the game state...
 * @param initialState
 * @returns
 */
const initReducer = (initialState: GameState) => {
  return initialState;
};

export const gameReducer = createReducer(
  initialState,
  on(toggleLost, (state) => {
    console.log('toggle lost called with state', state);
    return {
      ...state,
      isLost: !state.isLost,
      gameStateDisplay: GameStateDisplay.LOSE,
    };
  }),
  // on(setStart, (state, {isGameStart}) => {
  //   console.log('setStart called with state', state);

  //   return {
  //     ...state,
  //     isGameStarted: isGameStart
  //   };
 //}),
);

export function OldeReactReducer(
  state = initialState,
  action: GameActions
): GameState {
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
