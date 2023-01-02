import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GameStateDisplay, GameTypes } from 'src/assets/types/mineTypes';
import { GameActionType } from 'src/assets/types/state';
import {
  GameActions,
  setEnd,
  setStart,
  SetStartAction,
  toggleLost,
  ToggleLostAction,
  updateUncoverCell,
} from './game.actions';
import { initGameReducer } from './game.reducer';
import { GameState, initialState } from './state';

/**
 * react redux style dispatch. so i can copy the style of that rpoject.
 * anc call dispatch like 
 * 
 *     dispatch({ type: GameActionType.SET_END, payload: true });
 *    and it will convert to: *     this.store.dispatch(setStart(true));

 */

@Injectable({
  providedIn: 'root',
})
export class dispatchFacade {
  state!: GameState;

  gameState$: Observable<GameState>;

  constructor(private store: Store<{ gameState: GameState }>) {
    // this.state = this.store.select('gameState');

    this.gameState$ = store.select('gameState');
    this.gameState$.subscribe(state => {
      this.state = state;
    })
  }

  dispatch(action: GameActions): void {
    //let state: GameState = initialState;
    //let state: GameState = this.store.select('gameState');

    switch (action.type) {
      case GameActionType.TOGGLE_LOST:
        return this.store.dispatch(toggleLost({...this.state, isLost: true}));
      case GameActionType.SET_START:
        let all = { ...this.gameState$, isGameStarted: true };
        return this.store.dispatch(setStart({ ...this.state, isGameStarted: true }));

      case GameActionType.SET_END:
        return this.store.dispatch(setEnd({...this.state, isGameOver: action.payload }));
      case GameActionType.UPDATE_UNCOVER_CELL:
        return this.store.dispatch(
          updateUncoverCell({...this.state, uncoveredCells: action.payload })
        );

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
      //   return initGameReducer(state);
      default:
        console.error('Action not implemented', action);
        throw new Error();
    }
  }
}
