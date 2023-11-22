import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CellNames, CellStateTypes, GameState } from "../types/fieldTypes";
import { RootState } from "./store";

const initialState: GameState = {
    field: {
        "0,0": [[0, 0], CellStateTypes.empty, true],
        "0,1": [[0, 1], CellStateTypes.empty, true],
        "0,2": [[0, 2], CellStateTypes.empty, true],
        "1,0": [[1, 0], CellStateTypes.empty, true],
        "1,1": [[1, 1], CellStateTypes.empty, true],
        "1,2": [[1, 2], CellStateTypes.empty, true],
        "2,0": [[2, 0], CellStateTypes.empty, true],
        "2,1": [[2, 1], CellStateTypes.empty, true],
        "2,2": [[2, 2], CellStateTypes.empty, true],
    },
    turn: "cross",
}
// Добавить для каждой ячейки значение activ: boolean, по которой уже проверять, 
// активна ли ячейка для нажатия (в компоненте cell-element)
// Сбрасывать при Resete
const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        changeCellState: (state, action: PayloadAction<CellNames>) => {
            const cellCoordinates = action.payload;

            state.field[cellCoordinates][1] = state.turn === "cross" ? CellStateTypes.cross : CellStateTypes.zero;
            state.field[cellCoordinates][2] = false;
        },
        changeTurn: (state) => {
            if (state.turn === "cross") {
                state.turn = "zero";
            }
            else {
                state.turn = "cross";
            }
        },
        ResetAllCells: (state) => {
            state.field = initialState.field;
            state.turn=initialState.turn;
        },
    }
})

export const { ResetAllCells, changeCellState, changeTurn } = gameSlice.actions;
export const selectField = (state: RootState) => state.game.field;
export const selectTurn = (state: RootState) => state.game.turn;
export default gameSlice.reducer;