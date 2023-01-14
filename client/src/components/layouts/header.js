import React from 'react';
import styles from '../../assets/css/styles.module.css';
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/actions/AuthActions";
import {useNavigate} from 'react-router-dom';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const newRssCount = useSelector(state => state.mainLayoutReducer.newRssCount);



    return (
        <div className={styles.header}>
            <button onClick={() => navigate('/')} className={`${styles.button} ${styles.logout_button}`}>
                Home
            </button>
            <button onClick={() => navigate('/rss')} className={`${styles.button} ${styles.logout_button}`}>
                Rss
                {newRssCount > 0 && <span className={styles.new_rss_header_notification}>{newRssCount}</span>}
            </button>
            <button onClick={() => {dispatch(logout())}} className={`${styles.button} ${styles.logout_button}`}>
                logout
            </button>

        </div>
    );
};

export default Header;