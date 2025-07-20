import { useState } from 'react'
import './App.css'
import Board from './components/Board';
import useSnakeAndLadder from './hooks/useSnakeAndLadder';

const TOTAL_PLAYERS = 4
function App() {
  const { boards, snakes, ladders, currentPlayer, players, onReset, handleAutoPlay, rollADice, winner } = useSnakeAndLadder(TOTAL_PLAYERS);
  
  return (
    <div>
      <div>
        current player: {currentPlayer?.name}
        {winner !== null && <h2>Winner: {winner?.name}</h2>}
      </div>
      <Board boards={boards} snakes={snakes} ladders={ladders} players={players} currentPlayer={currentPlayer}/>
      <div className='action-container'>
          <button onClick={rollADice}>Roll a dice</button>
          <button onClick={handleAutoPlay}>Auto</button>
          <button onClick={onReset}>reset</button>
      </div>
    </div>
  )
}

export default App
