/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import cors from 'cors'
import * as RouletteController from './controllers/RouletteController'

const app = express()

app.use(express.json())
app.use(cors())

app.post('/charts', RouletteController.getDatasetForCharts)
app.post('/table', RouletteController.getTableByDay)
app.post('/simulator', RouletteController.getDataSimulator)

export { app }
