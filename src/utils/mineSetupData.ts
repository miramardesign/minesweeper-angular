import { GameTypes, PerimeterDirectionsOffsets } from "src/assets/types/mineTypes";

 
  // Some notes on terminology: The three official board sizes are Beginner
  // (8x8 with 10 mines), Intermediate (16x16 with 40 mines), and Expert (16x30 with 99 mines).

export const GameSizes: GameTypes = {
    test:  {
      rows: 5,
      cols: 5,
      mines: 5,
    },
    beginner:  {
      rows: 8,
      cols: 8,
      mines: 10,
    },
    intermediate: {
      rows: 16,
      cols: 16,
      mines: 40,
    },
    expert: {
      rows: 16,
      cols: 30,
      mines: 99,
    },
  };


/**
 * basically defines the relative position of the directions.
 * so i could loop thru them instead of hard-coding.
 */
export const PERIMETER_CELLS_OFFSETS: PerimeterDirectionsOffsets = {
  northWest: {
    iRow: -1,
    iCol: -1,
  },
  north: {
    iRow: -1,
    iCol: 0,
  },
  northEast: { iRow: -1, iCol: 1 },

  west: { iRow: 0, iCol: -1 },
  east: { iRow: 0, iCol: 1 },

  southWest: {
    iRow: 1,
    iCol: -1,
  },
  south: {
    iRow: 1,
    iCol: 0,
  },
  southEast: { iRow: 1, iCol: 1 },
};
 
 