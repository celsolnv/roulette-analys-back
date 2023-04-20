interface IIncrementGainParams {
  martingale: number
  isCoverZero: boolean
  gainCurrent: number
  color: string
  betValue: number
  qtdBalls: number
  lastBall: string
}

export function incrementGainRoulette ({ martingale, isCoverZero, gainCurrent, color, betValue, qtdBalls, lastBall }: IIncrementGainParams): number {
  let gainsTotal = gainCurrent
  const mapMartingaleRedCoverZero = {
    2: 27.3,
    1: 8.4,
    0: 2.1
  }
  const mapMartingaleGreenCoverZero = {
    2: 5.1,
    1: 2.4,
    0: 1.6
  }
  if (isCoverZero) {
    if (color === 'GREEN') {
      if ((martingale === 1 && qtdBalls === 3) || (martingale === 0 && qtdBalls > 1)) {
        gainsTotal = gainsTotal - (betValue * mapMartingaleRedCoverZero[martingale])
      } else {
        if (lastBall === '0') {
          gainsTotal = gainsTotal + (betValue * mapMartingaleGreenCoverZero[qtdBalls - 1])
        } else {
          gainsTotal = gainsTotal + betValue
        }
      }
    } else {
      gainsTotal = gainsTotal - (betValue * mapMartingaleRedCoverZero[martingale])
    }
  }

  return gainsTotal
}
