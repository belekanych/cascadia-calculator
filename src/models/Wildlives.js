import { WILDLIVES } from '../services/rules'

export default class Wildlives {
  constructor() {
    WILDLIVES.forEach(wildlife => this[wildlife] = '')
  }
}