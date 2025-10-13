import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from './utils.js';
import { config } from '../../config';

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [msgRegister, setMsgRegister] = useState('')
  const [msgLogin, setMsgLogin] = useState('')
  const [disabled, setDisabled] = useState(true)
  const {isLogin, logIn} = useContext(AuthContext)
  console.log(isLogin)
  const natigate = useNavigate()
  if (isLogin) {
    natigate('/')
  }
  useEffect(() => {
    setDisabled(true)
    if (validateEmail(email) && password.length >= 6) {
      setDisabled(false)
    }
  }, [email, password])

  const handleRegister = (e) => {
    e.preventDefault()
  
    fetch(`${config.API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => response.json())
      .then(data => {
        const {
          status,
          message
        } = data
        status === 'error' ? setError(true) : setError(false)
        setMsgRegister(message)
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${config.API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        .then(res => res.json())
        .then(data => {
            const {
              status,
              token,
              message
            } = data
            if (status === 'error') {
              setMsgLogin(message)
              return
            }
            localStorage.setItem('token', token)
            logIn()
            natigate('/')
        })
  };

  return (<>
    <form onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>

      <label>
        Email:
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@correo.com"
      />

      <label>
        Contraseña:
      </label>
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mínimo 6 caracteres"
      />
      <button disabled={disabled} onClick={handleRegister}>Registrarse</button>
      <button disabled={disabled} type="submit">Ingresar</button>
    </form>
    {msgRegister && <p style={{ color: error ? 'red' : 'green' }}>{msgRegister}</p>}
    {msgLogin && <p style={{ color: 'red'}}>{msgLogin}</p>}
  </>);
};
