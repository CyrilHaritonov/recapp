import React, {useEffect, useState} from 'react';
import axios from "axios";

const useAuth = (code) => {

    useEffect(() => {
       // return //() => {
        return (axios.post("http://localhost:3001/login",{
                code,
            }).then(res => {
                localStorage.setItem("accessToken" , res.data.accessToken);
                localStorage.setItem("refreshToken", res.data.refreshToken);
                localStorage.setItem("expiresIn", res.data.expiresIn);
                console.log(res.data);
                window.location = "/";
            }).catch(() => {
                //window.location = '/'
            }));
        //};
    }, [code]);

    useEffect(() => {
        if (!localStorage.getItem("refreshToken") || !localStorage.getItem("expiresIn")) return;
        const interval = setInterval(() => {
            let refreshToken = localStorage.getItem("refreshToken");
            axios.post("http://localhost:3001/refresh", {
                refreshToken,
            }).then(res => {
                localStorage.setItem("accessToken" , res.data.accessToken);
                localStorage.setItem("refreshToken", res.data.refreshToken);
                localStorage.setItem("expiresIn", res.data.expiresIn);
            }).catch(() => {
                //window.location = "/";
            })}, (localStorage.getItem("expiresIn") - 60) * 1000);
        return () => clearInterval(interval);
        }, [localStorage.getItem("refreshToken"), localStorage.getItem("expiresIn")]);

    return localStorage.getItem("accessToken");
};

export default useAuth;
