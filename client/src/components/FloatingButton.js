import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export const FloatingButton = () => {
    const auth = useContext(AuthContext)
    const history = useHistory()
    const logoutHandler = event =>{
        event.preventDefault()
        auth.logout()
        auth.finish = false
        history.push('/')
    }
    return (
        <div id="main" className="hide-on-med-and-up">
            <div className="fixed-action-btn">
                <button
                    onClick={logoutHandler}
                    className="btn-floating btn-large"
                style={{backgroundColor:"darkred"}}
                >
                    <i className="large material-icons">close</i>
                </button>
            </div>
        </div>
    )
}