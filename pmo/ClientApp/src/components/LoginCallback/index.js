import React,{useState,useEffect} from 'react'
import { Redirect } from 'react-router-dom';
import api from '../../utils/api';
import axios from 'axios'

const LoginCallBack = (props) => {

    // const [user,setUser] = useState(null)

    const getUser = async() => {
        // const user_id = window.atob(props.match.params.id)
        const data = await api.users.getId()
        console.log('data',data);
        // setUser(data)
        const axiosConfig = {
            withCredentials: true,
            // headers: {
            //     'content-Type': 'application/json',
            //     "Accept": "/",
            //     "Cache-Control": "no-cache",
            //     "Cookie": document.cookie
            // },
            //     credentials: "same-origin"
            };
        axios.get('https://pmo-be.banpuindo.co.id/api/users/getid',
        axiosConfig)
        .then((res) => {
            // Some result here
            console.log('res',res)
        })
        .catch((err) => {
            console.error(':(',err);
        });
            
            
    }

    useEffect(()=>{
        getUser()
    },[])

    
    return(
        <>
        {/* {user && <Redirect to="/"/>} */}
        </>
    )
}

export default LoginCallBack
