import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { GameStateDisplay, GameTypes } from 'src/assets/types/mineTypes';
import { GameActionType } from 'src/assets/types/state';
import {
  GameActions,
  setEnd,
  setStart,
  SetStartAction,
  toggleLost,
  ToggleLostAction,
} from './game.actions';
import { GameState, initialState } from './state';

/**
 * react redux style dispatch. so i can copy the style of that rpoject.
 * anc call dispatch like 
 * 
 *     dispatch({ type: GameActionType.SET_END, payload: true });
 *    and it will convert to:
 *     this.store.dispatch(setStart(true));

 */

@Injectable({
  providedIn: 'root',
})
export class dispatchFacade {
  constructor(private store: Store<{ gameState: GameState }>) {}

  dispatch(action: GameActions): void {
    switch (action.type) {
      case GameActionType.TOGGLE_LOST:
        return this.store.dispatch(toggleLost());
      case GameActionType.SET_START:
        return this.store.dispatch(setStart({ isGameStart: true }));

      case GameActionType.SET_END:
        return this.store.dispatch(setEnd({ isGameOver: action.payload }));
      // case GameActionType.UPDATE_UNCOVER_CELL:
      // return {
      //   ...state,
      //   uncoveredCells: action.payload,
      // };
      // case GameActionType.CHANGE_GAMESTATE_DISPLAY:
      //   return {
      //     ...state,
      //     gameStateDisplay: action.payload,
      //   };
      // case GameActionType.INCREMENT_UNCOVER_CELL:
      //   return {
      //     ...state,
      //     uncoveredCells: state.uncoveredCells + 1,
      //   };

      // case GameActionType.INCREMENT_FLAGS_PLACED:
      //   return {
      //     ...state,
      //     flagsPlaced: state.flagsPlaced + 1,
      //   };
      // case GameActionType.DECREMENT_FLAGS_PLACED:
      //   return {
      //     ...state,
      //     flagsPlaced: state.flagsPlaced - 1,
      //   };
      // case GameActionType.CHOOSE_SIZE:
      //   return {
      //     ...state,
      //     gridSize: action.payload,
      //   };
      // case GameActionType.SET_MINE_DATA:
      //   return {
      //     ...state,
      //     mineData: action.payload,
      //   };
      // case GameActionType.RESET_GAME:
      //   return initGameReducer(action.payload);
      default:
        console.error('Action not implemented', action);
        throw new Error();
    }
  }
}
