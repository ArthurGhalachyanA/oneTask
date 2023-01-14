const defaultState = {
    validationErrors: [],
    keywords: [],
};

export const keywordReducer = (state = defaultState, action) => {
    let newState = {...state};

    switch(action.type){
        case 'UPDATE_KEYWORDS':
            newState.keywords = action.payload;
            return newState;
        case 'SET_VALIDATION_ERRORS':
            newState.validationErrors = [];
            action.payload.forEach((error) => {
                newState.validationErrors[error.param] = error.msg;
            });

            return newState;
        case 'SET_VALIDATION_ERRORS_DEFAULT':
            newState.validationErrors = [];
            return newState;
        case 'DELETE_KEYWORD_BY_ID':
            newState.keywords = newState.keywords.filter(keyword => keyword._id !== action.payload);
            return newState;
        case 'SET_KEYWORDS':
            newState.keywords = action.payload;
            return newState;
        default:
            return newState;
    }
};