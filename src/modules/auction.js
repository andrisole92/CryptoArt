export const ADD_AUCTION = 'auction/CREATE';
export const REMOVE_AUCTION = 'auction/REMOVE';

const initialState = {
    total: 0,
    byPage: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_AUCTION:
            return {
                ...state,
                total: state.total+1,
                byPage: [...state.byPage, action.auction]
            }

        case REMOVE_AUCTION:
            return {
                ...state,
                total: state.total+1,
                byPage: [...state.byPage, action.auction]
            }

        default:
            return state
    }
}

export const addAuction = (auction) => {
    return dispatch => {
        dispatch({
            type: ADD_AUCTION,
            auction: auction
        })

    }
}


export const removeAuction = (auction) => {
    return dispatch => {
        dispatch({
            type: REMOVE_AUCTION,
            auction: auction
        })
    }
}