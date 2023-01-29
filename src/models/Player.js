import { v4 as uuid } from 'uuid'
import Habitats from '../models/Habitats'
import Wildlives from '../models/Wildlives'

export default class Player {
  constructor() {
    this.id = uuid()
    this.name =  ''
    this.score = {
      wildlives: new Wildlives(),
      habitats: new Habitats(),
      bonuses: new Habitats(),
      natureTokens: '',
    }
  }
}