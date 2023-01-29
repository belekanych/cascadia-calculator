import { HABITATS } from '../services/rules'

export default class Habitats {
  constructor() {
    HABITATS.forEach(habitat => this[habitat] = '')
  }
}