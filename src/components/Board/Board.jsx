import './Board.css'
import { FaUser, FaPlusCircle, FaTimesCircle, FaCertificate, FaLeaf } from 'react-icons/fa'
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

  const getTabIndex = (a = 0, b = 0, c = 0) => {
    return a * 100 + b * 10 + c
  }

  return (
    <div className='bg-amber-900 p-4 font-mono scale-90 w-full md:w-content max-w-lg'>
      <table className='w-full'>
        <tbody className='bg-amber-50'>
          {/* PLAYERS */}
          <tr className='bg-amber-100 border-b-2 border-amber-900'>
            <td className='border-r-2 border-amber-900 text-center py-3'>
              <FaUser className='inline text-2xl text-amber-900'/>
            </td>
            {players.map((player, index) => (
              <Cell
                key={index}
                value={player.name}
                type='text'
                autoFocus={true}
                tabIndex={getTabIndex(index, 0, 1)}
                onChange={updateName(player)
              }/>
            ))}
            {emptyCols.length ? (
              <td className='border-r-2 border-amber-600 text-center'>
                <button
                  type='button'
                  tabIndex='-1'
                  className='text-2xl mt-1 text-amber-900'
                  onClick={onCreate}
                >
                  <FaPlusCircle />
                </button>
              </td>
            ) : ''}
            <BoardPlaceholder size={placeholders - 1} />
          </tr>
          {/* ANIMALS */}
          {animals.map((animal, animalIndex) => (
            <tr key={animalIndex} className='row--animal border-b-2 border-amber-600'>
              <td className='border-r-2 border-amber-900'>
                <img src={`${animal}.png`} className='w-1/2 mx-auto bg-white rounded-full p-1'/>
              </td>
              {players.map((player, index) => (
                <Cell
                  key={index}
                  value={player.score.animals[animal]}
                  type='number'
                  tabIndex={getTabIndex(index, 1, animalIndex)}
                  onChange={updateAnimalScore(player, animal)}
                />
              ))}
              <BoardPlaceholder size={placeholders} />
            </tr>
          ))}
          <tr className='bg-amber-100 border-b-8 border-amber-900'>
            <td className='border-r-2 border-amber-900 text-center py-2'>
                <span className='text-amber-900 font-bold text-2xl border-2 rounded-full border-amber-900 px-3'>W</span>
            </td>
            {players.map((player, index) => (
              <td key={index} className='border-r-2 border-amber-600 text-2xl text-center leading-10'>
                {getAnimalsScore(player)}
              </td>
            ))}
            <BoardPlaceholder size={placeholders} />
          </tr>
          {/* HABITATS */}
          {habitats.map((habitat, habitatIndex) => (
            <tr key={habitatIndex} className='row row--env border-b-2 border-amber-600'>
              <td className='bonus border-r-2 border-amber-900'>
                <img src={`${habitat}.png`} className='w-1/2 mx-auto bg-white rounded-full p-1'/>
              </td>
              {players.map((player, index) => (
                <Cell
                  key={index}
                  value={player.score.habitats[habitat]}
                  bonus={player.score.habitats.bonuses[habitat] || '-'}
                  type='number'
                  tabIndex={getTabIndex(index, 2, habitatIndex)}
                  onChange={updateHabitatScore(player, habitat)}
                />
              ))}
              <BoardPlaceholder size={placeholders} />
            </tr>
          ))}
          <tr className="row row--env row--total bg-amber-100 border-b-8 border-amber-900">
            <td className='border-r-2 border-amber-900 text-center py-2'>
                <span className='text-amber-900 font-bold text-2xl border-2 rounded-full border-amber-900 px-3'>H</span>
            </td>
            {players.map((player, index) => (
              <td key={index} className='border-r-2 border-amber-600 text-2xl text-center leading-10'>
                {getHabitatsScore(player)}
              </td>
            ))}
            <BoardPlaceholder size={placeholders} />
          </tr>
          {/* NATURE TOKENS */}
          <tr className="row row--token border-b-8 border-amber-900">
            <td className='border-r-2 border-amber-900 text-center py-3'>
              <FaLeaf className='inline text-2xl text-green-900 mb-1'/>
            </td>
            {players.map((player, index) => (
              <Cell
                key={index}
                value={getNatureTokensScore(player)}
                type='number'
                tabIndex={getTabIndex(index, 3)}
                onChange={updateNatureTokensScore(player)}
              />
            ))}
            <BoardPlaceholder size={placeholders} />
          </tr>
          {/* TOTAL */}
          <tr className="row row--sum bg-green-100 border-b-8 border-amber-900">
            <td className='border-r-2 border-amber-900 text-center py-2'>
              <FaCertificate className='inline text-4xl text-teal-700'/>
            </td>
            {players.map((player, index) => (
              <td key={index} className='border-r-2 border-amber-600 text-2xl text-center leading-10'>
                {getTotalScore(player)}
              </td>
            ))}
            <BoardPlaceholder size={placeholders} />
          </tr>
          {/* REMOVE PLAYER */}
          <tr>
            <td className='border-r-2 border-amber-900 py-5'></td>
            {players.map((player, index) => (
              <td key={index} className='border-r-2 border-amber-600 text-center'>
                <button
                  type='button'
                  className='text-2xl mt-2 text-amber-900'
                  tabIndex={getTabIndex(index, 4)}
                  onClick={() => onRemove(player.id)}
                >
                  <FaTimesCircle />
                </button>
              </td>
            ))}
            <BoardPlaceholder size={placeholders} />
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Board