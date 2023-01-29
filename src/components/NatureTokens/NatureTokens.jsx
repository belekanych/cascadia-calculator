import BoardPlaceholder from '../BoardPlaceholder'
import Cell from '../Cell'
import { getNatureTokensScore } from '../../services/score'
import { getTabIndex, parseScore } from '../../services/form'
import { FaLeaf } from 'react-icons/fa'

function NatureTokens({ players, placeholders, onUpdate }) {
  const updateNatureTokensScore = player => {
    return e => onUpdate(player.id, 'score.natureTokens', parseScore(e))
  }

  return (
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
  )
}

export default NatureTokens