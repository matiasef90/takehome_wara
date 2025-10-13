import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
export default function EditAssets() {
    const [formData, setFormData] = useState({
        nombre: '',
        status: 'Pendiente',
        owner: '',
        tipo: 'Bug',
    });

    const { isLogin } = useContext(AuthContext)
    const natigate = useNavigate()
    if (!isLogin) {
        natigate('/login')
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    let navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos del formulario enviados:', formData);
    };

    return (<>
        <h3>Editar Assetss</h3>
        <form onSubmit={handleSubmit}>

            <div>
                <label>
                    Nombre:
                </label>
                <input
                    type="text"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>
                    Status:
                </label>
                <select
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En Progreso">En Progreso</option>
                    <option value="Completado">Completado</option>
                    <option value="Bloqueado">Bloqueado</option>
                </select>
            </div>

            <div>
                <label>
                    Owner:
                </label>
                <input
                    type="text"
                    value={formData.owner}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>
                    Tipo:
                </label>
                <select
                    value={formData.tipo}
                    onChange={handleChange}
                >
                    <option value="Bug">Bug</option>
                    <option value="Feature">Feature</option>
                    <option value="Mejora">Mejora</option>
                    <option value="Documentacion">Documentación</option>
                </select>
            </div>
            <button type="submit">Crear Tarea</button>
            <button onClick={() => navigate("/")}>
                Volver
            </button>
        </form>
    </>);
};