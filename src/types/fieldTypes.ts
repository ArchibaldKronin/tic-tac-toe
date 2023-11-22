type EnableNumbersCoordinates = 0 | 1 | 2;

export type CellCoordinates = [EnableNumbersCoordinates, EnableNumbersCoordinates];

export enum CellStateTypes {
    empty = 'EMPTY',
    cross = 'CROSS',
    zero = 'ZERO'
}

export type Cell = [CellCoordinates, CellStateTypes, boolean];

export type CellNames = '0,0' | '0,1' | '0,2' | '1,0' | '1,1' | '1,2' | '2,0' | '2,1' | '2,2';

export type FieldState = Record<CellNames, Cell>

export type Sides = 'cross' | 'zero';

export interface GameState {
    field: FieldState;
    turn: Sides;
}