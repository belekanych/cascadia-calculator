export const parseScore = e => {
  const value = e.target.value

  return value ? parseInt(value) : ''
}

export const getTabIndex = (a = 0, b = 0, c = 0) => {
  return a * 100 + b * 10 + c
}