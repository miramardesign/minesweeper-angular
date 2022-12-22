import { CellData, GameStateDisplay, GameTypesKeys } from "src/assets/types/mineTypes";


export const gridSizeSeparate: keyof GameTypes = "test";

export const emptyMineDataStructure = getGridDataStructureFromGameConfig(getGameSize(gridSizeSeparate));

export type GameState = {
    isLost: boolean;
    isGameOver: boolean;
    isGameStarted: boolean;
    uncoveredCells: number;
    flagsPlaced: number
    gridSize: GameTypesKeys;
    gameStateDisplay: GameStateDisplay;
    mineData: CellData[][];

};


export const initialState: GameState = {
  isLost: false,
  isGameOver: false,
  isGameStarted: false,
  uncoveredCells: 0,
  flagsPlaced: 0,
  gameStateDisplay: GameStateDisplay.UNSTARTED,
  gridSize: gridSizeSeparate,
 // gridSize: "beginner", 
 
 mineData: emptyMineDataStructure,
//  mineDataOlde:  JSON.parse(JSON.stringify(emptyMineDataStructure)),
};





export function reducer(state = initialState, action): GameState { }