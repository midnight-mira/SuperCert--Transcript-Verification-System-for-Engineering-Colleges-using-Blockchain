import React from 'react'
import Cookies from 'js-cookie'
import {useEffect, } from 'react'
import { useNavigate } from 'react-router-dom'

const Protected = ({Component}) => {
    const navigate = useNavigate()

    useEffect(()=>{
        const token = Cookies.get('token')
        if(!token){
            navigate("/login")
        }
    })
    return (
        <div>
            <Component />
        </div>
    )
}

export default Protected
