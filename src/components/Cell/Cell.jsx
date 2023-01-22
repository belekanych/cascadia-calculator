import './Cell.css'

function Cell({ value, type, bonus, onChange }) {
  return (
    <td data-bonus={bonus} className={bonus && 'bonus'}>
      <input type={type} value={value} onChange={onChange}></input>
    </td>
  )
}

export default Cell