import Board from "./Board";
import { useTicTacBoard } from "./hooks/useTicTacBoard";

const TicTacToe = ({size}) => {
    const {handleClick, boards, currentPlayer, winner, onReset } = useTicTacBoard(size)
    return (
        <div className="tic-tac-toe-container">
            <Board isGameOver={winner} boards={boards} size={size} handleClick={handleClick}/>
            <div>status winner: {winner}</div>
            <div>currentPlayer: {currentPlayer}</div>
            <button onClick={onReset}>reset</button>
        </div>
    )
}

export default TicTacToe;