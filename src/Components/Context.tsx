import React, { PropsWithChildren, useEffect, useState } from 'react'
import { createContext } from 'react'
import axios, { AxiosResponse } from 'axios'
import { UserInterface, ContextUserInterface } from '../Interfaces/Interfaces'

export const myContext = createContext<Partial<ContextUserInterface>>({})

export default function Context(props: PropsWithChildren<any>) {
    const [user, setUser] = useState<UserInterface>()

    const updateUser = (
        locationObject?: {
            from?: string,
            to?: string | undefined
        }, 
        history?: any
    ) => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/user`, {withCredentials: true})
        .then((res: AxiosResponse) => {   
            setUser(res.data)  
            if(locationObject?.to && history){
                history.push(locationObject.to)
            }           
        })
    }

    useEffect(()=>{       
        updateUser()
    }, [])

    return (
        <myContext.Provider value={{user, updateUser}}> 
            {props.children}        
        </myContext.Provider>
    )
}
