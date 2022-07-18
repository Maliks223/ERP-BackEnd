import axios from "axios";
import React, { useEffect, useState } from "react";
import Menu from "../../components/circular navigation/circular";
import './home.css'
const Home = () => {

    const admin = localStorage.getItem('admin');
    const json = JSON.parse(admin);
    console.log('json',json);
    const [user, setuser] = useState(json);

    // const getUser=async() =>{
    // const res=await axios.get("http://localhost:8000/api/user")
    // .catch((err)=>console.log(err));

    // const data=res.data;
    // console.log(data);
    // return data;
    // }
    // useEffect(()=>{
    //     getUser().then((data)=>setuser(data));
    // })

    return (
        <>
            <h1>{user.name}</h1>
            <div className="menuloc">
                <Menu />
            </div>
            <div>
                {/* <h1>Hello home page</h1> */}
            </div>
        </>
    )
}
export default Home