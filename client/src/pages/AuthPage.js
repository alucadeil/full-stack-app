import React, {useState, useEffect, useContext}  from 'react'
import {useHTTP} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, error, request, clearError} = useHTTP()
  const [form, setForm] = useState({
    email: '', password: ''
  })
  
  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])
  
  useEffect(() => {
    window.M.updateTextFields()
  },[])
  
  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value })
  }
  
  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      message(data.message)

    } catch (e) {}
  }
  
  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      message(data.message)
      auth.login(data.token, data.userId)
    } catch (e) {}
  }
  
  
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Сократи ссылку</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Введите email"
                  id="email"
                  type="text"
                  name="email"
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label htmlFor="email">First Name</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Введите пароль"
                  id="password"
                  type="password"
                  name="password"
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label htmlFor="password">First Name</label>
              </div>
            </div>
          </div>
          <div className="card-action ">
            <button
              className="btn s3 yellow darken-4"
              onClick={loginHandler}
              disabled={loading}
            >
              Войти
            </button>
            <button
              className="btn s3 yellow grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
