export const SET_ADDRESS = 'account/SET_ADDRESS';
export const SET_EMAIL = 'account/SET_EMAIL';
export const SET_FULLNAME = 'account/SET_FULLNAME';

const initialState = {
    address: "",
    email: "",
    fullName: ""
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ADDRESS:
            return {
                ...state,
                email: action.address
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
            address: fullName
        })

    }
};

