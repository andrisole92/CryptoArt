export const ADD_AUCTION = 'auction/CREATE';
export const REMOVE_AUCTION = 'auction/REMOVE';
export const SET_TOTAL = 'auction/SET_TOTAL';
export const SET_TOKENS = 'auction/SET_TOKENS';

const initialState = {
    total: 0,
    tokens: null,
    byPage: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_AUCTION:
            return {
                ...state,
                byPage: [...state.byPage, action.auction]
            };

        case REMOVE_AUCTION:
            return {
                ...state,
                byPage: [...state.byPage, action.auction]
            };

        case SET_TOTAL:
            return {
                ...state,
                total: action.total
            };
        case SET_TOKENS:
            return {
                ...state,
                tokens: action.tokens
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


export const setAuctionTotal = (total) => {
    return dispatch => {
        dispatch({
            type: SET_TOTAL,
            total: total
        })
    }
}
export const setTokenArray = (arr) => {
    return dispatch => {
        dispatch({
            type: SET_TOKENS,
            tokens: arr
        })
    }
}