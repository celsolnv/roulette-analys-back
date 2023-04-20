import { AppDataSource } from '../database'
import { Aviator } from '../entity/Aviator'

export const aviatorRepository = AppDataSource.getRepository(Aviator).extend({

})
