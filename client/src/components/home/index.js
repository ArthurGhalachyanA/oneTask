import React from 'react';
import styles from "../../assets/css/styles.module.css";
import {useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';

const KeywordIndex = () => {
    const user = useSelector(state => state.userReducer.user);
    const navigate = useNavigate();
    return (
        <div>
            <h1>My home page</h1>
            <h2>{user.email}</h2>

            <div>
                <a onClick={() => navigate('keywords')} className={`${styles.button} ${styles.button4}`}>Keywords</a>
                <a onClick={() => navigate('rss')} className={`${styles.button} ${styles.button4}`}>Rss</a>
            </div>
        </div>
    );
};

export default KeywordIndex;