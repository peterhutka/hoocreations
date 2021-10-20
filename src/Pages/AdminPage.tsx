import axios, { AxiosResponse } from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useEffect, useState } from 'react'
import { myContext } from '../Components/Context'
import NavBar from '../Components/NavBar'
import { UserInterface } from '../Interfaces/Interfaces'


export default function AdminPage() {
    const {user} = useContext(myContext)
    const [data, setData] = useState<UserInterface[]>([])
    const [selectedUser, setSelecetedUser] = useState<string>()

    useEffect(()=>{
        axios.get("http://localhost:8080/getallusers", {
            withCredentials: true
        }).then((res: AxiosResponse )=> {
            setData(res.data.filter((item: UserInterface)=>{
                return item.username !== user?.username
            }))
        })
        
    }, [user])

    function deleteUser(){
        let userId: string;
        data.forEach((item: UserInterface) => {
                if (item.username === selectedUser) {
                    userId = item.id
                }
            })
        if(userId!){
            axios.post("http://localhost:8080/deleteuser", {
                id: userId!
                }, {
                withCredentials: true
            })
        }
        
    }

    return (
        <div>
            <NavBar/>
            <h2>Admin</h2>
            <select onChange={e => setSelecetedUser(e.target.value)} name="deleteuser" id="deleteuser">
                <option>Select a user</option>
                {
                    data.map((item: UserInterface) => {
                        
                        return <option key={item.username} id={item.username}> {item.username} </option>
                    })
                }
            </select>
            <button onClick={deleteUser}>Delete user</button>
        </div>
    )
}
