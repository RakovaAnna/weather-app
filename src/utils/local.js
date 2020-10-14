export const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
export const units = "metric";
export const lang = "ru";

export function mesCityNotFound(city) {
    return `Город "${city}" не найден`
}