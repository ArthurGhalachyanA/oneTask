import React, {useEffect, useState} from 'react';
import styles from "../../assets/css/styles.module.css";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {create, setValidationErrors} from '../../redux/actions/KeywordActions';

const KeywordCreate = () => {
    const dispatch = useDispatch();
    const [word, setWord] = useState('');

    const wordError = useSelector(state => state.keywordReducer.validationErrors.word);

    const navigate = useNavigate();

    const sendForm = async () => {
        if(await dispatch(create(word))){
            return navigate('/keywords');
        }
    };

    useEffect(() => {
        dispatch(setValidationErrors([]))
    }, []);

    return (
        <div className={styles.keyword_wrapper}>
            <div><h1>Create keyword</h1></div>
            <div className={styles.keyword_container}>
                <div className={styles.form_container}>
                    <label><b>word</b></label>
                    <input
                        type="text"
                        placeholder='Word'
                        onChange={(e) => setWord(e.target.value)}
                        value={word}
                        className={styles.form_input}
                    />
                    <span className={styles.form_error}>{wordError}</span>
                </div>
                <button onClick={() => {sendForm()}}>Create</button>
            </div>
        </div>
    );
};

export default KeywordCreate;