import React from 'react';
import io from "socket.io-client";
import {BASE_URL} from "../http";
import {setNewRssCount} from '../redux/actions/MainLayoutActions';
import {useDispatch} from "react-redux";
import {getRss} from "../redux/actions/RssActions";

const SocketService = () => {
    const dispatch = useDispatch();

    const socket = io(BASE_URL, {
        extraHeaders: {
            Authorization: "Bearer " + localStorage.getItem('token')
        }
    });

    socket.on('new-rss', async (data) => {
        if(window.location.pathname !== '/rss'){
            await dispatch(setNewRssCount(data.newRssCount));
        }else{
            await dispatch(getRss());
        }
    });
};

export default SocketService;