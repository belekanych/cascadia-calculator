import BoardPlaceholder from '../BoardPlaceholder'
import Cell from '../Cell'
import { getWildlivesScore } from '../../services/score'
import { getTabIndex, parseScore } from '../../services/form'
import { WILDLIVES } from '../../services/rules'

function Wildlives({ players, placeholders, onUpdate }) {
  const updateWildlifeScore = (player, wildlife) => {
    return e => onUpdate(player.id, `score.wildlives.${wildlife}`, parseScore(e))
  }

  return (
    <>
      {WILDLIVES.map((wildlife, wildlifeIndex) => (
        <tr key={wildlifeIndex} className='row--wildlife border-b-2 border-amber-600'>
          <td className='border-r-2 border-amber-900'>
            <img src={`${wildlife}.png`} className='w-1/2 mx-auto bg-white rounded-full p-1'/>
          </td>
          {players.map((player, playerIndex) => (
            <Cell
              key={playerIndex}
              value={player.score.wildlives[wildlife]}
              type='number'
              tabIndex={getTabIndex(playerIndex, 1, wildlifeIndex)}
              onChange={updateWildlifeScore(player, wildlife)}
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
            {getWildlivesScore(player)}
          </td>
        ))}
        <BoardPlaceholder size={placeholders} />
      </tr>
    </>
  )
}

export default Wildlives