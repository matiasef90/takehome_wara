import { useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { config } from "../../config"
import { AuthContext } from "../../context/AuthContext"

export function useAssets({
    setName,
    setStatus,
    setType,
    setOwner
}) {
    const navigate = useNavigate()
    const {id} = useParams()
    const {logOut} = useContext(AuthContext)

    useEffect(() => {
        if (!id) return
        fetch(`${config.API_URL}/assets/${id}`, {
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
        .then(({
            name,
            status,
            type,
            owner
        }) => {
            setName(name)
            setStatus(status)
            setType(type)
            setOwner(owner)
        })
    }, [id])
    
    return { id }
}