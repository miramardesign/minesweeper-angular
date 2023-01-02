/* NgRx */
import { createAction, props, Action } from '@ngrx/store';
import { GameActionType } from './state';

// https://ngrx.io/guide/store

export const toggleLost = createAction(GameActionType.TOGGLE_LOST);

export const setStart = createAction(
  GameActionType.SET_START,
  props<{ isGameStart: boolean }>()
);

export const setEnd = createAction(
  GameActionType.SET_END,
  props<{ isGameOver: boolean }>()
);


// https://stackblitz.com/edit/angular-ngrx-redux-base?file=src%2Fapp%2Fstore%2Factions.ts
export class ToggleLostAction implements Action {
  readonly type = GameActionType.TOGGLE_LOST;
  //constructor(public payload: any) {}
  constructor(public payload: { payload: any }) { }

}

export class SetStartAction implements Action {
  readonly type = GameActionType.SET_START
  //onstructor(public payload: any) {}
  constructor(public payload: { payload: any }) { }

}

export type GameActions = ToggleLostAction | SetStartAction;
