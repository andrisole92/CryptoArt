import {SET_EMAIL} from "./account";

export const ADD_ART = 'art/ADD';
export const REMOVE_ART = 'art/REMOVE';
export const SET_TOTAL = 'art/SET_TOTAL';

const initialState = {
    total: null,
    tokens: null,
    allArt: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_ART:
            return {
                ...state,
                allArt: [...state.allArt, action.art]
            }

        case REMOVE_ART:
            return {
                ...state,
                allArt: [...state.allArt, action.art]
            }

        case SET_TOTAL:
            return {
                ...state,
                total: action.total
            }

        default:
            return state
    }
}

export const addArt = (art) => {
    return dispatch => {
        dispatch({
            type: ADD_ART,
            art: art
        })

    }
}


export const removeArt = () => {
    return dispatch => {
        dispatch({
            type: REMOVE_ART
        })
    }
}


export const setTotal = (total) => {
    return dispatch => {
        dispatch({
            type: SET_TOTAL,
            total: total
        })
    }
}
