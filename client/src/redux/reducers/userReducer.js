const defaultState = {
    user: {},
    isAuth: false,
    validationErrors: [],
    errorMessage: '',
    isLoading: true
};

export const userReducer = (state = defaultState, action) => {
    let newState = {...state};

    switch(action.type){
        case 'SET_AUTH':
            newState.isAuth = action.payload;
            return newState;
        case 'SET_ERROR_MESSAGE':
            newState.errorMessage = action.payload;
            return newState;
        case 'SET_VALIDATION_ERRORS':
            newState.validationErrors = [];
            action.payload.forEach((error) => {
                newState.validationErrors[error.param] = error.msg;
            });

            return newState;
        case 'SET_USER':
            newState.user = action.payload;
            return newState;
        case 'SET_LOADING':
            newState.isLoading = action.payload;
            return newState;
        case 'RESET_ERRORS':
            newState.errorMessage = defaultState.errorMessage;
            newState.validationErrors = defaultState.validationErrors;

            return newState;
        default:
            return newState;
    }
};