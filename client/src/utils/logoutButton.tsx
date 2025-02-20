import React from 'react'
import { useHistory } from 'react-router-dom';

export default function LogoutButton() {
    const history = useHistory();
    const handleLogout = () => {
        localStorage.removeItem('token');
        history.push('/')
    }
    return (
        <a onClick={handleLogout}>
            <h2 className='m-4 font-monospace font-extrabold text-white hover:text-green hover:cursor-pointer hover:border-b-2'>logout</h2>
        </a>
    )
}


