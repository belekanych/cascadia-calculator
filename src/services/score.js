import sum from 'lodash/sum'
import { mapValues, mapKeys, reverse, sortBy, filter } from 'lodash'
import { HABITATS } from './rules'

export const getObjectScore = obj => {
  return Object.values(obj)
    .reduce(
      (a, b) => (a + (Number.isInteger(b) ? b : 0)),
      0
    )
}

export const getTotalScore = player => sum([
  getWildlivesScore(player),
  getHabitatsScore(player),
  getNatureTokensScore(player),
])

export const getWildlivesScore = player => getObjectScore(player.score.wildlives)

export const getHabitatsScore = player => sum([
  getObjectScore(player.score.habitats),
  getObjectScore(player.score.bonuses),
])

export const getNatureTokensScore = player => player.score.natureTokens

export const calculateBonuses = players => {
  const bonuses = mapValues(
    mapKeys(players, player => player.id),
    player => ({ ...player.score.bonuses })
  )

  HABITATS.forEach(habitat => {
    const rating = reverse(sortBy(
      filter(mapValues(players, `score.habitats.${habitat}`), value => value),
      value => value
    ))

    players.forEach(player => {
      bonuses[player.id][habitat] = calculateBonus(
        rating,
        player.score.habitats[habitat],
        players.length
      )
    })
  })

  return bonuses
}

export const calculateBonus = (rating, playerScore, totalPlayers) => {
  if (rating.length != totalPlayers) {
    return 0
  }

  switch (totalPlayers) {
    case 1:
      return calculateBonusForOnePlayer(rating)
    case 2:
      return calculateBonusForTwoPlayers(rating, playerScore)
    case 3:
    case 4:
      return calculateBonusForThreePlayers(rating, playerScore)
  }

  return 0
}

export const calculateBonusForOnePlayer = rating => {
  return rating[0] >= 7 ? 2 : 0
}

export const calculateBonusForTwoPlayers = (rating, playerScore) => {
  if (rating[0] === rating[1]) {
    return 1
  }

  return rating[0] === playerScore ? 2 : 0
}

export const calculateBonusForThreePlayers = (rating, playerScore) => {
  if (rating[0] === rating[1] && rating[1] === rating[2]) {
    return rating[0] === playerScore ? 1 : 0
  }

  if (rating[0] === rating[1]) {
    return rating[0] === playerScore ? 2 : 0
  }

  if (rating[0] === playerScore) {
    return 3
  }

  if (rating[1] === rating[2]) {
    return 0
  }

  if (rating[1] === playerScore) {
    return 1
  }

  return 0
}