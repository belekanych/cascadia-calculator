import { useState } from 'react'
import './App.css'
import Board from './components/Board'
import Header from './components/Header'
import { mapValues, set, sortBy, reverse, filter } from 'lodash'
import { v4 as uuid } from 'uuid'

const habitats = ['mountains', 'forests', 'prairies', 'wetlands', 'rivers']

function App() {
  const [players, setPlayers] = useState([])

  const createPlayer = () => {
    setPlayers(players.concat([{
      id: uuid(),
      name: '',
      score: {
        animals: {
          bear: '',
          elk: '',
          salmon: '',
          hawk: '',
          fox: '',
        },
        habitats: {
          mountains: '',
          forests: '',
          prairies: '',
          wetlands: '',
          rivers: '',
          bonuses: {
            mountains: '',
            forests: '',
            prairies: '',
            wetlands: '',
            rivers: '',
          },
        },
        natureTokens: '',
      },
    }]))
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
    let updatedPlayers = players

    habitats.forEach(habitat => {
      const rating = reverse(sortBy(
        filter(mapValues(players, `score.habitats.${habitat}`), value => value),
        value => value
      ))

      updatedPlayers = players.map(player => {
        player.score.habitats.bonuses[habitat] = calculateBonus(
          rating,
          player.score.habitats[habitat],
          players.length
        )

        return player
      })
    })

    setPlayers(updatedPlayers)
  }

  const calculateBonus = (rating, playerScore, totalPlayers) => {
    if (rating.length != totalPlayers) {
      return 0
    }

    switch (totalPlayers) {
      case 1:
        return rating[0] >= 7 ? 2 : 0
      case 2:
        if (rating[0] === rating[1]) {
          return 1
        }
        return rating[0] === playerScore ? 2 : 0
      case 3:
      case 4:
        if (rating[0] === rating[1] && rating[1] === rating[2]) {
          return rating[0] === playerScore ? 1 : 0
        }
        if (rating[0] === rating[1]) {
          return rating[0] === playerScore ? 2 : 0
        }
        if (rating[0] === playerScore) {
          return 3
        }
        if (rating[1] === rating[2]) {
          return 0
        }
        if (rating[1] === playerScore) {
          return 1
        }
        return 0
    }
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
