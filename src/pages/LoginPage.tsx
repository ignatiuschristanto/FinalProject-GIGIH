import React, { useEffect, useCallback } from "react";
import {Box} from '@mui/material';
import {login} from '../redux/tokenSlice';
import {UserData} from "../interface-types/user";
import { getUserData } from "../config/fetchAPI";
import { useHistory } from "react-router-dom";
import { useTypedDispatch, useTypedSelector } from "../redux/store";
import Home from "./HomePage";

const Login: React.FC = () => {
    const dispatch = useTypedDispatch();
    const history = useHistory();

    const setLogin = useCallback(async (token:any, expiresIn:any) => {
        try{        
            const userData : UserData = await getUserData(token);
            dispatch(login({
                accessToken: token,
                isLogin: true,
                user: userData,
                expiredDate: + new Date() + expiresIn * 1000,
            }));
            history.push('/create-playlist');
        }catch(error){
            alert(error);
        }
    },[dispatch, history]);

    useEffect(() => {
        const tokenParam : string | null = new URLSearchParams(window.location.hash).get('#access_token');
        const expiresIn: string | null = new URLSearchParams(window.location.hash).get('expires_in');
        if(tokenParam !== null ){
            setLogin(tokenParam, expiresIn);
        }
        
    },[setLogin]);

    const getSpotifyLinkAuthorize= () => {
        const state= Date.now().toString();
        const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
        const redirectUri = window.location.href;
        const scope = 'playlist-modify-private';
        return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;
    }

    const isLogin: boolean = useTypedSelector((state) => state.authToken.isLogin);
    console.log ('Test bool' ,isLogin);
    return (
        <Box>
            {isLogin && (
                <Home />
            )}
            {!isLogin && (
                <><h1>Please Login to Continue</h1>
                <a href={getSpotifyLinkAuthorize()}>
                    <button className="new-btn">Login</button>
                </a></>

            )}
                
            
            
        </Box>
    )
}

export default Login;