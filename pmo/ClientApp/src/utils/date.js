export const getFullDate = (d,separator) => {
    const date = new Date(d)
    let year = date.toLocaleDateString('en-GB', {year: 'numeric'})
    let month = date.toLocaleDateString('en-GB', {month: '2-digit'})
    let day = date.toLocaleDateString('en-GB', {day: '2-digit'})
    return `${year}${separator}${month}${separator}${day}`//date.toLocaleDateString('en-GB')
  }