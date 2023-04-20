import { subHours } from 'date-fns'
export function getLastHoursDatetime (hoursBefore: number = 24): Date {
  const yesterday = new Date(new Date().getTime() - (hoursBefore * 60 * 60 * 1000))
  const last24Hours = subHours(yesterday, 3)
  console.log('Hora => ', last24Hours)
  return last24Hours
}
