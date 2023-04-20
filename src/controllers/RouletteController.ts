import * as RouletteService from '../services/RouletteService'
import { type Request, type Response } from 'express'

export async function getDatasetForCharts (req: Request, res: Response) {
  let { betValue, martingale, initialHour, endHour, roulettesEnable, dateInitial, dateEnd } = req.body

  if (betValue === undefined) {
    betValue = 5
    martingale = 2
    initialHour = '08'
    endHour = '20'
    roulettesEnable = [
      'Speed Auto Roulette',
      'Speed Roulette',
      'Roulette',
      'Lightning Roulette'
    ]
    dateInitial = '2023-03-11'
  }
  const roulettes = await RouletteService.getDailyGainHistory({ betValue, martingale, endHour, initialHour, roulettesEnable, dateInitial, dateEnd })
  // console.log(roulettes)
  const datasetGains = roulettes.gainPerDate.map(r => r.gains)
  const datasetDate = roulettes.gainPerDate.map(r => r.date)
  const dataset = { gains: datasetGains, date: datasetDate, daysGreen: roulettes.daysGreen, gainTotal: roulettes.gainTotal }
  return res.send(dataset)
}

export async function getTableByDay (req: Request, res: Response) {
  const { date } = req.body

  const dataDays = await RouletteService.getTableByDate({ date })

  return res.send(dataDays)
}

export async function getDataSimulator (req: Request, res: Response) {
  let { betValue, martingale, initialHour, endHour, roulettesEnable, dateInitial, dateEnd, stopValue } = req.body

  if (betValue === undefined) {
    betValue = 5
    martingale = 2
    initialHour = '08'
    endHour = '20'
    roulettesEnable = [
      'Speed Auto Roulette',
      'Speed Roulette',
      'Roulette',
      'Lightning Roulette'
    ]
    dateInitial = '2023-03-11'
  }
  const roulettes = await RouletteService.getDataSimulator({ betValue, martingale, endHour, initialHour, roulettesEnable, dateInitial, dateEnd, stopValue })
  const datasetGains = roulettes.gainPerDate.map(r => r.gains)
  const datasetDate = roulettes.gainPerDate.map(r => r.date)
  const dataset = { gains: datasetGains, date: datasetDate, daysGreen: roulettes.daysGreen, gainTotal: roulettes.gainTotal, totalDays: datasetDate.length }
  return res.send(dataset)
}
