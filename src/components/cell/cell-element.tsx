import { useEffect, useState } from 'react'
import { Cell, CellNames, CellStateTypes } from '../../types/fieldTypes'
import { CrossIcon } from '../cross-icon'
import { ZeroIcon } from '../zero-icon'
import { changeCellState, changeTurn } from '../../store/game-slice';
import { useAppDispatch } from '../../store/store';
import styles from './cell-element.module.css'

export const CellElement = ({ cellParams }: { cellParams: Cell }) => {
    const stringCoordinates: CellNames = cellParams[0][0].toString() + ',' + cellParams[0][1].toString() as CellNames

    const dispatch = useAppDispatch();

    const [cellState, setCellState] = useState<CellStateTypes>(cellParams[1]);


    useEffect(() => {
        setCellState(cellParams[1])
    }, [cellParams[1]])

    function handleClick(cellCoordinates: CellNames) {
        dispatch(changeCellState(cellCoordinates));
        dispatch(changeTurn());
    }

    return (
        <button className={styles.cellButton} disabled={!cellParams[2]} onClick={() => handleClick(stringCoordinates)}>
            {cellState === CellStateTypes.cross ? <CrossIcon /> : cellState === CellStateTypes.zero ? <ZeroIcon /> : null}
        </button>
    )
}
