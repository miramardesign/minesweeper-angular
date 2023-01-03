/* NgRx */
import { createAction, props, Action } from '@ngrx/store';
import {
  CellData,
  GameStateDisplay,
  GameTypesKeys,
} from 'src/assets/types/mineTypes';
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

export const changeGamestateDisplay = createAction(
  GameActionType.CHANGE_GAMESTATE_DISPLAY,
  props<GameState>()
);

export const incrementUncoverCell = createAction(
  GameActionType.INCREMENT_UNCOVER_CELL,
  props<GameState>()
);

export const setUncoverCell = createAction(
  GameActionType.SET_UNCOVER_CELL,
  props<GameState>()
);

//last -===========================
export const resetGame = createAction(
  GameActionType.RESET_GAME,
  props<GameState>()
);

export const setMineData = createAction(
  GameActionType.SET_MINE_DATA,
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

class SetEndAction implements Action {
  readonly type = GameActionType.SET_END;
  constructor(public payload: boolean) {}
}

class UpdateUncoverCellAction implements Action {
  readonly type = GameActionType.UPDATE_UNCOVER_CELL;
  constructor(public payload: number) {}
}

class ChangeGamestateDisplayAction implements Action {
  readonly type = GameActionType.CHANGE_GAMESTATE_DISPLAY;
  constructor(public payload: GameStateDisplay) {}
}

class IncrementUncoverCellAction implements Action {
  readonly type = GameActionType.INCREMENT_UNCOVER_CELL;
  constructor(public payload: GameStateDisplay) {}
}
class SetUncoverCellAction implements Action {
  readonly type = GameActionType.SET_UNCOVER_CELL;
  constructor(public payload: number) {}
}

class IncrementFlagsPlacedAction implements Action {
  readonly type = GameActionType.INCREMENT_FLAGS_PLACED;
}
class DecrementFlagsPlacedAction implements Action {
  readonly type = GameActionType.DECREMENT_FLAGS_PLACED;
}

export class ChooseGridSizeAction implements Action {
  readonly type = GameActionType.RESET_GAME;
  constructor(public payload: GameTypesKeys) {}
}
export class ResetGameAction implements Action {
  readonly type = GameActionType.RESET_GAME;
  constructor(public payload: boolean) {}
}

export class SetMineDataAction implements Action {
  readonly type = GameActionType.SET_MINE_DATA;
  constructor(public payload: CellData[][]) {}
}

export type GameActions =
  | ToggleLostAction
  | SetStartAction
  | SetEndAction
  | UpdateUncoverCellAction
  | ChangeGamestateDisplayAction
  | IncrementUncoverCellAction
  | SetUncoverCellAction
  | IncrementFlagsPlacedAction
  | DecrementFlagsPlacedAction
  | ChooseGridSizeAction
  | ResetGameAction
  | SetMineDataAction;

// type ToggleLostAction = {
//   type: GameActionType.TOGGLE_LOST;
//   //no payload necessary as is bool
// };

// type StartGameAction = {
//   type: GameActionType.SET_START;
//   payload: boolean;
// };

// type EndGameAction = {
//   type: GameActionType.SET_END;
//   payload: boolean;
// };

// type UpdateUncoverCellAction = {
//   type: GameActionType.UPDATE_UNCOVER_CELL;
//   payload: number;
// };

// type ChangeGameStateDisplay = {
//   type: GameActionType.CHANGE_GAMESTATE_DISPLAY;
//   payload: GameStateDisplay;
// };

// type IncrementUncoverCellAction = {
//   type: GameActionType.INCREMENT_UNCOVER_CELL;
// };

// type SetUncoverCellAction = {
//   type: GameActionType.SET_UNCOVER_CELL;
//   payload: number;

// };

// type IncrementFlagsPlaced = {
//   type: GameActionType.INCREMENT_FLAGS_PLACED;
// };

// type DecrementFlagsPlaced = {
//   type: GameActionType.DECREMENT_FLAGS_PLACED;
// };

// type ChooseGridSizeAction = {
//   type: GameActionType.CHOOSE_SIZE;
//   payload: GameTypesKeys;
// };

// type ResetGameAction = {
//   type: GameActionType.RESET_GAME;
//   payload: GameState;
// };

// type GetMineDataAction = {
//   type: GameActionType.SET_MINE_DATA;
//   payload: CellData[][];
// };

// export type GameActionsState =
//   | ToggleLostAction
//   | StartGameAction
//   | EndGameAction
//   | UpdateUncoverCellAction
//   | ChangeGameStateDisplay
//   | IncrementUncoverCellAction
//   | SetUncoverCellAction
//   | IncrementFlagsPlaced
//   | DecrementFlagsPlaced
//   | ChooseGridSizeAction
//   | ResetGameAction;
// | GetMineDataAction;
