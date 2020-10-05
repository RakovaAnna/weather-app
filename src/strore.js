import {createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension';

const initialState = {
    location: "Пермь"
};
const setLocation = (location) => {

    return {
        type: "SET_LOCATION",
        payload: {
            location
        }
    };
};

const reducer = (state=initialState, action) => {
    if (action.type === "SET_LOCATION") {
        const newLocation = action.payload.location;
        return {
            ...state,
            location: newLocation
        };
    }
    return state;
};

const store = createStore(reducer, composeWithDevTools(

));
window.store = store;