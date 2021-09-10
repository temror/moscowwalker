import React from "react";
import {useHistory} from "react-router-dom";

export const FloatingButton = () => {
    const history = useHistory()
    return (
        <div id="main" className="hide-on-med-and-up">
            <div className="fixed-action-btn">
                <button
                    onClick={()=>{history.push('/')}}
                    className="btn-floating btn-large"
                style={{backgroundColor:"darkred"}}
                >
                    <i className="large material-icons">directions_walk</i>
                </button>
            </div>
        </div>
    )
}