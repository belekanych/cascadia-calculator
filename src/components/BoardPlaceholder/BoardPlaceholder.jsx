function BoardPlaceholder({ size }) {
  if (size <= 0) {
    return (<></>)
  }

  const emptyCols = [...new Array(size)]

  return emptyCols.map((col, index) => (<td key={index} className='border-r-2 border-amber-600'>{}</td>))
}

export default BoardPlaceholder