export const SET_LOADING = 'app/SET_LOADING';
export const SET_LOADING_TEXT = 'app/SET_LOADING_TEXT';
export const SET_MESSAGE = 'app/SET_MESSAGE';


const initialState = {
    isLoading: false,
    loadingText: "",
    message: "",
    messageHeader: "",
    messageType: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.value
            };
        case SET_LOADING_TEXT:
            return {
                ...state,
                loadingText: action.text
            };
        case SET_MESSAGE:
            return {
                ...state,
                message: action.message,
                messageHeader: action.messageHeader,
                messageType: action.messageType
            };

        default:
            return state
    }
}

export const setLoading = (value) => {
    return dispatch => {
        dispatch({
            type: SET_LOADING,
            value: value
        })

    }
};

export const setLoadingText = (text) => {
    return dispatch => {
        dispatch({
            type: SET_LOADING_TEXT,
            text: text
        })

    }
};

export const setMessage = (message,messageHeader,messageType) => {
    return dispatch => {
        dispatch({
            type: SET_MESSAGE,
            message: message,
            messageHeader: messageHeader,
            messageType: messageType,
        })

    }
};

