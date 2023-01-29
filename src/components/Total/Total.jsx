import BoardPlaceholder from '../BoardPlaceholder'
import { getTotalScore } from '../../services/score'
import { FaCertificate } from 'react-icons/fa'

function Total({ players, placeholders }) {
  return (
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
  )
}

export default Total