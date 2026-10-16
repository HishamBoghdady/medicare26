

export default function viewDate() {
    const now = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let Dates = {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate(),
        dayofWeek: now.getDay()
    }
    let TheDate = `${Dates.year}-${Dates.month}-${Dates.day}`
    let TheDay = `${days[Dates.dayofWeek]} `

    return { TheDate, TheDay }
}