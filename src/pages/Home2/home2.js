// import React from "react";
// import { Link } from "react-router-dom";
// import "./home.css";
// import { useState,useEffect } from "react";
// import axios from "axios";
// import { AccessTime , DateRange } from "@mui/icons-material";
// // const current = new Date();
// // const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
// // const today = new Date(),
// // date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

// // var todays = new Date(),
// // time = todays.getHours() + ':' + todays.getMinutes() + ':' + todays.getSeconds();



 

// const Home = () => {
// const [users,setusers]=useState([]);
//     const [dateState, setDateState] = useState(new Date());
//     useEffect(() => {
//            setInterval(() => setDateState(new Date()),);
//     }, []);

// const Request=async()=>{

// const res=await axios.get("http://localhost:8000/api/users")
// .catch((err)=>console.log(err));
// const data=res.data;
// console.log(data);
// return data;
// }
// useEffect(()=>{
//     Request().then((data)=>setusers(data))
// },[])


//     return (
//         <div className="HomeContainer">
//             <img className="erpimg" src={require("./logo-removebg-preview.png")}/>
// <h1 className="ad">Admins</h1>
// <h1 className="mu">Music</h1>
// <h1 className="li">Quick Links</h1>
// <h1 className="da">Dashboard</h1>
// <h1 className="er">ERP</h1>

//             <div className="innerdiv">
//             <div class="angry-grid">
//   <div id="item-0">
//   <div className="dateContainer">

//             <h1>
//             <AccessTime style={{fontSize:'35px'}}/>
//             {' '}
//                {dateState.toLocaleString('en-US', {
//                     hour: 'numeric',
//                     minute: 'numeric',
//                     second:'numeric',
//                     hour12: true,
//                 })}
//             </h1>
//             <h1 style={{fontSize:'25px'}}>
//                 <DateRange style={{fontSize:'15px'}}/>
//                 {' '}
//                 {dateState.toLocaleDateString('en-GB', {
//                     day: 'numeric',
//                     month: 'short',
//                     year: 'numeric',
//                 })}
//             </h1>

//     </div>
            
//   </div>
//   <div id="item-1">

//     <div className="collection">
//   <div className="first">
//    <div className="imgbox">

//    <Link to="/employees">
// <img className="imgg" src={require('./employee.png')}/></Link>
//     <h3>employee</h3>
//     </div>
//    <div className="imgbox">


//    <Link to="/teams"> <img className="imgg" src={require('./teams.jpeg')}/></Link>
//     <h3>teams</h3>
//     </div>
//     </div>

// <div className="second">
//    <div className="imgbox">
   
//    <Link to="/roles"><img className="imgg" src={require('./roles.logo.png')}/></Link>
//     <h3>roles</h3>
//     </div>
//    <div className="imgbox">
  

//    <Link to="/kpi"> <img className="imgg" src={require('./kpi.jpeg')}/></Link>
//     <h3>kpi</h3>
//     </div>
//  <div className="imgbox">

//  <Link to="/projects"> <img className="imgg" src={require('./project.png')}/></Link>
//     <h3>Project</h3>
    
//     </div>
// </div>
  
// </div>
 
//   </div>
//   <div id="item-2">
//     <div className="musiccontainer">
//         <img className="musiclogo" src={require("./music.jpeg")}/>
//         <audio controls={true} className="audio"></audio>
//         </div>
//         </div>
//   <div id="item-3">
//     <div className="links">
//     <a href="https://www.google.com">Google</a>
//     <a href="https://www.linkedin.com">LinkedIn</a>
//     <a href="https://www.facebook.com">Facebook</a>
//     <a href="https://www.instagram.com">Instagram</a>
//     <a href="https://www.twitter.com">Twitter</a>
//     </div>
//    </div>
//   <div id="item-4">
//     <ol className="oll">
//     {users.map((user,index)=>{
//         return(
//         <div key={index}>
// <h3 className="users">{user.name}</h3>
//         </div>
//         )
//     })}
//     </ol>
//   </div>
// </div>
//         </div>
//         </div>

//     );
// };
// export default Home;
