import React, {useEffect, useState} from 'react';
import styles from "../../assets/css/styles.module.css";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from 'react-router-dom';
import {getKeyword, update} from '../../redux/actions/KeywordActions';

const KeywordUpdate = () => {
    const dispatch = useDispatch();
    const keywordId = useParams()['id'];
    const navigate = useNavigate();

    const [word, setWord] = useState('');
    const [_id, set_id] = useState('');

    const wordError = useSelector(state => state.keywordReducer.validationErrors.word);

    useEffect(() => {
        (async function(){
            const updateKeyword = await dispatch(getKeyword(keywordId));

            if(!updateKeyword)
                navigate('/');

            setWord(updateKeyword.word);
            set_id(updateKeyword._id);
        })();
    }, []);

    const sendForm = async () => {
        if(await dispatch(update(_id, word))){
            return navigate('/keywords');
        }
    };

    return (
        <div className={styles.keyword_wrapper}>
            <div>
                <h1>
                    Update keyword
                </h1>
            </div>
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
                <button onClick={() => {sendForm()}}>Update</button>
            </div>
        </div>
    );
};

export default KeywordUpdate;