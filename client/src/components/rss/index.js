import React, {useEffect, useState, useRef} from 'react';
import styles from "../../assets/css/styles.module.css";
import {useDispatch, useSelector} from "react-redux";
import {getRss} from "../../redux/actions/RssActions";
import {setNewRssCount} from '../../redux/actions/MainLayoutActions';

const KeywordIndex = () => {
    const dispatch = useDispatch();
    const rss = useSelector(state => state.rssReducer.rss);

    useEffect(() => {
        dispatch(setNewRssCount(0));
        dispatch(getRss())
    }, []);

    return (
        <div>
            <h1>My rss</h1>
            <table className={styles.customers}>
                <thead>
                <tr>
                    <td>Word</td>
                    <td style={{width: "50%"}}>Description</td>
                </tr>
                </thead>
                <tbody>
                {rss.length <= 0 && <tr><td colSpan={'2'}>Result not found</td></tr>}
                {rss.map((rssItem) => {
                    return (
                        <tr key={rssItem['rssRef'].link}>
                            <td>
                                <a target={`_blank`} href={rssItem['rssRef'].link}>{rssItem['rssRef'].title}</a>
                            </td>
                            <td>
                                <div style={{display:'flex'}}>
                                    <p>{rssItem['rssRef'].description}</p>
                                    {rssItem.wasSeenStatus === 0 && <p className={styles.rss_new_flag}>new</p>}
                                </div>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
};

export default KeywordIndex;