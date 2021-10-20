import axios, { AxiosResponse } from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { myContext } from '../Context'
import styles from "./styles.module.css"

export default function LeaderBoard() {
    console.log("LEADERBOARD")

    const [users, setUsers] = useState([])
    const {user, updateUser} = useContext(myContext)
    const history = useHistory()

    useEffect(()=>{
        
        axios.get("http://localhost:8080/leaderboard", {withCredentials: true})
        .then((res: AxiosResponse) => {   
            console.log(res.data)
            let temp = res.data
            temp.sort( compare );
            setUsers(temp)
        })
    }, [])

    function compare( a: any, b: any ) {
        if ( a.elo > b.elo ){
            return -1;
        }
        if ( a.elo < b.elo ){
            return 1;
        }
        return 0;
    }

    const mystyle1 = {
      backgroundColor: "rgba(100,100,100,1)",
    };

    const mystyle2 = {
    };
    
    function handleClose(e: React.MouseEvent<HTMLAnchorElement, MouseEvent> ){
        e.preventDefault()
        history.push("/powerlines")
    }

    return (
        <>  
            <div className={styles.backBlur}></div>
            <div className={`  ${styles.leaderboard} `}>
                <a onClick={handleClose} className={styles.closeBtn}>X</a>
                <h1>Leaderboard</h1>
                
                <div className={styles.leaderboardWrapper}>
                    
                </div>
                {users.map((lbUser: any, index)=>{
                    const isLoggedUser = (user?.username === lbUser.username)
                    return (
                        <p key={index} style={isLoggedUser ? mystyle1 : mystyle2} > 
                            {index + 1}. - {lbUser.username} - {lbUser.elo}
                        </p>)
                })}

                



                
                
            </div>
        </>
    )
}
