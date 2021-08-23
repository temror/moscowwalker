import React, {useContext} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export const Navbar = () =>{
    const history = useHistory()
    const auth = useContext(AuthContext)
    const logoutHandler = event =>{
        event.preventDefault()
        auth.logout()
        auth.finish = false
        history.push('/')
    }
    return(
        <nav>
            <div className="nav-wrapper blue darken-1">
                <ul id="nav-mobile" className="left">
                    <li><NavLink to='/walk'>Сделать гуль</NavLink></li>
                    <li><NavLink to='/was'>Я здесь был</NavLink></li>
                    <li><NavLink to='/want'>Хочу побывать</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
        </nav>
    )
}
