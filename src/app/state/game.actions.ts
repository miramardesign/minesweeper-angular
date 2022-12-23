/* NgRx */
import { createAction, props } from '@ngrx/store';

// https://ngrx.io/guide/store
export const TOGGLE_LOST = '[Game Component] Lost';
export const toggleLost = createAction(TOGGLE_LOST);


export const SET_START = '[Game Component] Start';
export const setStart = createAction(SET_START, props<{isGameStart: boolean}>());

