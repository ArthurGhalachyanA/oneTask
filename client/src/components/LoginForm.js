import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from 'react-router-dom'
import {login, defaults} from '../redux/actions/AuthActions';
import styles from "../assets/css/styles.module.css";

const LoginForm = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const errorMessage = useSelector(state => state.userReducer.errorMessage);

    useEffect(() => { dispatch(defaults()) }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.errorMessage}>{errorMessage}</div>
                <div className={styles.form_container}>
                    <label htmlFor="uname"><b>Username</b></label>
                    <input
                        type="text"
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className={styles.form_input}
                    />
                </div>
                <div className={styles.form_container}>
                    <label htmlFor="psw"><b>Password</b></label>
                    <input
                        type="password"
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className={styles.form_input}
                    />
                </div>
                <button onClick={() => {dispatch(login(email, password))}}>Login</button>
                <Link to={'/sign-up'}>Sign up</Link>
            </div>
        </div>
    );
};

export default LoginForm;