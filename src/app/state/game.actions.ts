/* NgRx */
import { createAction, props, Action } from '@ngrx/store';
import { InitialState } from '@ngrx/store/src/models';
import { GameActionType, GameState } from './state';

// https://ngrx.io/guide/store

// https://stackblitz.com/edit/angular-ngrx-redux-base?file=src%2Fapp%2Fstore%2Factions.ts

export const toggleLost = createAction(
  GameActionType.TOGGLE_LOST,
  props<GameState>()
);

export const setStart = createAction(
  GameActionType.SET_START,
  props<GameState>()
);

export const setEnd = createAction(GameActionType.SET_END, props<GameState>());

export const updateUncoverCell = createAction(
  GameActionType.SET_END,
  props<GameState>()
);

export const resetGame = createAction(
  GameActionType.RESET_GAME,
  props<GameState>()
);

// https://stackblitz.com/edit/angular-ngrx-redux-base?file=src%2Fapp%2Fstore%2Factions.ts
export class ToggleLostAction implements Action {
  readonly type = GameActionType.TOGGLE_LOST;
  constructor(public payload: boolean) {}
}

export class SetStartAction implements Action {
  readonly type = GameActionType.SET_START;
  constructor(public payload: boolean) {}
}

export class SetEndAction implements Action {
  readonly type = GameActionType.SET_END;
  constructor(public payload: boolean) {}
}

export class UpdateUncoverCellAction implements Action {
  readonly type = GameActionType.UPDATE_UNCOVER_CELL;
  constructor(public payload: number) {}
}

//last
export class ResetGameAction implements Action {
  readonly type = GameActionType.RESET_GAME;
  constructor(public payload: boolean) {}
}

export type GameActions =
  | ToggleLostAction
  | SetStartAction
  | SetEndAction
  | UpdateUncoverCellAction
  | ResetGameAction;
