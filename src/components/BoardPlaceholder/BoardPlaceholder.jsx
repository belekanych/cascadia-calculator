import './BoardPlaceholder.css'

function BoardPlaceholder({ size }) {
  if (size <= 0) {
    return (<></>)
  }

  const emptyCols = [...new Array(size)]

  return emptyCols.map((col, index) => (<td key={index}>{}</td>))
}

export default BoardPlaceholder