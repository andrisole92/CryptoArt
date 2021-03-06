export const SET_ADDRESS = 'account/SET_ADDRESS';
export const SET_EMAIL = 'account/SET_EMAIL';
export const SET_FULLNAME = 'account/SET_FULLNAME';
export const SET_TOKENIDS = 'account/SET_TOKENIDS';
export const SET_TOKENS = 'account/SET_TOKENS';
export const SET_SIGNIN = 'account/SET_SIGNIN';

const initialState = {
    address: "",
    email: "",
    fullName: "",
    authenticated: false,
    tokens: null,
    tokenIds: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ADDRESS:
            return {
                ...state,
                address: action.address
            };
        case SET_EMAIL:
            return {
                ...state,
                email: action.email
            };
        case SET_FULLNAME:
            return {
                ...state,
                fullName: action.fullName
            };
        case SET_TOKENS:
            return {
                ...state,
                tokens: action.tokens
            };
        case SET_SIGNIN:
            return {
                ...state,
                authenticated: action.value
            };

        default:
            return state
    }
}

export const setAddress = (address) => {
    return dispatch => {
        dispatch({
            type: SET_ADDRESS,
            address: address
        })

    }
};

export const setEmail = (email) => {
    return dispatch => {
        dispatch({
            type: SET_EMAIL,
            email: email
        })

    }
};

export const setFullname = (fullName) => {
    return dispatch => {
        dispatch({
            type: SET_FULLNAME,
            fullName: fullName
        })

    }
};

export const setTokens = (tokens) => {
    return dispatch => {
        dispatch({
            type: SET_TOKENS,
            tokens: tokens
        })

    }
};

export const setSignedIn = (value) => {
    return dispatch => {
        dispatch({
            type: SET_SIGNIN,
            value: value
        })
    }
};

