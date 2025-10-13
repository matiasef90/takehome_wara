import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { config } from '../../config';
import { useAssets } from './useAssets';
import { useCreateUpdateRemove } from './useCreateUpdateRemove';

export default function EditAssets() {
    const [name, setName] = useState('')
    const [status, setStatus] = useState(config.status[0].value)
    const [type, setType] = useState(config.types[0].value)
    const [owner, setOwner] = useState('')
    const { isLogin } = useContext(AuthContext)
    
    const { id } = useAssets({
        setName,
        setStatus,
        setType,
        setOwner
    })
    
    const natigate = useNavigate()
    useEffect(() => {
        if (!isLogin) natigate('/login')
    }, [isLogin])
    
    let navigate = useNavigate()

    const {
        create,
        update,
        remove
    } = useCreateUpdateRemove({name, status, type, owner, id})
    
    return (<>
        <section
        style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '0 auto',
            maxWidth:'432px'
        }}
        >
            <h3>Editar Activo</h3>
            <button 
            style={{
                padding: '0.5rem 1rem',
                fontSize: '1rem',
                cursor: 'pointer',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: '#0275d8',
                color: 'white'
            }}
            onClick={() => navigate("/")}>
                Volver
            </button>
        </section>
        <form onSubmit={create}
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                maxWidth: '400px',
                margin: '0 auto',
                padding: '16px',
                border: '1px solid #ccc',
                borderRadius: '8px'  
            }}
        >
                <label>
                    Nombre:
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                        padding: '10px 20px',
                    }}
                />

                <label>
                    Status:
                </label>
                <select
                    style={{
                        padding: '10px 20px',
                    }}
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    {
                        config.status
                            .map(({ key, value }) => (<option key={key} value={value}>{key}</option>))
                    }

                </select>
                <label>
                    Owner:
                </label>
                <input
                    type="text"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                    style={{
                        padding: '10px 20px',
                    }}
                    
                />

                <label>
                    Tipo:
                </label>
                <select
                    style={{
                        padding: '10px 20px',
                    }}
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    {
                        config.types
                            .map(({ key, value }) => (<option key={key} value={value}>{key}</option>))
                    }

                </select>
            {
                id ? <button 
                style={{
                    backgroundColor: '#f0ad4e',
                    border: 'none',
                    padding: '10px 15px',
                    color: 'white',
                    cursor: 'pointer',
                    borderRadius: '4px'
                }}
                onClick={update} disabled={!name || !owner}>Editar Tarea</button>
                : <button 
                style={{
                    backgroundColor: '#5cb85c',
                    border: 'none',
                    padding: '10px 15px',
                    color: 'white',
                    cursor: 'pointer',
                    borderRadius: '4px'
                }}
                
                type="submit" disabled={!name || !owner}>Crear Tarea</button>
            }
            {id ? <button 
            style={{
                backgroundColor: '#d9534f',
                border: 'none',
                padding: '10px 15px',
                color: 'white',
                cursor: 'pointer',
                borderRadius: '4px'
            }}
            onClick={remove}>Eliminar</button> : null}
        </form>
    </>);
};