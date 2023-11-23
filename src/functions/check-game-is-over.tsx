import { Cell, CellNames, CellStateTypes, FieldState, Sides } from "../types/fieldTypes";

const firstDiagonalWinnigCoordinates: CellNames[] = ['0,0', '1,1', '2,2']
const secondDiagonalWinnigCoordinates: CellNames[] = ['2,0', '1,1', '0,2']

export function checkGameIsOver(gameField: FieldState, turn: Sides): CellNames[] | 0 {
    let result: CellNames[] | 0 = 0;
    const gameFieldArray = Object.entries(gameField);

    const crossArray = filterCrossCells(gameFieldArray);
    const zeroArray = filterZeroCells(gameFieldArray);

    // либо совпадают первые координаты у 3 элементов
    // либо совпадают вторые координаты у 3 элементов
    // либо координаты совпадают с конкретным перечнем координат (2 набора по 3 координаты для диагональных побед)
    if (turn = "cross") {
        result = checkForDiagonalWinning(crossArray, firstDiagonalWinnigCoordinates);
        console.log(result);
        if (result) {
            return result;
        }

        result = checkForDiagonalWinning(crossArray, secondDiagonalWinnigCoordinates);
        console.log(result);
        if (result) {
            return result;
        }

        result = checkForRowWinning(crossArray);
        console.log(result);
        if (result) {
            return result;
        }

        result = checkColumnRowWinning(crossArray);
        console.log(result);
        if (result) {
            return result;
        }
    }

    if (turn = 'zero') {
        result = checkForDiagonalWinning(zeroArray, firstDiagonalWinnigCoordinates);
        console.log(result);
        if (result) {
            return result;
        }

        result = checkForDiagonalWinning(zeroArray, secondDiagonalWinnigCoordinates);
        console.log(result);
        if (result) {
            return result;
        }

        result = checkForRowWinning(zeroArray);
        console.log(result);
        if (result) {
            return result;
        }

        result = checkColumnRowWinning(zeroArray);
        console.log(result);
        if (result) {
            return result;
        }
    }
    return result
}

function filterCrossCells(gameFieldArray: [string, Cell][]) {
    return gameFieldArray.filter(elem => {
        if (elem[1][1] === CellStateTypes.cross)
            return elem;
    })
}

function filterZeroCells(gameFieldArray: [string, Cell][]) {
    return gameFieldArray.filter(elem => {
        if (elem[1][1] === CellStateTypes.zero)
            return elem;
    })
}

function checkForDiagonalWinning(array: [string, Cell][], diagonalCoords: CellNames[]): CellNames[] | 0 {
    const winningCoordinates: CellNames[] = [];
    for (let elem of array) {
        const cell = elem[0] as CellNames;
        for (let winCoordinate of diagonalCoords) {
            if (winCoordinate === cell)
                winningCoordinates.push(cell);
            if (winningCoordinates.length === 3)
                return winningCoordinates;
        }
    }
    return 0
}

function checkForRowWinning(array: [string, Cell][]): CellNames[] | 0 {
    let zeroCoordinates = array.filter(elem => {
        if (elem[1][0][0] === 0)
            return true
    })
    if (zeroCoordinates.length === 3) {
        return zeroCoordinates.map(elem => elem[0] as CellNames)
    }

    let firstCoordinates = array.filter(elem => {
        if (elem[1][0][0] === 1)
            return true
    })
    if (firstCoordinates.length === 3) {
        return firstCoordinates.map(elem => elem[0] as CellNames)
    }

    let secondCoordinates = array.filter(elem => {
        if (elem[1][0][0] === 2)
            return true
    })
    if (secondCoordinates.length === 3) {
        return secondCoordinates.map(elem => elem[0] as CellNames)
    }
    return 0;
}

function checkColumnRowWinning(array: [string, Cell][]): CellNames[] | 0 {
    let zeroCoordinates = array.filter(elem => {
        if (elem[1][0][1] === 0)
            return true
    })
    if (zeroCoordinates.length === 3) {
        return zeroCoordinates.map(elem => elem[0] as CellNames)
    }

    let firstCoordinates = array.filter(elem => {
        if (elem[1][0][1] === 1)
            return true
    })
    if (firstCoordinates.length === 3) {
        return firstCoordinates.map(elem => elem[0] as CellNames)
    }

    let secondCoordinates = array.filter(elem => {
        if (elem[1][0][1] === 2)
            return true
    })
    if (secondCoordinates.length === 3) {
        return secondCoordinates.map(elem => elem[0] as CellNames)
    }
    return 0;
}