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
            const place = await request('api/places/visited', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            console.log(place)
            setPlaces(place.visitedPlaces)
        } catch (e) {
        }
    }, [token, request])
    useEffect(() => {
        getPlaces()
    }, [getPlaces])
    return (
        <div>
            {visited
                ? <h1>Я здесь был</h1>
                : <h1>Я здесь не был</h1>}
            <VisitList places={places} visited={visited}/>
        </div>
    )
}