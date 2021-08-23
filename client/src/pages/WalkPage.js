import {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom"
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Preloader} from "../components/Preloader";

export const WalkPage = () =>{
    const auth = useContext(AuthContext)
    const history = useHistory()
    const {request,loading} = useHttp()

    const walkHandler = async () =>{
        try{
            const data = await request('api/places','POST', {id: auth.userId},{
                Authorization: `Bearer ${auth.token}`
            })
            auth.selectedPlace = data
            history.push(`/places/${data._id}`)
        }
        catch (e){}
    }
    if(loading){
        return <Preloader/>
    }
    return(
        <div>
            <h1>Где мне погулять?</h1>
            <button
            onClick={walkHandler}
            >
                Сделать гуль
            </button>
        </div>
    )
}