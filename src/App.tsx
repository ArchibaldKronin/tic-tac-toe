import { useSelector } from 'react-redux';
import './App.css'
import { CrossIcon } from './components/cross-icon'
import { ZeroIcon } from './components/zero-icon'
import { resetAllCells, selectField, selectIsOver, selectTurn } from './store/game-slice';
import { CellNames } from './types/fieldTypes';
import { CellElement } from './components/cell/cell-element';
import { useAppDispatch } from './store/store';

function App() {
  const dispatch = useAppDispatch();

  const gameField = useSelector(selectField);
  const currentTurn = useSelector(selectTurn);
  const gameIsOver = useSelector(selectIsOver);

  const gameFieldArray = Object.entries(gameField);

  return (
    <div className='content'>
      <header className='header'>
        {gameIsOver === true ? 'Победил: ' : 'Текущий ход:'}
        <div className='logoContainer'>
          {currentTurn === 'cross' ? <CrossIcon /> : currentTurn === 'zero' ? <ZeroIcon /> : null}
        </div>
      </header>
      <div className='fieldContainer'>
        {gameFieldArray.map(cell =>
          <div className='cells' key={cell[0]} >
            <CellElement cellParams={gameField[cell[0] as CellNames]} />
          </div>)}
      </div>
      <div className='footer'>
        <button className='resetButton' onClick={() => dispatch(resetAllCells())}>Reset</button>
      </div>
    </div>
  )
}

export default App
