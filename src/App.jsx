import { useState, useEffect } from "react"
import "./App.css"

const winningCombinations = [
  // horizontals
  { indexes: [0, 1, 2], orientation: "horizontal" },
  { indexes: [3, 4, 5], orientation: "horizontal" },
  { indexes: [6, 7, 8], orientation: "horizontal" },

  //verticals
  { indexes: [0, 3, 6], orientation: "vertical" },
  { indexes: [1, 4, 7], orientation: "vertical" },
  { indexes: [2, 5, 8], orientation: "vertical" },

  //diagonals
  { indexes: [0, 4, 8], orientation: "diagonal-1" },
  { indexes: [2, 4, 6], orientation: "diagonal-2" },
]

function App() {
  const [gameData, setGameData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [turn, setTurn] = useState(1)
  const [winningPlayer, setWinningPlayer] = useState(null)

  const handleClick = (clickedIndex) => {
    if (gameData[clickedIndex] !== 0) {
      return
    }
    if (winningPlayer) {
      return
    }
    setGameData((prev) => {
      const newGameData = [...prev]
      newGameData[clickedIndex] = turn
      return newGameData
    })
    setTurn((prev) => (prev === 1 ? 2 : 1))
  }

  useEffect(() => {
    checkWinner()
    checkTie()
    console.log(winner)
  }, [gameData])

  let winner = null

  const checkTie = () => {
    if (gameData.every((item) => item !== 0 && winner == null)) {
      setTimeout(() => {
        alert("Deu velha!")
      }, 20)
    }
  }

  const checkWinner = () => {
    for (let combination of winningCombinations) {
      const { indexes } = combination
      if (
        gameData[indexes[0]] === 1 &&
        gameData[indexes[1]] === 1 &&
        gameData[indexes[2]] === 1
      ) {
        winner = "jogador 1"
      }
      if (
        gameData[indexes[0]] === 2 &&
        gameData[indexes[1]] === 2 &&
        gameData[indexes[2]] === 2
      ) {
        winner = "jogador 2"
      }
      if (winner) {
        setWinningPlayer(combination)
        setTimeout(() => {
          alert(`${winner} venceu`)
        }, 20)
        break
      }
    }
  }

  return (
    <>
      <div className="board">
        {gameData.map((value, index) => (
          <button
            className={
              winningPlayer?.indexes.includes(index)
                ? winningPlayer.orientation
                : undefined
            }
            key={index}
            onClick={() => {
              handleClick(index)
            }}
          >
            {(value === 1 && "x") || (value === 2 && "o")}
          </button>
        ))}
      </div>
    </>
  )
}

export default App
