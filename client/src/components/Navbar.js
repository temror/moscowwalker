import React, {useContext} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import 'materialize-css'

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
        <>
        <nav>
            <div className="nav-wrapper black darken-1">
                <ul id="nav-mobile" className="right">
                    <li className="hide-on-small-only"><NavLink
                        to='/walk'>Сделать гуль</NavLink></li>
                    <li><NavLink to='/was'>Я здесь был</NavLink></li>
                    <li><NavLink to='/want'>Хочу побывать</NavLink></li>
                    <li
                    style={{backgroundColor:"darkred"}}
                    ><a href="/" onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
        </nav>
            </>
    )
}
