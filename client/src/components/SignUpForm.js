import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {defaults, signUp} from '../redux/actions/AuthActions';
import styles from "../assets/css/styles.module.css";
import {Link} from "react-router-dom";

const LoginForm = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const errorMessage = useSelector(state => state.userReducer.errorMessage);

    const passwordError = useSelector(state => state.userReducer.validationErrors.password);
    const emailError = useSelector(state => state.userReducer.validationErrors.email);
    const fullNameError = useSelector(state => state.userReducer.validationErrors.fullName);

    useEffect(() => { dispatch(defaults()) }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.errorMessage}>{errorMessage}</div>
                <div className={styles.form_container}>
                    <label><b>Full name</b></label>
                    <input
                        type="text"
                        placeholder='Full name'
                        onChange={(e) => setFullName(e.target.value)}
                        value={fullName}
                        className={styles.form_input}
                    />
                    <span className={styles.form_error}>
                        {fullNameError}
                    </span>
                </div>
                <div className={styles.form_container}>
                    <label><b>Username</b></label>
                    <input
                        type="text"
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className={styles.form_input}
                    />
                    <span className={styles.form_error}>
                        {emailError}
                    </span>
                </div>
                <div className={styles.form_container}>
                    <label><b>Password</b></label>
                    <input
                        type="password"
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className={styles.form_input}
                    />
                    <span className={styles.form_error}>
                        {passwordError}
                    </span>
                </div>
                <button onClick={() => {dispatch(signUp(email, password, fullName))}}>Sign up</button>
                <Link to={'/login'}>Login</Link>
            </div>
        </div>
    );
};

export default LoginForm;