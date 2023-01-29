import { useState } from 'react'
import './App.css'
import Board from './components/Board'
import Header from './components/Header'
import { set } from 'lodash'
import Player from './models/Player'
import { calculateBonuses } from './services/score'

function App() {
  const [players, setPlayers] = useState([])

  const createPlayer = () => {
    setPlayers(players.concat([new Player()]))
  }

  const updatePlayer = (id, path, value) => {
    setPlayers(players.map(player => {
      if (player.id === id) {
        set(player, path, value)
      }

      return player
    }))

    if (path.includes('habitats')) {
      recalculateBonuses()
    }
  }

  const removePlayer = id => {
    setPlayers(players.filter(player => player.id !== id))
  }

  const recalculateBonuses = () => {
    const bonuses = calculateBonuses(players)

    setPlayers(players.map(player => {
      player.score.bonuses = bonuses[player.id]

      return player
    }))
  }

  return (
    <div className='flex flex-col p-4 items-center'>
      <Header />
      <Board
        players={players}
        onCreate={createPlayer}
        onUpdate={updatePlayer}
        onRemove={removePlayer}
      />
    </div>
  )
}

export default App
