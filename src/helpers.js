export function ucFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function weekdayName(ms) {
    return ucFirst(new Date(ms).toLocaleString('ru', {weekday: 'long'}));
}

export function monthDay(ms) {
    return new Date(ms).toLocaleDateString("ru", {day: 'numeric', month: 'long'});
}

export function iconWeather(icon, size) {
    return "http://openweathermap.org/img/wn/" + icon + "@" + size + ".png";
}

export function today() {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth()+1;
    var year = currentDate.getFullYear();

    return year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
}
