const defaultState = {
    rss: [],
};

export const rssReducer = (state = defaultState, action) => {
    let newState = {...state};

    switch(action.type){
        case 'SET_RSS':
            newState.rss = action.payload;
            return newState;
        default:
            return newState;
    }
};