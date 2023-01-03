import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GameStateDisplay, GameTypes } from 'src/assets/types/mineTypes';
import { GameActionType } from 'src/assets/types/state';
import {
  changeGamestateDisplay,
  GameActions,
  resetGame,
  setEnd,
  setStart,
  setUncoverCell,
  toggleLost,
  updateUncoverCell,
} from './game.actions';
import { initGameReducer } from './game.reducer';
import { GameState, initialState } from './state';

/**
 * react redux style dispatch. so i can copy the style of that project.
 * anc call dispatch like 
 * 
 *     dispatch({ type: GameActionType.SET_END, payload: true });
 *    and it will convert to: *     this.store.dispatch(setEnd(true));

 */
@Injectable({
  providedIn: 'root',
})
export class dispatchFacade {
  state!: GameState;

  gameState$: Observable<GameState>;

  constructor(private store: Store<{ gameState: GameState }>) {

    this.gameState$ = store.select('gameState');
    this.gameState$.subscribe(state => {
      this.state = state;
    })
  }

  dispatch(action: GameActions): void {

    const dispatch = this.store.dispatch;

    switch (action.type) {
      case GameActionType.TOGGLE_LOST:
        return dispatch( toggleLost({...this.state, isLost: true}));
      case GameActionType.SET_START:
        return dispatch(setStart({ ...this.state, isGameStarted: true }));
      case GameActionType.SET_END:
        return dispatch(setEnd({...this.state, isGameOver: action.payload }));
      case GameActionType.UPDATE_UNCOVER_CELL:
        return dispatch(
          updateUncoverCell({...this.state, uncoveredCells: action.payload })
        );
      case GameActionType.CHANGE_GAMESTATE_DISPLAY:
        return dispatch(
          changeGamestateDisplay({...this.state, gameStateDisplay: action.payload })
        );
      case GameActionType.SET_UNCOVER_CELL:
        return dispatch(
          setUncoverCell({...this.state, uncoveredCells: action.payload })
        );
      case GameActionType.INCREMENT_FLAGS_PLACED:
        return dispatch(
          incrementFlagsPlaced({...this.state })
        );
      case GameActionType.DECREMENT_FLAGS_PLACED:
        return dispatch(
          incrementFlagsPlaced({...this.state })
        );


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
      case GameActionType.RESET_GAME:
         return dispatch(
          resetGame({...initialState})
        );
      default:
        console.error('Action not implemented', action);
        throw new Error();
    }
  }
}
function incrementFlagsPlaced(arg0: { uncoveredCells: any; isLost: boolean; isGameOver: boolean; isGameStarted: boolean; flagsPlaced: number; gridSize: keyof GameTypes; gameStateDisplay: GameStateDisplay; mineData: import("src/assets/types/mineTypes").CellData[][]; }): any {
  throw new Error('Function not implemented.');
}

