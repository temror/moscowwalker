import {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {VisitList} from "../components/VisitList";
import {NotVisitList} from "../components/NotVisitList";

export const Visited = ({visited}) => {
    const [places, setPlaces] = useState([])
    const {request} = useHttp()
    const {token} = useContext(AuthContext)

    const getPlaces = useCallback(async () => {
        try {
            console.log('in try block ')
            const place = await request('api/places/visited', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            console.log(place)
            setPlaces(place.visitedPlaces)
        } catch (e) {
        }
    }, [token, request])
    const href = window.location.href
    useEffect(() => {
        getPlaces()
        console.log(visited)
    }, [href])
    return (
        <div>
            {visited
                ? <h1>Я здесь был</h1>
                : <h1>Я здесь не был</h1>}
            <VisitList places={places}/>
        </div>
    )
}