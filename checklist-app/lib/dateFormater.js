import dateFormat, { masks } from 'dateformat'

const setDateFormat = (date) => {
  const currentDate = new Date()
  const messageDate = new Date(date)

  currentDate.setHours(0, 0, 0, 0)
  messageDate.setHours(0, 0, 0, 0)
  const diffInDays = Math.floor(
    (currentDate - messageDate) / (1000 * 60 * 60 * 24),
  )

  if (diffInDays <= 7 && diffInDays > 1) {
    return dateFormat(date, 'H:MM, dddd')
  } else if (diffInDays === 0) {
    masks.hammerTime = 'HH:MM "Today"'
    return dateFormat(date, 'hammerTime')
  } else if (diffInDays === 1) {
    masks.hammerTime = 'HH:MM "Yesterday"'
    return dateFormat(date, 'hammerTime')
  } else if (diffInDays >= 365) {
    return dateFormat(date, 'H:MM,  d,mm,yyyy')
  } else {
    return dateFormat(date, 'H:MM, ddd, d,mmm')
  }
}

export default setDateFormat
