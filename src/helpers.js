export function weekdayName(ms) {
    return new Date(ms).toLocaleString('ru', {weekday: 'long'});
}

export function monthDay(ms) {
    return new Date(ms).toLocaleDateString("ru", {day: 'numeric', month: 'long'});
}

export function iconWeather(icon) {
    return "http://openweathermap.org/img/wn/" + icon + "@4x.png";
}

export function today() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth()+1;
    const year = currentDate.getFullYear();

    return year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
}
