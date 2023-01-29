import BoardPlaceholder from '../BoardPlaceholder'
import Cell from '../Cell'
import { getHabitatsScore } from '../../services/score'
import { getTabIndex, parseScore } from '../../services/form'
import { HABITATS } from '../../services/rules'

function Habitats({ players, placeholders, onUpdate }) {
  const updateHabitatScore = (player, habitat) => {
    return e => onUpdate(player.id, `score.habitats.${habitat}`, parseScore(e))
  }

  return (
    <>
      {HABITATS.map((habitat, habitatIndex) => (
        <tr key={habitatIndex} className='row row--habitat border-b-2 border-amber-600'>
          <td className='bonus border-r-2 border-amber-900'>
            <img src={`${habitat}.png`} className='w-1/2 mx-auto bg-white rounded-full p-1'/>
          </td>
          {players.map((player, index) => (
            <Cell
              key={index}
              value={player.score.habitats[habitat]}
              bonus={player.score.bonuses[habitat] || '-'}
              type='number'
              tabIndex={getTabIndex(index, 2, habitatIndex)}
              onChange={updateHabitatScore(player, habitat)}
            />
          ))}
          <BoardPlaceholder size={placeholders} />
        </tr>
      ))}
      <tr className="row row--habitat row--total bg-amber-100 border-b-8 border-amber-900">
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
    </>
  )
}

export default Habitats