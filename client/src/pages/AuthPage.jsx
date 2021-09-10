import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {useMessage} from "../hooks/message_hook";
import {useHttp} from "../hooks/http.hook";
import "materialize-css"

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])
    useEffect(() => {
        window.M.updateTextFields()
    }, [])
    const changeHandler = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }
    const registerHandler = async () => {
        try {
            const data = await request('api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {
        }
    }
    return (
        <div className="container">
            <div className="row"
                 style={{paddingTop: 100}}
            >
                <h5 className="center">Добро пожаловать в "Московский гуль!"</h5>
                <div
                    className="col s10 offset-s1"
                     style={{paddingTop: 30}}>
                    <input
                        placeholder="Введите email"
                        className="input-field"
                        type="text"
                        name="email"
                        value={form.email}
                        onChange={changeHandler}
                    />
                    <input
                        placeholder="Введите пароль"
                        type="text"
                        name="password"
                        value={form.password}
                        onChange={changeHandler}
                    />
                    <div/>
                    <div
                        className="col s12 "
                        style={{paddingTop: 30}}
                    >
                        <button
                            className="waves-effect waves-light btn-small black darken-4 col s6 offset-s3"
                            onClick={loginHandler}
                        >Войти
                        </button>
                        <button
                            className="waves-effect waves-light btn-small white black-text col s8 offset-s2"
                            onClick={registerHandler}
                            style={{marginTop: 20}}
                        >Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
            )
            }