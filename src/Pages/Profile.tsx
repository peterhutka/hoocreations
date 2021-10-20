import React from 'react'
import { useContext } from 'react'
import { myContext } from '../Components/Context'

export default function Profile() {
   const {user} = useContext(myContext)
    return (
        <div>
            <h2>Profile</h2>
            <h3>Hello, {user?.username} !</h3>
        </div>
    )
}
