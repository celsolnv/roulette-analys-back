import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Result } from './entity/Result'
import { Aviator } from './entity/Aviator'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  // database: "/home/celso/www/bots/telegram/monitor_telegram/backend.sqlite",
  database: '/home/celso/www/bots/telegram/monitor_telegram/data.db',
  synchronize: false,
  logging: false,
  entities: [Result, Aviator],
  migrations: [],
  subscribers: []
})
