import axios from "axios";
import React, { useEffect, useState } from "react";
import Menu from "../../components/circular navigation/circular";
import './home.css'
const Home=()=>{
// const[user,setuser]=useState([]);

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

    return(
        <>
        
      <div className="menuloc">
<Menu/>
</div> 
        <div>
            {/* <h1>Hello home page</h1> */}
        </div>
        </>
    )
}
export default Home