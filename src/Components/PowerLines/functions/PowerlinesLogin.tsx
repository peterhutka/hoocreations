import React, { useContext, useState} from 'react'
import styles from '../styles.module.css'

import axios, { AxiosResponse } from 'axios'
import { useHistory } from 'react-router'
import { myContext } from '../../Context'






const Login = (props: any) => {
    const [username, setUserName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    let history = useHistory()
    const {updateUser} = useContext(myContext)

    const style = props.style || ""

    const login = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, {
            username,
            password
        }, {
            withCredentials: true
        }).then((res : AxiosResponse) => {
            console.log("login response" , res.data)
            if (res.data === "success"){
                updateUser({
                    from: "/login",
                    to: "/powerlines"
                }, history) 
            } 
        }, ()=>{
           console.error("login failed") 
        })
    }

    function handleClose(e: React.MouseEvent<HTMLDivElement, MouseEvent>){
        e.preventDefault()
        history.push("/powerlines")
    }


    

    return (
        <> 
            <div className={styles.backBlur}></div>   
            <div className={styles.powerlinesLogin}>
                <h1>Login</h1>
                <div className={styles.closeBtn} onClick={(e)=> handleClose(e)}>X</div>
                <input tabIndex={100} type="text" placeholder="username" onChange={e => setUserName(e.target.value)} />
                <input tabIndex={101}type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
                <div tabIndex={102}className={styles.loginBtn} onClick={e => login(e)}>Login</div>  
            </div>
        </>
    )
}

export default Login
