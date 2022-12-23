/* NgRx */
import { createAction, props } from '@ngrx/store';

// https://ngrx.io/guide/store
export const toggleLost = createAction('[Game Component] Lost');


export const SET_START = '[Game Component] start';
export const setStart = createAction(SET_START, props<{isGameStart: boolean}>());

