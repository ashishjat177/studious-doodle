const Board = ({boards, size, handleClick, isGameOver}) => {
    return (
        <div className="board-container" style={{gridTemplateColumns: `repeat(${size}, 50px)`, gridTemplateRows: `repeat(${size}, 50px)`}}>
            {boards.map((board, index) => (
                <button disabled={isGameOver} className="box" onClick={() => handleClick(index)} key={index}>{board}</button>
            ))}
        </div>
    )
}

export default Board;