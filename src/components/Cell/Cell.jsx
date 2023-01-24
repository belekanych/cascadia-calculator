import './Cell.css'

function Cell({ value, type, bonus, autoFocus, tabIndex, onChange }) {
  return (
    <td data-bonus={bonus} className={`${bonus && 'bonus'} border-r-2 border-amber-600`}>
      <input
        type={type}
        value={value}
        autoFocus={autoFocus}
        tabIndex={tabIndex}
        className='w-full bg-transparent text-2xl text-center leading-10'
        onChange={onChange}
      />
    </td>
  )
}

export default Cell