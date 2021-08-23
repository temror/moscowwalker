import {useHistory} from "react-router-dom"
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {Preloader} from "../components/Preloader";

export const PlaceInfo = () => {
    const auth = useContext(AuthContext)
    const place = auth.selectedPlace
    const {request, loading} = useHttp()
    const history = useHistory()

    const visit = async visit => {
        try {
            const data = await request(`../api/places/visit`, 'POST', {
                    placeId: auth.selectedPlace._id,
                    userId: auth.userId,
                    visit
                },
                {
                    Authorization: `Bearer ${auth.token}`
                }
            )
            history.push('/')
            console.log(data)
        } catch (e) {
        }
    }
    if (loading) {
        return <Preloader/>
    }
    return (
        <div>
            <h1>{place.name}</h1>
            <h5>Краткая характеристика</h5>
            <p>{place.description}</p>
            <h5>Метро рядом</h5>
            <p>{place.location.metro}</p>
            <h5>Посмотреть на карте</h5>
            <p>
                <a href={place.location.yandex}>Открыть</a>
            </p>
            <button onClick={() => {
                visit(true)
            }}>Был
            </button>
            <button onClick={() => {
                visit(false)
            }}>Не был
            </button>
        </div>
    )
}