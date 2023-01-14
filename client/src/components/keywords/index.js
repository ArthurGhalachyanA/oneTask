import React, {useEffect, useState, useRef} from 'react';
import styles from "../../assets/css/styles.module.css";
import {useDispatch, useSelector} from "react-redux";
import {getKeywords, deleteKeyword} from "../../redux/actions/KeywordActions";
import {useNavigate} from 'react-router-dom';

import DeleteConfirmPopup from '../common/deleteConfirmPopup';

const KeywordIndex = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const keywords = useSelector(state => state.keywordReducer.keywords);
    const idKeywordRef = useRef();

    const [dialog, setDialog] = useState({
       message: 'test message',
       isLoading: false,
    });

    const handleDelete = (_id) => {
        setDialog({isLoading: true});
        idKeywordRef.current = _id;
    };

    const areYouSure = async (confirm) => {
        if(confirm)
            await dispatch(deleteKeyword(idKeywordRef.current));

        setDialog({isLoading: false});
    };

    useEffect(() => { dispatch(getKeywords()) }, []);

    return (
        <div>
            <h1>My keywords</h1>
            <button onClick={() => navigate('create')} className={`${styles.button} ${styles.button4}`}>create</button>
            <table className={styles.customers}>
                <thead>
                    <tr>
                        <td>Word</td>
                        <td style={{width: "25%"}}>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {keywords.length <= 0 &&
                        <tr>
                            <td colSpan={'3'}>Result not found</td>
                        </tr>
                    }
                    {keywords.map((keyword) => {
                        return (
                            <tr key={keyword.word}>
                                <td>{keyword.word}</td>
                                <td>
                                    <button
                                        onClick={() => {handleDelete(keyword._id)}}
                                        className={`${styles.button} ${styles.button4} ${styles.red}`}>
                                        delete
                                    </button>
                                    <button
                                        onClick={() => {navigate(`update/${keyword._id}`)}}
                                        className={`${styles.button} ${styles.button4} ${styles.blue}`}>
                                        edit
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            {dialog.isLoading && <DeleteConfirmPopup onDialog={areYouSure} message={dialog.message} />}
        </div>
    );
};

export default KeywordIndex;