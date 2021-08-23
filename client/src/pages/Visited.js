import {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {VisitList} from "../components/VisitList";
import {Preloader} from "../components/Preloader";

export const Visited = ({visited}) => {
    const [places, setPlaces] = useState([])
    const [visit,setVisit] = useState()
    const {request,loading} = useHttp()
    const {token,userId} = useContext(AuthContext)

    const getPlaces = useCallback(async visited => {
        try {
            const place = await request(`api/places/visited/${visited}/${userId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            console.log(place)
            setPlaces(place.visitedPlaces)
            setVisit(visited)
        } catch (e) {
        }
    }, [token, request])
    const href = window.location.href
    useEffect(() => {
        getPlaces(visited)
    }, [href])
    if(loading){
        return <Preloader/>
    }
    return (
        <div>
            {visit
                ? <h1>Я здесь был</h1>
                : <h1>Хочу побывать</h1>}
            <VisitList places={places}/>
        </div>
    )
}