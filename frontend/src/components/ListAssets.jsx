import React, { useContext, useEffect, useState } from 'react';
import AssetCard from './AssetCard';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { config } from '../config';

const mockAssets = [
  { id: 1, nombre: "Servidor Principal AWS", status: "Activo", owner: "Equipo Infra", tipo: "Hardware" },
  { id: 2, nombre: "Licencia Adobe CS", status: "Pendiente", owner: "Diseño Gráfico", tipo: "Software" },
  { id: 3, nombre: "Laptop Dell XPS 15", status: "En Mantenimiento", owner: "Juan Pérez", tipo: "Hardware" },
  { id: 4, nombre: "Base de Datos Prod", status: "Activo", owner: "DevOps", tipo: "Servicio" },
  { id: 5, nombre: "Software de Facturación", status: "Inactivo", owner: "Contabilidad", tipo: "Software" },
];

export default function AssetsList() {

  const [assets, _] = useState(mockAssets || []);
  const { isLogin } = useContext(AuthContext)
  const natigate = useNavigate()

  useEffect(() => {
    
    if (!isLogin) natigate('/login')
  }, [isLogin])
  useEffect(() => {
    fetch(`${config.API_URL}/assets`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
  }, [])

  return (
    <>
      {isLogin ? <section>
        <h1>Inventario de Activos 📊</h1>
        {assets.map(asset => (
          <AssetCard key={asset.id} asset={asset} />
        ))}
      </section> : null}
    </>
  );
};
