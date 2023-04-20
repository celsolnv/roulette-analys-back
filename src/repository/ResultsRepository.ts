/* eslint-disable @typescript-eslint/no-this-alias */

import { Result } from '../entity/Result'
import { AppDataSource } from '../database'
import { Like, MoreThan, type Repository } from 'typeorm'
import { subHours } from 'date-fns'

export const ResultRepository = AppDataSource.getRepository(Result).extend({
  async selectAllRouletteEvolution () {
    const query: Repository<Result> = this
    return await query.find({
      where: {
        roleta: 'Roulette',
        lobby: 'Evolution',
        estrategia: Like('%ª%')
      },
      order: { id: 'DESC' }
    })
  },

  async getDataInLast24Hours () {
    const query: Repository<Result> = this
    const yesterday = new Date(new Date().getTime() - (24 * 60 * 60 * 1000))
    const last24Hours = subHours(yesterday, 3)
    return await query.find({
      where: {
        roleta: 'Roulette',
        lobby: 'Evolution',
        estrategia: Like('%ª%'),
        data: MoreThan(last24Hours)
      },
      order: { id: 'DESC' }
    })
  }
})
