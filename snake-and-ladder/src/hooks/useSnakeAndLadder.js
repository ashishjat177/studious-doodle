import { useEffect, useRef, useState } from "react"

const size = 100;
const NO_OF_DICE = 1;
const snakes = {
    15: 6,
    35: 14,
    62: 32,
    88: 66,
    97: 5,
  }

  const ladders = {
    11: 30,
    23: 36,
    42: 56,
    52: 89,
    68: 92,
  }

const useSnakeAndLadder = (TOTAL_PLAYERS = 4) => {
    const boards = Array.from({length: size}, ( _ , index) => index + 1);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [players, setPlayer] = useState([]);
    const [winner, setWinner] = useState(null);
    const intervalRef = useRef(null);

    const rollADice = () => {
        if (winner !== null) return;
    
        const diceValue = Math.floor(Math.random() * 6) + 1; // Dice roll between 1 and 6
        const currentPlayer = players[currentPlayerIndex];
        let newPosition = currentPlayer.position + diceValue;
    
        // Check for snakes or ladders
        if (ladders[newPosition]) {
          newPosition = ladders[newPosition];
        } else if (snakes[newPosition]) {
          newPosition = snakes[newPosition];
        }
    
        // Update player position immutably
        setPlayer((prev) =>
          prev.map((player, index) =>
            index === currentPlayerIndex ? { ...player, position: newPosition } : player
          )
        );
    
        // Check for winner
        if (newPosition >= size) {
          setWinner(currentPlayer);
        } else {
          // Move to the next player
          setCurrentPlayerIndex((currentPlayerIndex + 1) % TOTAL_PLAYERS);
        }
      };

    const handleAutoPlay = () => {
        if (intervalRef.current) return;
    
        intervalRef.current = setInterval(() => {
            if (winner === null) {
                rollADice(); 
            } else {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }, 1000); 
    };

    const onReset = () => {
        intervalRef.current = null;
        setCurrentPlayerIndex(0);
        setWinner(null)
        setPlayer([
            {position: 0, name: 'a', color: 'gray'}, 
            {position: 0, name: 'b', color: 'blue'}, 
            {position: 0, name: 'c', color: 'red'}, 
            {position: 0, name: 'd', color: 'yellow'}
            ]); 
    }

    useEffect(() => {
        onReset();
    }, [])

    return {
        boards,
        snakes,
        ladders,
        players,
        currentPlayer: players[currentPlayerIndex],
        winner,
        onReset,
        handleAutoPlay,
        rollADice
    }
}

export default useSnakeAndLadder;