import {useContext} from "react";
import {useHistory} from "react-router-dom"
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

export const WalkPage = () =>{
    const auth = useContext(AuthContext)
    const history = useHistory()
    const {request} = useHttp()

    const walkHandler = async () =>{
        try{
            //{id: auth.userId} - req
            const data = await request('api/places','POST', null,{
                Authorization: `Bearer ${auth.token}`
            })
            auth.selectedPlace = data
            history.push(`/places/${data._id}`)
        }
        catch (e){}
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