import api from '../../http/index';

export function getKeywords(){
    return async (dispatch) => {
        const {data} = await api.get('/keywords');

        dispatch(setKeywords(data.keywords));
    }
}

export function create(word){
    return async (dispatch) => {
        const response = await api.post('/keywords', {word});

        dispatch(setValidationErrors(response.data.validationErrors));

        return response.status === 201;
    }
}

export function update(_id, word){
    return async (dispatch) => {
        const response = await api.put('/keywords', {_id, word});

        dispatch(setValidationErrors(response.data.validationErrors));

        return response.status === 201;
    }
}

export function getKeyword(_id){
    return async () => {
        const response = await api.get('/keyword', {params: {_id}});

        return response.status === 200 ? response.data.keyword: false;
    }
}

export function deleteKeyword(_id){
    return async (dispatch) => {
        const response = await api.delete('/keywords', {data: {_id: _id}});
        if(response.status === 202){
            dispatch(deleteKeywordById(_id));

            return true;
        }
    }
}

function deleteKeywordById(payload){
    return {
        type: "DELETE_KEYWORD_BY_ID",
        payload
    }
}

function setKeywords(payload){
    return {
        type: "SET_KEYWORDS",
        payload
    }
}

export function setValidationErrors(payload){
    return {
        type: "SET_VALIDATION_ERRORS",
        payload
    }
}