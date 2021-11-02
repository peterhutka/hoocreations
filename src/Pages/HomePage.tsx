import React from 'react'
import NavBar from '../Components/NavBar'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'

export default function HomePage() {
    return (
        <div className={styles.homeWrapper}>
            <h2>Work In Progress....</h2>
            <h2>My First Game:</h2>
            <Link to="/powerlines"> POWERLINES </Link>
            <h2>My Resume Website:</h2>
            <Link to="/portfolio"> RESUME </Link>
        </div>
    )
}
