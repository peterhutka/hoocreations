import React, {useState} from 'react'
import axios, { AxiosResponse } from 'axios'
import styles from './styles.module.css'
import { useHistory } from 'react-router'

export default function PowerlinesRegister() {
    const [username, setUserName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    let history = useHistory()


    const register = () => {
        axios.post("http://localhost:8080/register", {
            username,
            password
        }, {
            withCredentials: true
        }).then((res: AxiosResponse) => {
            if (res.data === "success") window.location.href = "/login"
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
                <div className={styles.closeBtn} onClick={(e)=> handleClose(e)}>X</div>
                <h1>Register</h1>
                <input tabIndex={100} type="text" placeholder="username" onChange={e => setUserName(e.target.value)} />
                <input tabIndex={101} type="text" placeholder="password" onChange={e => setPassword(e.target.value)} />
                <div tabIndex={102}className={styles.loginBtn} onClick={register}>Register</div>                      
            </div>
        </>
    )
}
