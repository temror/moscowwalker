import {useHistory} from "react-router-dom"
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";

export const PlaceInfo = () => {
    const auth = useContext(AuthContext)
    const place = auth.selectedPlace
    const {request} = useHttp()
    const history = useHistory()

    const visit = async visit =>{
        try {
            const data = await request(`../api/places/visit`, 'POST', {placeId: auth.selectedPlace._id,userId: auth.userId,visit},
                {
                    Authorization: `Bearer ${auth.token}`
                }
                )
            history.push('/')
            console.log(data)
        }catch (e){}
    }
    return (
        <div>
            <h1>{place.name}</h1>
            <p>{place.description}</p>
            <button
            onClick={()=>{
                visit(true)}}
            >
                Был
            </button>
            <button
                onClick={()=>{
                    visit(false)}}
            >
                Не был
            </button>
        </div>
    )
}