import  { useEffect } from 'react'
import { Logout } from '../utils/Logout'

const ClearcachePage = () => {

    useEffect(() => {
        Logout()
    }, [])

    return (
        <div></div>
    )
}

export default ClearcachePage