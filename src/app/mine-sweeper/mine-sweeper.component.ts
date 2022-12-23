import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  CellData,
  GameTypes,
  PerimeterDirections,
} from 'src/assets/types/mineTypes';
import { setStart, toggleLost } from '../state/game.actions';
import { GameSizes } from 'src/utils/mineSetupData';
import { GameState } from 'src/assets/types/state';
@Component({
  selector: 'app-mine-sweeper',
  templateUrl: './mine-sweeper.component.html',
  styleUrls: ['./mine-sweeper.component.scss'],
})
export class MineSweeperComponent implements OnInit {
  gameState$: Observable<GameState>;

  dispatch: any;
  constructor(private store: Store<{ gameState: GameState }>) {
    this.gameState$ = store.select('gameState');
    this.dispatch = this.store.dispatch;
  }

  gridSize: number = 8;

  isLose: boolean = false;
  isWin: boolean = false;

  minesPlaced = 0;
  flagsPlaced = 0;
  cellsUncovered = 0;

  //make selector.
  gameSizeChosen: string = 'intermediate';

  mineData: CellData[][] = this.getMineData();

  ngOnInit(): void {
    console.log('minesPlaced', this.minesPlaced);
    this.setNumAdjMineData(this.mineData);

  }
 
  placeMines(
    mineData: CellData[][],
    numRows: number,
    numCols: number,
    numMines: number
  ) {
    let minesPlacedLocal = 0;

    while (minesPlacedLocal < numMines) {
      let rowRand = this.getRandInt(0, numRows);
      let colRand = this.getRandInt(0, numCols);

      if (this.existsCell(mineData, rowRand, colRand)) {
        let cell = mineData[rowRand][colRand];

        //choose other celll.
        if (cell.hasMine) {
          console.log('mine collision');
        } else {
          cell.hasMine = true;

          minesPlacedLocal++;
        }
      }
    }

    this.minesPlaced = minesPlacedLocal;

    return mineData;
  }

  getMineData() {
    let numRows = GameSizes[this.gameSizeChosen as keyof GameTypes].rows;
    let numCols = GameSizes[this.gameSizeChosen as keyof GameTypes].cols;
    let numMines = GameSizes[this.gameSizeChosen as keyof GameTypes].mines;

    let mineData = new Array(numRows).fill([]).map(() => {
      return new Array(numCols).fill({}).map((element: CellData) => {
        return {
          hasMine: false,
          markedAs: '',
          uncovered: false,
          numAdjMines: 0,
        };
      });
    });

    mineData = this.placeMines(mineData, numRows, numCols, numMines);

    return mineData;
  }

  getRandInt(min: number, max: number) {
    return Math.floor(Math.random() * max);
  }

  existsCell(mineData: CellData[][], iRow: number, iCol: number) {
    // console.log('existscelllllllllllllll', iRow);
    //row doesnt exist
    if (mineData[iRow] === undefined) {
      return false;
    }

    //col doesnt exist
    if (mineData[iRow][iCol] === undefined) {
      return false;
    }

    return true;
  }

  /**
   * pass in a row and col and return if hasMine,
   * returning false if doesnt exist (so the edges dont fail)
   * @param mineData
   * @param iRow
   * @param iCol
   * @returns
   */
  existsAndIsMine(mineData: CellData[][], iRow: number, iCol: number) {
    //depp bc looper already calls.
    if (!this.existsCell(mineData, iRow, iCol)) {
      return false;
    }

    //exists but is false
    if (mineData[iRow][iCol] && !mineData[iRow][iCol].hasMine) {
      return false;
    }

    //exists and is true.
    if (mineData[iRow][iCol] && mineData[iRow][iCol].hasMine) {
      return true;
    }

    return false;
  }

  /**
   * run a cb on every adj cell of a given cell by iCol and iRow
   * @param mineData
   * @param iRow
   * @param iCol
   * @param cb
   */
  loopAdjCells(mineData: CellData[][], iRow: number, iCol: number, cb: any) {
    let perimeter: PerimeterDirections = {
      northWest: {
        iRow: iRow - 1,
        iCol: iCol - 1,
      },
      north: {
        iRow: iRow - 1,
        iCol: iCol,
      },
      northEast: { iRow: iRow - 1, iCol: iCol + 1 },

      west: { iRow: iRow, iCol: iCol - 1 },
      east: { iRow: iRow, iCol: iCol + 1 },

      southWest: {
        iRow: iRow + 1,
        iCol: iCol - 1,
      },
      south: {
        iRow: iRow + 1,
        iCol: iCol,
      },
      southEast: { iRow: iRow + 1, iCol: iCol + 1 },
    };

    Object.entries(perimeter).forEach(([key, cell], index) => {
      // console.log(key, '-----direction', cell);

      if (this.existsCell(mineData, cell.iRow, cell.iCol)) {
        cb(mineData, cell.iRow, cell.iCol);
      }
    });
  }

  /**
   * put the adjacent mine date in the mine data.
   * @param mineData
   */
  setNumAdjMineData(mineData: CellData[][]) {
    mineData.map((row, iRow) => {
      //  console.log('row' + index, row);
      row.map((cell, iCol) => {
        cell.numAdjMines = 0;
        this.loopAdjCells(
          this.mineData,
          iRow,
          iCol,
          (mineData: CellData[][], iRow: number, iCol: number) => {
            // console.log('cb', mineData, iRow, iCol);

            if (this.existsAndIsMine(mineData, iRow, iCol)) {
              cell.numAdjMines++;
            }
          }
        );
      });
    });
  }

  goTurn(iRow: number, iCol: number, mineData: CellData[][]) {
    //already lost.

    this.store.dispatch(setStart({isGameStart: true}))
    //this.dispatch(setStart({isGameStart: true}))
    if (this.isLose) {
      return;
    }

    console.log('clicked row ', iRow, 'col', iCol);

    if (this.isMine(iRow, iCol, mineData)) {
      this.onLoseCondition(iRow, iCol);
    } else {
      this.uncoverCell(iRow, iCol, mineData);
    }
  }

  getCellsLeft(
    gridRows: number,
    gridCols: number,
    minesPlaced: number,
    cellsUncovered: number
  ) {
    return gridRows * gridCols - (minesPlaced + cellsUncovered);
  }

  uncoverAllCells(mineData: CellData[][]) {
    mineData.map((row, iRow) => {
      row.map((cell, iCol) => {
        this.mineData[iRow][iCol].uncovered = true;
      });
    });
  }

  uncoverCell(iRow: number, iCol: number, mineData: CellData[][]) {
    //if already uncovered
    if (mineData[iRow][iCol].uncovered) {
      return;
    }

    mineData[iRow][iCol].uncovered = true;
    this.cellsUncovered++;

    mineData[iRow][iCol].markedAs = 'uncovered';
    this.uncoverAdjacentZeroSqs(iRow, iCol);

    let cellsLeft = this.getCellsLeft(
      this.gridSize,
      this.gridSize,
      this.minesPlaced,
      this.cellsUncovered
    );

    this.mineData = mineData;

    console.log('cellsleft---------', cellsLeft);
    if (cellsLeft === 0) {
      this.uncoverAllCells(this.mineData);
      window.setTimeout(() => {
        window.alert('epic Win!!!1111');
      }, 500);
    }
  }

  /**
   * probably need to loop via...
   * @param iRow
   * @param iCol
   */
  uncoverAdjacentZeroSqs(iRow: number, iCol: number) {
    if (this.mineData[iRow][iCol].numAdjMines === 0) {
      console.log('todo uncover zero cells near here');
      this.loopAdjCells(
        this.mineData,
        iRow,
        iCol,
        (mineData: CellData[][], iRow: number, iCol: number) => {
          // console.log('cb', mineData, iRow, iCol);

          let cell = mineData[iRow][iCol];
          if (cell.numAdjMines < 4) {
            if (!cell.uncovered) {
              cell.uncovered = true;
              this.cellsUncovered++;

              //call neighborcells recursion!!---
              this.uncoverAdjacentZeroSqs(iRow, iCol);
            }
          }
        }
      );
    } else {
    }
  }

  isMine(iRow: number, iCol: number, mineData: CellData[][]) {
    return mineData[iRow][iCol].hasMine;
  }

  //just marks as bomb on 1st right click, as question on 2nd and clears on third,
  onRightClick(iRow: number, iCol: number) {
    console.log('right click?????????????', iRow, iCol);

    let cell = this.mineData[iRow][iCol];

    if (cell.uncovered) {
      return false;
    }

    if (cell.markedAs === '') {
      cell.markedAs = 'flag';
      this.flagsPlaced++;
      //its really a flag, the mines are only shown on lose.
    } else if (cell.markedAs === 'flag') {
      this.flagsPlaced--;
      cell.markedAs = 'question';
    } else if (cell.markedAs === 'question') {
      cell.markedAs = '';
    }

    return false;
  }

  onMiddleClick($event: any, iRow: number, iCol: number) {
    if ($event.button === 1) {
      console.log('middle click', $event.button);
      console.log('on row/col', iRow, '/', iCol);

      return;
    }
  }

  onLoseCondition(iRow: number, iCol: number) {
    this.store.dispatch(toggleLost());
    this.mineData[iRow][iCol].markedAs = 'exploded';
    this.uncoverAllCells(this.mineData);
    window.setTimeout(() => {
      window.alert('boom!');
    }, 500);
  }

  onWinCondition() {
    this.isWin = true;
  }

  resetGrid() {
    this.minesPlaced = 0;
    this.isLose = false;
    this.mineData = this.getMineData();
    this.setNumAdjMineData(this.mineData);
    this.cellsUncovered = 0;
    // this.uncoverAllCells(this.mineData);
  }
}
