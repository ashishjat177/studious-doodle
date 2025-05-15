import { useEffect } from "react";
import { useState } from "react"


export const useTicTacBoard = (size) => {
    const [boards, setBoards] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState('X')
    const [winner, setWinner] = useState(null);

    const checkWinner = (board) => {
        //check rows
        for(let row = 0; row < size; row++) {
            const start = row*size;
            const rowSet = new Set(board.slice(start, start + size));

            if(rowSet.size === 1 && !rowSet.has(null)) {
                return board[start];
            }
        }

        // columns
        for(let col = 0; col < size; col++) {
            const colSet = new Set();
            for(let row = 0; row < size; row++) {
                colSet.add(board[row*size + col]);
            }
            if(colSet.size === 1 && !colSet.has(null)) {
                return board[col]
            }
        }

        //diagonal 

        // Check diagonals
        const diag1 = new Set();
        const diag2 = new Set();
        for (let i = 0; i < size; i++) {
            diag1.add(boards[i * size + i]);                 // Top-left to bottom-right
            diag2.add(boards[i * size + (size - i - 1)]);     // Top-right to bottom-left
        }
        if (diag1.size === 1 && !diag1.has(null)) return boards[0];
        if (diag2.size === 1 && !diag2.has(null)) return boards[size - 1];

        // No winner yet
        return null;

    }

    const onReset = () => {
        setWinner(null);
        setCurrentPlayer('X');
        setBoards(Array.from({ length: size * size }, () => null));
    }

    const handleClick = (index) => {
        const clonedBoards = [...boards];
        clonedBoards[index] = currentPlayer;
        setBoards(() => clonedBoards);
        setCurrentPlayer((prev) => prev === 'X' ? 'O' : 'X')
        const result = checkWinner(clonedBoards);
        if(result) {
            setWinner(result);
        }

    }

    useEffect(() => {
        setBoards(Array.from({ length: size * size }, () => null));
    },[size])

    return {
        handleClick,
        boards,
        currentPlayer,
        winner,
        onReset,
    }
}