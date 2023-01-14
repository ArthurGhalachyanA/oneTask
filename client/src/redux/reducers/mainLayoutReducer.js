const defaultState = {
    newRssCount: 0,
};

export const mainLayoutReducer = (state = defaultState, action) => {
    let newState = {...state};

    switch(action.type){
        case 'SET_NEW_RSS_COUNT':
            newState.newRssCount = action.payload;
            return newState;
        default:
            return newState;
    }
};