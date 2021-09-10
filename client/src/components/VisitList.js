import {useHistory} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useContext} from "react";


export const VisitList = ({places, visited}) => {
    const {request} = useHttp()
    const auth = useContext(AuthContext)
    const history = useHistory()
    if (!places.length) {
        return <p className="col center-align s6 offset-s3">Вы пока ничего не посетили</p>
    }
    const openLink = async id => {
        try {
            const data = await request(`api/places/selected/${id}`, 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            })
            auth.selectedPlace = data
            history.push(`/places/${data._id}`)
        } catch (e) {

        }
    }
    return (
        <>
            <table className="striped">
                <thead>
                <tr>
                    <th>Место</th>
                    <th>Открыть</th>
                </tr>
                </thead>
                <tbody>
                {places.map(place => {if (place.visited === visited) {
                        return (
                            <tr key={place._id}>
                                <td>{place.name}</td>
                                <td>
                                    <button
                                        style={{border: 0, backgroundColor: "inherit", color: "darkred"}}
                                        onClick={() => {
                                            openLink(place._id)
                                        }}
                                    >Открыть
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                    return true
                })}
                </tbody>
            </table>
        </>
    )
}