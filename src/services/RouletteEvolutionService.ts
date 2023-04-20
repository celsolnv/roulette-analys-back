import { ResultRepository } from '../repository/ResultsRepository'

export async function getGainInLast24Hours (betValue: number) {
  const rouletteData = await ResultRepository.getDataInLast24Hours()
  const totalData = rouletteData.length
  let greens = 0
  const gain = rouletteData.reduce((acc, currentValue) => {
    if (currentValue.cor === 'GREEN') {
      greens++
      return acc + betValue
    } else {
      return acc - (betValue * 18)
    }
  }, 0)
  const accuracy = (greens * 100) / totalData
  return { gain, accuracy, total: totalData }
}
