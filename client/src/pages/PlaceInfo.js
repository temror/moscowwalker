import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {Preloader} from "../components/Preloader";

export const PlaceInfo = () => {
    const auth = useContext(AuthContext)
    const place = auth.selectedPlace
    const {request, loading} = useHttp()

    const [visited, setVisited] = useState()
    useEffect(() => {
        place.owners.forEach(e => {
            if (e.id === auth.userId) {
                setVisited(e.visited)
            }
        })
    })

    const changePlace = async (visit, url) => {
        window.history.back()
        try {
            await request(
                `../api/places/${url}`,
                'POST',
                {placeId: auth.selectedPlace._id, userId: auth.userId, visit},
                {Authorization: `Bearer ${auth.token}`})
            auth.placesLength = false
        } catch (e) {
        }
    }

    if (loading) {
        return <Preloader/>
    }
    return (
        <div className="row">
            <h4 className="no-pad hide-on-med-only">{place.name}</h4>
            <h2 className="center-align hide-on-small-only hide-on-large-only" style={{margin: 80}}>{place.name}</h2>
            <div>
                <img className="col s12 m6 l4" style={{marginBottom: 20}}
                     src={require(`../images/${place._id}.png`).default} alt=""/>
            </div>
            <div className="col l8 m6 s12">
                {visited === undefined && <>
                    <button
                        className="waves-effect waves-light btn-small white black-text"
                        onClick={() => {
                            changePlace(true, "visit")
                        }}>Был
                    </button>
                    <button
                        className="waves-effect waves-light btn-small"
                        style={{marginLeft: 20, backgroundColor: "darkred"}}
                        onClick={() => {
                            changePlace(false, "visit")
                        }}>Не был
                    </button>
                    <br/>
                </>}

                {visited && <>
                    <button
                        className="waves-effect waves-light btn-small"
                        style={{backgroundColor: "darkred"}}
                        onClick={() => {
                            changePlace(false, "update")
                        }}>Убрать из посещенных
                    </button>
                    <br/></>}

                {visited === false && <>
                    <button
                        className="waves-effect waves-light btn-small"
                        style={{backgroundColor: "darkred"}}
                        onClick={() => {
                            changePlace(true, "update")
                        }}>Я здесь побывал
                    </button>
                    <br/></>
                }
                <button
                    className="waves-effect waves-light btn-small black darken-4"
                    style={{marginTop: 20}}
                    onClick={() => {
                        changePlace(visited, "delete")
                    }}>Мне не интересно это место
                </button>

                <h5>Краткая характеристика</h5>
                <p>{place.description}</p>
                <h5>Что посмотреть</h5>
                <p>{place.details}</p>
                <h5>Метро рядом</h5>
                <p>{place.location.metro}</p>
                <h5>Посмотреть на карте</h5>
                <p>
                    <a
                        style={{color: "darkred"}}
                        target="_blank"
                        rel="noreferrer"
                        href={place.location.yandex}
                    >Открыть
                    </a>
                </p>
            </div>
        </div>
    )
}