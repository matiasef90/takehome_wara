import { useNavigate } from "react-router-dom";
import { config } from "../../config";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export function useCreateUpdateRemove({
    id,
    name,
    status,
    owner,
    type
}) {
    const {logOut} = useContext(AuthContext)
    const navigate = useNavigate()
    function create(e) {
        e.preventDefault();
        fetch(`${config.API_URL}/assets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ name, status, type, owner })
        })
        .then(res => {
            if(res.status === 401) {
                logOut()
                localStorage.removeItem('token')
                navigate('/login')
                return
            }
            return res.json()
        })
        .then(data => {
            const {id} = data
            navigate(`/edit/${id}`)
        })
    }

    function update(e) {
        e.preventDefault();
        fetch(`${config.API_URL}/assets/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ name, status, type, owner })
        })
        .then(res => {
            if(res.status === 401) {
                logOut()
                localStorage.removeItem('token')
                navigate('/login')
                return
            }
            return res.json()
        })
    }

    function remove(e) {
        e.preventDefault();
        fetch(`${config.API_URL}/assets/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            if(res.status === 401) {
                logOut()
                localStorage.removeItem('token')
                navigate('/login')
                return
            }
            navigate('/')
        })
    }

    return { create, update, remove }
}