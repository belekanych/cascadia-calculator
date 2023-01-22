import './Cell.css'

function Cell({ value, type, bonus, autoFocus, tabIndex, onChange }) {
  return (
    <td data-bonus={bonus} className={bonus && 'bonus'}>
      <input
        type={type}
        value={value}
        autoFocus={autoFocus}
        tabIndex={tabIndex}
        onChange={onChange}
      />
    </td>
  )
}

export default Cell