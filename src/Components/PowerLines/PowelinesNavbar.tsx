import axios, { AxiosResponse } from 'axios';
import React, { useContext, useState } from 'react'
import { useRouteMatch, Link, useHistory } from 'react-router-dom'
import { myContext } from '../Context';
import LogoutWindow from './LogoutWindow';
import styles from './styles.module.css'


export default function PowelinesNavbar() {
    let match = useRouteMatch();
    

    //todo logout btn

    
    const {user, updateUser} = useContext(myContext)
    const [menuOn, setMenuOn] = useState(false)

    

    function toggleMenu(e: React.MouseEvent<HTMLSpanElement, MouseEvent> | React.MouseEvent<HTMLAnchorElement, MouseEvent>){
        e.preventDefault()
        setMenuOn((prev)=> !prev)
    }

    function closeMenu(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>){
        
        setMenuOn(false)
    }

    
    return (
    <>
        {menuOn && <div className={styles.backBlur}></div> }
        <div className={`${styles.powerlinesNavbar}`}>
            <p className={styles.noselect}>POWERLINES</p>
            <Link to="/">by Hoo</Link>
            <a onClick={toggleMenu}>Menu</a>
            {!menuOn || (
                <div className={styles.navbarWrapper}>
                    <span onClick={toggleMenu}>X</span>
                    <Link to={`${match.path}/leaderboard`} onClick={closeMenu}> Leaderboard </Link>
                    <Link to={`${match.path}/register`} onClick={closeMenu}> Register </Link>
                    {(!user) ? <Link to={`${match.path}/login`} onClick={closeMenu}>Login</Link> : <LogoutWindow />}
                </div>
            ) }
            
            
            
        </div>
    </>
    )
}
