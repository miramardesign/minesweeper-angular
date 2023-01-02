import { Action, createReducer, on, Store } from '@ngrx/store';
import { InitialState } from '@ngrx/store/src/models';
import { GameStateDisplay, GameTypes } from 'src/assets/types/mineTypes';
import { GameActionType } from 'src/assets/types/state';
// import { GameActions, setEnd, setStart, SetStartAction, toggleLost, ToggleLostAction } from './game.actions';
import { GameState, initialState } from './state';

// export const gameReducerWasFirstWorkingTest = createReducer(
//   initialState,
//   on(toggleLost, (state) => {
//     return {
//       ...state,
//       isLost: !state.isLost,
//       gameStateDisplay: GameStateDisplay.LOSE,
//     };
//   }),
//   on(setStart, (state, { isGameStart }) => {
//     return {
//       ...state,
//       isGameStarted: isGameStart,
//     };
//   }),
//   on(setEnd, (state, { isGameOver }) => {
//     return {
//       ...state,
//       isGameOver: isGameOver,
//     };
//   }),

// );

//trying:
// https://stackblitz.com/edit/angular-ngrx-redux-base?file=src%2Fapp%2Fstore%2Freducers.ts

// export const gameReducerTestFromOther = (state = initialState, action: any)  => {
//   console.log("TEST reducer:", action, 'state---------------');
//   switch (action.type) {

//     case ToggleLostAction.TYPE:
//       return {
//         ...state,
//         isLost: !state.isLost,
//       }
//     case SetStartAction.TYPE:
//       return {
//         ...state,
//         isGameStarted: action.payload,
//       }
//     default:
//       return state;
//   }
// }

/**
 * react redux style dispatch. so i can copy the style of that rpoject.
 * anc call dispatch like 
 * 
 *     dispatch(setStart({isGameStart: true}))
 *    and it will convert to:

 *     this.store.dispatch(setStart(true));
 */
// export const gameReducer = (state: any, action: Action) => {

export const gameReducer = (state = initialState, action: any) => {
  console.log('action');
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
    case GameActionType.RESET_GAME:
      return initGameReducer(action.payload);
    default:
      return state;
      console.error('Action not implemented', action);
      throw new Error();
  }
};

// https://ngrx.io/guide/store
/**
 * reset the game state...
 * @param initialState
 * @returns
 */
export const initGameReducer = (initialState: GameState) => {
  return initialState;
};
