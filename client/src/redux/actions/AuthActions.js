import api from '../../http/index';

export function defaults(){
    return async (dispatch) => {
        dispatch(setDefaults());
    }
}

export function login(email, password){
    return async (dispatch) => {
        const {data} = await api.post('/login', {email, password});

        if(data.errorMessage.length){
            dispatch(setErrorMessage(data.errorMessage));

            return false;
        }

        localStorage.setItem('token', data.tokens.accessToken);
        dispatch(setAuth(true));
        dispatch(setUser(data.user));
    }
}

export function signUp(email, password, fullName){
    return async (dispatch) => {
        const response = await api.post('/sign-up', {email, password, fullName});

        dispatch(setValidationErrors(response.data.validationErrors));

        if(response.status === 200){
            localStorage.setItem('token', response.data.tokens.accessToken);
            dispatch(setAuth(true));
            dispatch(setUser(response.data.user));

            return true;
        }
    }
}

export function logout(){
    return async (dispatch) => {
        const response = await api.post('/logout');

        localStorage.removeItem('token');
        dispatch(setAuth(false));
        dispatch(setUser({}));
        dispatch(setValidationErrors([]));
        dispatch(setErrorMessage(''));
    }
}

export function checkAuth(){
    return async (dispatch) => {
        const {data} = await api.get(`/refresh`, {withCredentials:true});

        localStorage.setItem('token', data.tokens.accessToken);
        dispatch(setAuth(true));
        dispatch(setUser(data.user));
    }
}

function setDefaults(){
    return {
        type: "RESET_ERRORS"
    }
}

function setAuth(payload){
    return {
        type: "SET_AUTH",
        payload
    }
}

function setUser(payload){
    return {
        type:'SET_USER',
        payload
    }
}

function setErrorMessage(payload){
    return {
        type:'SET_ERROR_MESSAGE',
        payload
    }
}

function setValidationErrors(payload){
    return {
        type:'SET_VALIDATION_ERRORS',
        payload
    }
}

export function setLoading(payload){
    return {
        type:'SET_LOADING',
        payload
    }
}