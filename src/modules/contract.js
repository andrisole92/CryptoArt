export const SET_CORE = 'contract/SET_CORE'
export const SET_TRUFFLECORE = 'contract/SET_TRUFFLECORE'

const initialState = {
    core: null,
    truffleCore: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CORE:
            return {
                ...state,
                core: action.contract
            }

        case SET_TRUFFLECORE:
            return {
                ...state,
                truffleCore: action.contract
            }

        default:
            return state
    }
}

export const setCore = (core) => {
    return dispatch => {
        dispatch({
            type: SET_CORE,
            contract: core
        })

    }
}


export const setTruffleCore = (core) => {
    return dispatch => {
        dispatch({
            type: SET_TRUFFLECORE,
            contract: core
        })
    }
}