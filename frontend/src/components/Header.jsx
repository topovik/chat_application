import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <nav>
            <button><Link to="/adminpanel">LogIn</Link></button>
            <Link to="/"></Link>
        </nav>
    )
}

export default Header