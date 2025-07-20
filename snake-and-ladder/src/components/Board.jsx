const Board = ({ boards, n = 10, snakes, ladders, players, currentPlayer }) => {
    return (

        <div className="boards-container" style={{ gridTemplateColumns: `repeat(${n}, 50px)`, gridTemplateRows: `repeat(${n}, 50px)` }}>
            {boards.map((board, index) => (
                <div className="board">
                     {snakes[index] && <span>🐍 </span>}
                     {ladders[index] && <span>🪜</span>}
                     {players?.filter((player) => player.position === board)?.map((player) => (
                        <span key={player.name} style={{backgroundColor: player.color, color: 'white'}}>
                            {player.name}
                        </span>
                     ))}
                     {!snakes[index] && !ladders[index] && <span>{board}</span>}
                </div>
            ) )}
        </div>
    )
}

export default Board;