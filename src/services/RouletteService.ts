import { ResultRepository } from '../repository/ResultsRepository'
import { getLastHoursDatetime } from '../utils/time'
import { Equal, In, Like, MoreThan } from 'typeorm'
import { incrementGainRoulette } from '../utils/operationRoulette'

interface IGetDailyGainHistory {
  betValue: number
  martingale: number
  initialHour: string
  endHour: string
  dateInitial: string
  dateEnd: string
  roulettesEnable: [x: string]
}
export async function getDailyGainHistory ({ betValue = 5, martingale = 2, endHour, initialHour, roulettesEnable, dateInitial, dateEnd }: IGetDailyGainHistory) {
  const allRoulettesDaily = await ResultRepository.query(`SELECT 
          strftime('%Y-%m-%d', data) as _data,
          strftime('%H', data) as hora,
        * from resultados_premium rp 
        where 
           (
            roleta like '${roulettesEnable.shift()}'
            ${roulettesEnable.map(item => "or roleta like '" + item + "'").join(' ')}
           )
          and estrategia like '%ª%'
          and lobby like 'Evolution'
          and hora >= '${initialHour}'
          and hora <= '${endHour}'  
          and data >= '${dateInitial}'
          and data <= '${dateEnd}'
          order by _data `)

  let daysGreen = 0
  let aux = 0
  const dataFilter = []
  allRoulettesDaily.forEach((r) => {
    if (!dataFilter.includes(r._data)) {
      dataFilter.push(r._data)
    }
  })

  const gainPerDate = dataFilter.map(roulette => {
    const dataOfDate = allRoulettesDaily.filter(r => r._data === roulette)
    let gainsTotal = 0
    dataOfDate.forEach(r => {
      const qtdBalls = r.bolas_resultado.split(',').length
      const lastBall = r.bolas_resultado.split(',')[0]
      gainsTotal = incrementGainRoulette({ betValue, color: r.cor, gainCurrent: gainsTotal, isCoverZero: true, martingale, qtdBalls, lastBall })
    })
    if (gainsTotal > 0) {
      daysGreen++
    }
    aux += gainsTotal
    return {
      date: roulette,
      // dateComplete: roulette.data,
      gains: gainsTotal
    }
  })

  return { gainPerDate, daysGreen, gainTotal: aux }
}

interface IGetTableByDate {
  date: string
}
export async function getTableByDate ({ date }: IGetTableByDate) {
  const roulettesEnable = [
    'Speed Auto Roulette',
    'Speed Roulette',
    'Roulette',
    'Lightning Roulette'
  ]
  const roulettesData = await ResultRepository.query(`SELECT 
      strftime('%Y-%m-%d', data) as _data,
      strftime('%H', data) as hora,
    * from resultados_premium rp 
    where 
      (
        roleta like '${roulettesEnable.shift()}'
        ${roulettesEnable.map(item => "or roleta like '" + item + "'").join(' ')}
      )
      and estrategia like '%ª%'
      and lobby like 'Evolution'
      and data like '%${date}%'
      order by _data `)
  const dataFilter = roulettesData.map(item => { return { cor: item.cor, datetime: item.data, roleta: item.roleta } })
  return dataFilter
}

interface IGetDataSimulator {
  betValue: number
  martingale: number
  initialHour: string
  endHour: string
  dateInitial: string
  dateEnd: string
  roulettesEnable: [x: string]
  stopValue: number
}
export async function getDataSimulator ({ betValue, martingale, endHour, initialHour, roulettesEnable, dateInitial, dateEnd, stopValue }: IGetDataSimulator) {
  const allRoulettesDaily = await ResultRepository.query(`SELECT 
          strftime('%Y-%m-%d', data) as _data,
          strftime('%H', data) as hora,
        * from resultados_premium rp 
        where 
           (
            roleta like '${roulettesEnable.shift()}'
            ${roulettesEnable.map(item => "or roleta like '" + item + "'").join(' ')}
           )
          and estrategia like '%ª%'
          and lobby like 'Evolution'
          and hora >= '${initialHour}'
          and hora <= '${endHour}'  
          and data >= '${dateInitial}'
          and data <= '${dateEnd}'
          order by _data `)

  let daysGreen = 0
  let gainTotal = 0
  const dataFilter = []
  allRoulettesDaily.forEach((r) => {
    if (!dataFilter.includes(r._data)) {
      dataFilter.push(r._data)
    }
  })

  const isCoverZero = true // Deve receber como parâmetro
  const gainPerDate = dataFilter.map(roulette => {
    const dataOfDate = allRoulettesDaily.filter(r => r._data === roulette)
    let gainsTotalPerDay = 0
    for (const r of dataOfDate) {
      if (gainsTotalPerDay >= stopValue) {
        break
      }
      const qtdBalls = r.bolas_resultado.split(',').length
      const lastBall = r.bolas_resultado.split(',')[0]
      // console.log(r.bolas_resultado.split(','))

      gainsTotalPerDay = incrementGainRoulette({ betValue, color: r.cor, gainCurrent: gainsTotalPerDay, isCoverZero, martingale, qtdBalls, lastBall })
    }

    if (gainsTotalPerDay > 0) {
      daysGreen++
    }

    gainTotal += gainsTotalPerDay
    return {
      date: roulette,
      gains: gainsTotalPerDay
    }
  })
  return { gainPerDate, daysGreen, gainTotal }
}
