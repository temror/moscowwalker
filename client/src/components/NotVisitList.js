import {Link} from "react-router-dom";

export const NotVisitList = ({places}) => {

    if (!places.length) {
        return <p className="center">Вы пока ничего не посетили</p>
    }
    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Место</th>
                    <th>Открыть</th>
                </tr>
                </thead>
                <tbody>
                {places.map((place, index) => {
                    if(place.visited === false){
                        return (
                            <tr key={place._id}>
                                <td>{index + 1}</td>
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