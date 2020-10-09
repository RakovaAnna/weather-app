import {API_KEY, lang, units} from "./utils/local";

export const api = {
    loadWeatherForCity: (city) => {
        return fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${units}&lang=${lang}`)
            .then((data) => {
                return data.ok ? data.json() : new Promise(resolve => null)
            })
    },

    loadAll: (cities) => {
        const requests = cities.map(city => fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${units}&lang=${lang}`)
            .then((result) => result.json()));
        return Promise.all(requests)
            // .then((results) => {
            //     return results.map((result, num) => {
            //         return result.json()
            //         //     } else if (num + 1 === cities.length) {
            //         //         return new Promise(resolve => null);
            //         //     }
            //         // })
            //     })
            // })
    }
}