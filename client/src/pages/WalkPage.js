import {useCallback, useContext, useEffect} from "react";
import {useHistory} from "react-router-dom"
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Preloader} from "../components/Preloader";

export const WalkPage = () => {
    const auth = useContext(AuthContext)
    const history = useHistory()
    const {request, loading} = useHttp()
    const walkHandler = async () => {
        try {
            const data = await request('api/places', 'POST', {id: auth.userId}, {
                Authorization: `Bearer ${auth.token}`
            })
            auth.selectedPlace = data.place
            if (data.fpLength === 0) {
                auth.placesLength = true
            }
            history.push(`/places/${data.place._id}`)
        } catch (e) {
        }
    }
    const userLength = useCallback(async () => {
        try {
            const data = await request('api/places', 'POST', {id: auth.userId}, {
                Authorization: `Bearer ${auth.token}`
            })
            if (data.fpLength === 0) {
                auth.placesLength = true
            }
        } catch (e) {
        }
    }, [auth,request])
    useEffect(() => {
            userLength()
        }
        , [auth,userLength])
    useEffect(() => {
            userLength()
        }
        , [userLength])
    if (loading) {
        return <Preloader/>
    }
    if (auth.placesLength) {
        return<><div className="row hide-on-med-and-up">
            <h4
                style={{paddingTop: "50%"}}
                className="col center-align s6 offset-s3">
                Места кончились
            </h4>
            <i
                style={{marginTop: 20}}
                className="
            large
            material-icons
                col s4 m2 offset-s4 offset-m5">sentiment_very_dissatisfied</i>
        </div>
        <div className="row hide-on-small-only">
<div className="col l6 offset-l2" style={{marginTop: "10%"}}>
    <i className="medium material-icons">sentiment_very_dissatisfied</i>
    <h4>Места закончились</h4>
    <p>Вы посетили все места из нашего списка.
        Но не переживайте - он обновляется практически каждый день.
       В ближайшее время мы загрузим обновления, и вам снова будет куда прогуляться!</p>
    <p>А пока мы бы вам посоветовали:</p>
        <ul style={{listStyleType:"disc"}}>
            <li>- Пройтись по списку еще не посещенных мест</li>
            <li>- Открыть список посещенных мест и понять, какой вы молодец</li>
            <li>- Заварить чаек, открыть упаковку печенек и просто включить любимый сериал</li>
        </ul>
    <h6>Ваш "Московский гуль".</h6>

</div>
        </div>
        </>
    }
    return (
        <>
            <div
            style={{height: 200}}
            className="hide-on-large-only"
            > </div>
            <div className="row"
                style={{paddingTop: "10%"}}>
                <i
                    style={{marginBottom: 0}}
                    className="
                    hide-on-med-only
            large
            material-icons
                col s4 m2 offset-s4 offset-m5">directions_walk</i>
                <div className="
                hide-on-small-only
                hide-on-large-only
                col s4 m7 l4 offset-s4 offset-m3 offset-l4
                "
                style={{marginLeft:"30%"}}>
                    <i
                        style={{marginBottom: 0}}
                        className="
                        large
                        material-icons"
                    >directions_walk</i>
                    <i
                        style={{marginBottom: 0}}
                        className="
                        large
                        material-icons"
                    >arrow_forward</i>
                    <i
                        style={{marginBottom: 0}}
                        className="
                        large
                        material-icons"
                    >location_on</i>
                </div>
                <h4
                    style={{lineHeight: 1.3, wordSpacing: 2, marginBottom: -5}}
                    className="
                    hide-on-med-and-up
                col
                s10
                offset-s1
                center-align"
                >Московский гуль</h4><h2
                style={{lineHeight: 1.3, wordSpacing: 2, marginTop: 50}}
                className="
                hide-on-small-only
                col
                s10
                offset-s1
                center-align"
            >Московский гуль</h2>
                <h5
                    style={{
                        lineHeight: 1.3,
                        wordSpacing: 2,
                        color: "darkred"
                    }}
                    className="
                    hide-on-small-only
                col
                s6
                offset-s3
                center-align"
                >Где мне сегодня погулять?</h5>
                <h6
                    style={{
                        lineHeight: 1.3,
                        wordSpacing: 2,
                        color: "darkred",
                        marginBottom: "10%"
                    }}
                    className="
                    hide-on-med-and-up
                col
                s6
                offset-s3
                center-align"
                >Где мне сегодня погулять?</h6>
                <button
                    style={{marginTop: "10%"}}
                    className="
                btn-large
                black darken-4
                col s6 m4 offset-s3 offset-m4"

                    onClick={walkHandler}
                >
                    Сделать гуль
                </button>
            </div>
        </>
    )
}