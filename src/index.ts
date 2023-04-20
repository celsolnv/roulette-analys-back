/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { AppDataSource } from './database'
import * as RouletteService from './services/RouletteService'
import { app } from './serve'

AppDataSource.initialize().then(async () => {
  // const result = await gainsDaily()
  app.listen(3333, () => {
    console.log('Servidor rodando na porta 3333')
  })
}).catch(error => { console.log(error) })
