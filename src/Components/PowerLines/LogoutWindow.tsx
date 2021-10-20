import axios, { AxiosResponse } from 'axios';
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router';
import { myContext } from '../Context';
import styles from './styles.module.css'

export default function LogoutWindow() {


    const [logoutModalOpen, setLogoutModalOpen] = useState(false);


    function handleLogoutToggle(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>){
        e.preventDefault()
        setLogoutModalOpen((prev)=> !prev)
    }

    //Logout
    const history = useHistory();
    const {user, updateUser} = useContext(myContext)

    const logout = () => {
        axios.get("http://localhost:8080/logout", {
            withCredentials: true
        }).then((res: AxiosResponse) => {
            if(res.data === "logged out") {
                updateUser()
                history.push("/powerlines")
            }
        })
    }

    return (
        <>
            <a onClick={handleLogoutToggle}>
                Logout
                
            </a>
            {logoutModalOpen ? <LogoutModal toggle={handleLogoutToggle} logout={logout}/> : null}
        </>
    )
}

interface Props {
    toggle: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
    logout: () => void
}

const LogoutModal: React.FC<Props> = ({toggle, logout}) =>{
    return (
        <div className={styles.backBlur}>
            <div className={styles.logoutModal}>
                <h3>Are you sure, you wanna logout during game?</h3>
                <div className={styles.logoutFlex}>
                    <a className={styles.logoutModalBtn} onClick={logout} >YES</a>
                    <a className={styles.logoutModalBtn} onClick={toggle} >NO</a>
                </div>
            </div>
            
            
        </div>
    )
}

//