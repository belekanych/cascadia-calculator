import { FaUser, FaPlusCircle } from 'react-icons/fa'
import { getTabIndex } from '../../services/form'
import BoardPlaceholder from '../BoardPlaceholder'
import Cell from '../Cell'

function Players({ players, placeholders, onCreate, onUpdate }) {
  const updateName = player => {
    return e => onUpdate(player.id, 'name', e.target.value)
  }

  return (
    <tr className='bg-amber-100 border-b-2 border-amber-900'>
      <td className='border-r-2 border-amber-900 text-center py-3'>
        <FaUser className='inline text-2xl text-amber-900'/>
      </td>
      {players.map((player, playerIndex) => (
        <Cell
          key={playerIndex}
          value={player.name}
          type='text'
          autoFocus={true}
          tabIndex={getTabIndex(playerIndex, 0, 1)}
          onChange={updateName(player)}
        />
      ))}
      {placeholders ? (
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
  )
}

export default Players