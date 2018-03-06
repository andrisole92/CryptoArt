export const ADD_ART = 'art/ADD'
export const REMOVE_ART = 'art/REMOVE'

const initialState = {
    allArt: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_ART:
            return {
                ...state,
                allArt: [...state.allArt, action.newArt]
            }

        case REMOVE_ART:
            return {
                ...state,
                allArt: [...state.allArt, action.newArt]
            }

        default:
            return state
    }
}

export const addArt = () => {
    return dispatch => {
        dispatch({
            type: ADD_ART
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