export const SET_CORE = 'contract/SET_CORE'
export const SET_SALE = 'contract/SET_SALE'

const initialState = {
    core: null,
    sale: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CORE:
            return {
                ...state,
                core: action.contract
            }

        case SET_SALE:
            return {
                ...state,
                sale: action.contract
            }

        default:
            return state
    }
}

export const setCore = () => {
    return dispatch => {
        dispatch({
            type: SET_CORE
        })

    }
}


export const setSale = () => {
    return dispatch => {
        dispatch({
            type: SET_SALE
        })
    }
}