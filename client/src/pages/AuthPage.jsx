import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {useMessage} from "../hooks/message_hook";
import {useHttp} from "../hooks/http.hook";
import "materialize-css"

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {request, error, clearError} = useHttp()
    const [form,setForm] = useState({
        email: "",
        password: ""
    })
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])
    useEffect(()=>{
        window.M.updateTextFields()
    },[])
    const changeHandler = event =>{
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
        <div>
            <h1>Добро пожаловать в "Московский гуль!"</h1>
            <input
                placeholder="Введите email"
                type="text"
                name="email"
                value = {form.email}
                onChange={changeHandler}
            />
            <input
                placeholder="Введите пароль"
                type="text"
                name="password"
                value={form.password}
                onChange={changeHandler}
            />
            <a
                href='#'
                className="waves-effect waves-light btn"
                style={{marginRight: 10}}
                onClick={loginHandler}
            >Войти
            </a>
            <a
                href='#'
                className="waves-effect waves-light btn"
                onClick={registerHandler}
            >Регистрация
            </a>
        </div>
    )
}