import {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {VisitList} from "../components/VisitList";
import {Preloader} from "../components/Preloader";

export const Visited = ({visited}) => {
    const [places, setPlaces] = useState([])
    const [visit, setVisit] = useState()
    const {request, loading} = useHttp()
    const {token, userId} = useContext(AuthContext)
    const href = window.location.href

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
    }, [token, request,userId])

    useEffect(() => {
        getPlaces(visited)
    }, [href,getPlaces,visited])

    if (loading) {
        return <Preloader/>
    }
    return (
        <>
            {/*mobile version*/}
            <div className="row hide-on-med-and-up">
                {visit
                    ? <h4
                        className="col s10 offset-s1 center-align">
                        Я здесь был
                    </h4>
                    : <h4
                        className="col s10 offset-s1 center-align">
                        Хочу побывать
                    </h4>
                }
            </div>
            {/*desktop version*/}
            <div className="hide-on-small-only">
                {visit
                    ? <h4>Я здесь был</h4>
                    : <h4>Хочу побывать</h4>}
            </div>
            <VisitList places={places}/>
        </>
    )
}