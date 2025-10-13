import React, { useContext, useEffect, useState } from 'react';
import AssetCard from './AssetCard';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { config } from '../config';

export default function AssetsList() {

  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const { isLogin, logOut } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLogin) navigate('/login')
  }, [isLogin])
  useEffect(() => {
    fetch(`${config.API_URL}/assets`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        if(res.status === 401) {
          localStorage.removeItem('token')
          logOut()
          navigate('/login')
          return
        }
        return res.json()
      })
      .then(data => {
        const {assets, total} = data
        setItems(assets)
        setTotal(total)
      })
  }, [])

  return (
    <div style={{
      padding: '1rem',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      {isLogin ? <section>
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
        <h1>Inventario de Activos</h1>
        <button 
        style={{
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          cursor: 'pointer',
          borderRadius: '5px',
          border: 'none',
          backgroundColor: '#007bff',
          color: '#fff'
        }}
        onClick={() => navigate("/edit")}>Crear Nuevo</button>
        </header>
        <div style={{
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
        {
          total === 0 ? <p>No hay activos registrados</p> : <p>Total de activos: {total}</p>
        }
        </div>
        <section style={{
          display: 'grid',
          width: '100%',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
        {total && items.map(item => (
          <AssetCard key={item.id} {...item} />
        ))}
        </section>
      </section> : null}
    </div>
  );
};
