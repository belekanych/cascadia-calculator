import './Board.css'
import Players from '../Players'
import Wildlives from '../Wildlives'
import Habitats from '../Habitats'
import NatureTokens from '../NatureTokens'
import Total from '../Total'
import PlayerControls from '../PlayerControls'
import { MAX_PLAYERS } from '../../services/rules'

function Board(props) {
  const childProps = {
    ...props,
    placeholders: MAX_PLAYERS - props.players.length,
  }

  return (
    <div className='bg-amber-900 p-4 font-mono scale-90 w-full md:w-content max-w-lg'>
      <table className='w-full'>
        <tbody className='bg-amber-50'>
          <Players {...childProps} />
          <Wildlives {...childProps} />
          <Habitats {...childProps} />
          <NatureTokens {...childProps} />
          <Total {...childProps} />
          <PlayerControls {...childProps} />
        </tbody>
      </table>
    </div>
  )
}

export default Board