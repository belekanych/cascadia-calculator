import './Board.css'
import { FaUser, FaPlusCircle, FaTimesCircle } from 'react-icons/fa'
import BoardPlaceholder from '../BoardPlaceholder'
import Cell from '../Cell'

const MAX_PLAYERS = 4

function Board({ players, onCreate, onUpdate, onRemove }) {
  const animals = ['bear', 'elk', 'salmon', 'hawk', 'fox']
  const habitats = ['mountains', 'forests', 'prairies', 'wetlands', 'rivers']

  const placeholders = MAX_PLAYERS - players.length
  const emptyCols = [...new Array(MAX_PLAYERS - players.length)]

  const getObjectScore = obj => Object.values(obj)
    .reduce(
      (a, b) => (a + (Number.isInteger(b) ? b : 0)),
      0
    )

  const getAnimalsScore = player => getObjectScore(player.score.animals)

  const getHabitatsScore = player => {
    const habitatsScore = getObjectScore(player.score.habitats)
    const bonusesScore = getObjectScore(player.score.habitats.bonuses)

    return habitatsScore + bonusesScore
  }

  const getNatureTokensScore = player => player.score.natureTokens

  const getTotalScore = player => {
    return getAnimalsScore(player) + getHabitatsScore(player) + getNatureTokensScore(player)
  }

  const parseScore = e => {
    const value = e.target.value

    return value ? parseInt(value) : ''
  }

  const updateName = player => {
    return e => onUpdate(player.id, 'name', e.target.value)
  }

  const updateAnimalScore = (player, animal) => {
    return e => onUpdate(player.id, `score.animals.${animal}`, parseScore(e))
  }

  const updateHabitatScore = (player, habitat) => {
    return e => onUpdate(player.id, `score.habitats.${habitat}`, parseScore(e))
  }

  const updateNatureTokensScore = player => {
    return e => onUpdate(player.id, 'score.natureTokens', parseScore(e))
  }

  return (
    <div className='bg-white'>
      <table className='w-full'>
        <tbody>
          {/* PLAYERS */}
          <tr>
            <td><FaUser /></td>
            {players.map((player, index) => (
              <Cell key={index} value={player.name} type='text' onChange={updateName(player) }/>
            ))}
            {emptyCols.length ? (
              <td>
                <button
                  type='button'
                  tabIndex='-1'
                  onClick={onCreate}
                >
                  <FaPlusCircle />
                </button>
              </td>
            ) : ''}
            <BoardPlaceholder size={placeholders - 1} />
          </tr>
          {/* ANIMALS */}
          {animals.map(animal => (
            <tr key={animal}>
              <td>
                <img src={`${animal}.png`} width="50px" />
              </td>
              {players.map((player, index) => (
                <Cell
                  key={index}
                  value={player.score.animals[animal]}
                  type='number'
                  onChange={updateAnimalScore(player, animal)}
                />
              ))}
              <BoardPlaceholder size={placeholders} />
            </tr>
          ))}
          <tr>
            <td>W</td>
            {players.map((player, index) => (
              <td key={index}>{getAnimalsScore(player)}</td>
            ))}
            <BoardPlaceholder size={placeholders} />
          </tr>
          {/* HABITATS */}
          {habitats.map(habitat => (
            <tr key={habitat} className='row row--env'>
              <td className='bonus'>
                <img src='/bear.png' />
              </td>
              {players.map((player, index) => (
                <Cell
                  key={index}
                  value={player.score.habitats[habitat]}
                  bonus={player.score.habitats.bonuses[habitat] || '-'}
                  type='number'
                  onChange={updateHabitatScore(player, habitat)}
                />
              ))}
              <BoardPlaceholder size={placeholders} />
            </tr>
          ))}
          <tr className="row row--env row--total">
            <td>H</td>
            {players.map((player, index) => (
              <td key={index}>{getHabitatsScore(player)}</td>
            ))}
            <BoardPlaceholder size={placeholders} />
          </tr>
          {/* NATURE TOKENS */}
          <tr className="row row--token">
            <td>T</td>
            {players.map((player, index) => (
              <Cell
                key={index}
                value={getNatureTokensScore(player)}
                type='number'
                onChange={updateNatureTokensScore(player)}
              />
            ))}
            <BoardPlaceholder size={placeholders} />
          </tr>
          {/* TOTAL */}
          <tr className="row row--sum">
            <td>S</td>
            {players.map((player, index) => (
              <td key={index}>{getTotalScore(player)}</td>
            ))}
            <BoardPlaceholder size={placeholders} />
          </tr>
          {/* REMOVE PLAYER */}
          {players.length ? (
            <tr>
              <td></td>
              {players.map((player, index) => (
                <td key={index}>
                  <button
                    type='button'
                    onClick={() => onRemove(player.id)}
                  >
                    <FaTimesCircle />
                  </button>
                </td>
              ))}
              <BoardPlaceholder size={placeholders} />
            </tr>
          ) : ''}
        </tbody>
      </table>
    </div>
  )
}

export default Board