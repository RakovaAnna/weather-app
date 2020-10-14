import {actionType} from "./actionType";

export const setCity = (city) => {
    return {
        type: actionType.SET_CITY,
        payload: {
            city,
        }
    };
};

export const setNowInfo = (nowInfo) => {
    return {
        type: actionType.SET_NOW_INFO,
        payload: {
            nowInfo,
        }
    };
}

export const setNextDays = (nextDays) => {
    return {
        type: actionType.SET_NEXT_DAYS,
        payload: {
            nextDays,
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

export const fetchDataNow = (city) => {
    return {
        type: actionType.FETCH_DATA_NOW,
        payload: {
            city
        }
    }
}

export const fetchDataNextDays = (city) => {
    return {
        type: actionType.FETCH_DATA_NEXT_DAYS,
        payload: {
            city
        }
    }
}