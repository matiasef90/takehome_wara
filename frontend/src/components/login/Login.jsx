import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from './utils.js';
const API_URL = import.meta.env.VITE_API_URL

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [msgRegister, setMsgRegister] = useState('')
  const [msgLogin, setMsgLogin] = useState('')
  const [disabled, setDisabled] = useState(true)
  const {isLogin, logIn} = useContext(AuthContext)
  const natigate = useNavigate()

  useEffect(() => {
    if (isLogin) {
      natigate('/')
    }
  }, [isLogin])

  useEffect(() => {
    setDisabled(true)
    if (validateEmail(email) && password.length >= 6) {
      setDisabled(false)
    }
  }, [email, password])

  const handleRegister = (e) => {
    e.preventDefault()
  
    fetch(`${API_URL}/auth/register`, {
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
    fetch(`${API_URL}/auth/login`, {
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
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      maxWidth: '400px',
      margin: '0 auto',
      padding: '16px',
      border: '1px solid #ccc',
      borderRadius: '8px'
    }}>
      <h2>Iniciar Sesión</h2>

      <label>
        Email:
      </label>
      <input
        style={{
          padding: '10px 20px',
          borderRadius: '4px',
          fontSize: '16px'
        }}  
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
        style={{
          padding: '10px 20px',
          borderRadius: '4px',
          fontSize: '16px'
        }}
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mínimo 6 caracteres"
      />
      <button 
        disabled={disabled} 
        style={{
          backgroundColor: disabled ? '#ccc' : '#008CBA',
          color: disabled ? '#666' : 'white',
          cursor: disabled ? 'not-allowed' : 'pointer',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '4px',
          fontSize: '16px',
          marginBottom: '12px'
        }}
        onClick={handleRegister}>Registrarse</button>
      <button 
      style={{
        backgroundColor: disabled ? '#ccc' : '#4CAF50',
        color: disabled ? '#666' : 'white',
        cursor: disabled ? 'not-allowed' : 'pointer',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        fontSize: '16px'
      }}
      disabled={disabled}
      type="submit">Ingresar</button>
      {msgRegister && <p style={{ color: error ? 'red' : 'green' }}>{msgRegister}</p>}
      {msgLogin && <p style={{ color: 'red'}}>{msgLogin}</p>}
    </form>
  </>);
};
