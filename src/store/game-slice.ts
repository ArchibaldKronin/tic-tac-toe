import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CellNames, CellStateTypes, GameState } from "../types/fieldTypes";
import { RootState } from "./store";
import { checkGameIsOver } from "../functions/check-game-is-over";

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
    isOver: false,
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        changeCellState: (state, action: PayloadAction<CellNames>) => {
            const cellCoordinates = action.payload;

            state.field[cellCoordinates][1] = state.turn === "cross" ? CellStateTypes.cross : CellStateTypes.zero;
            state.field[cellCoordinates][2] = false;
            if (checkGameIsOver(state.field, state.turn)) {
                for (let cell of Object.entries(state.field)) {
                    state.field[cell[0] as CellNames][2] = false;
                }
                state.isOver = true;
            }
        },
        changeTurn: (state) => {
            if (state.isOver) return

            if (state.turn === "cross") {
                state.turn = "zero";
            }
            else {
                state.turn = "cross";
            }
        },
        resetAllCells: (state) => {
            state.field = initialState.field;
            state.turn = initialState.turn;
            state.isOver = false;
        },
    }
})

export const { resetAllCells, changeCellState, changeTurn } = gameSlice.actions;
export const selectField = (state: RootState) => state.game.field;
export const selectTurn = (state: RootState) => state.game.turn;
export const selectIsOver = (state: RootState) => state.game.isOver;
export default gameSlice.reducer;