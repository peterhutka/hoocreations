import React from 'react'
import NavBar from '../Components/NavBar'
import { Link } from 'react-router-dom'

export default function HomePage() {
    return (
        <div>
            <NavBar />
            <div><h2>Games:</h2> </div>
            <Link to="/powerlines"> PowerLines </Link>
        </div>
    )
}
