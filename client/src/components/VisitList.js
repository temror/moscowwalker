import {Link} from "react-router-dom";

export const VisitList = ({places,visited}) => {

    if (!places.length) {
        return <p className="center">Вы пока ничего не посетили</p>
    }
    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>Место</th>
                    <th>Открыть</th>
                </tr>
                </thead>
                <tbody>
                {places.map((place, index) => {
                    if(place.visited === visited){
                    return (
                        <tr key={place._id}>
                            <td>{place.name}</td>
                            <td>
                                <Link to={`/places/${place._id}`}>Открыть</Link>
                            </td>
                        </tr>
                    )}
                })}
                </tbody>
            </table>
        </>
    )
}