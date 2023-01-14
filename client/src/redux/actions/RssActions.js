import api from '../../http/index';

export function getRss(){
    return async (dispatch) => {
        const response = await api.get('/rss');

        if(response.status === 200)
            dispatch(setRss(response.data.rss));
    }
}

function setRss(payload){
    return {
        type: "SET_RSS",
        payload
    }
}

