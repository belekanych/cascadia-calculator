import { FaTimesCircle } from 'react-icons/fa'
import { getTabIndex } from '../../services/form'
import BoardPlaceholder from '../BoardPlaceholder'

function PlayerControls({ players, placeholders, onRemove }) {
  return (
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
  )
}

export default PlayerControls