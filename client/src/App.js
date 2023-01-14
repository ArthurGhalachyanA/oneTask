import React, {useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {checkAuth, setLoading} from './redux/actions/AuthActions';
import {Routes, Route} from "react-router-dom";
import SocketService from "./services/socketService";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import HomeIndex from "./components/home/index";
import RssIndex from "./components/rss/index";
import KeywordIndex from "./components/keywords/index";
import KeywordCreate from "./components/keywords/create";
import KeywordUpdate from "./components/keywords/update";
import LayoutMain from './components/layouts/main';

const App = () => {
    const isAuth = useSelector(state => state.userReducer.isAuth);
    const isLoading = useSelector(state => state.userReducer.isLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            if(localStorage.getItem('token')){
                await dispatch(checkAuth());
            }

            dispatch(setLoading(false));
        })();

    }, []);

    if(isLoading) return;

    if(!isAuth){
        return (
            <Routes>
                <Route path="login" element={<LoginForm />} />
                <Route path="sign-up" element={<SignUpForm />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        );
    }

    return (
        <LayoutMain>
            <SocketService />
            <Routes>
                <Route path="/" element={<HomeIndex />} />
                <Route path="/keywords" element={<KeywordIndex />} />
                <Route path="/keywords/create" element={<KeywordCreate />} />
                <Route path="/keywords/update/:id" element={<KeywordUpdate />} />
                <Route path="/rss" element={<RssIndex />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </LayoutMain>
    );

};

export default App;