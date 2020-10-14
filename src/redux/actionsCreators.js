import {actionType} from "./actionType";

export const setCity = (city) => {
    return {
        type: actionType.SET_CITY,
        payload: {
            city,
        }
    };
};

export const setNow = (now) => {
    return {
        type: actionType.SET_NOW,
        payload: {
            now,
        }
    };
}

export const setNextDays = (days) => {
    return {
        type: actionType.SET_NEXT_DAYS,
        payload: {
            days,
        }
    };
}

export const setMessage = (message) => {
    return {
        type: actionType.SET_MESSAGE,
        payload: {
            message
        }
    }
}

export const fetchData = (city) => {
    return {
        type: actionType.FETCH_DATA,
        payload: {
            city
        }
    }
}