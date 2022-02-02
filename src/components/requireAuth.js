import React from 'react';
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const RequireAuth = ({children}) => {
    const isLoggedIn = useSelector(state => state.login.status);
    if (!isLoggedIn) {
        return <Navigate to={"/"} />
    } else {
        return children;
    }
};

export default RequireAuth;
