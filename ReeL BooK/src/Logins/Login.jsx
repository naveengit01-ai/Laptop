import { useState,useEffect } from "react";
import {useNavigate } from "react-router-dom";
import "../CSS/Login.css"

const Login=()=>{
    const [loading,setloading]=useState(false)
    const[error,seterror]=useState(null)
    const [username,setusername]=useState("")
    const[password,setpassword]=useState("")
    const navigate=useNavigate()

    const handelcheck=async(e)=>{
        e.preventDefault();
        setloading(true)
        seterror(null)
        try{
            const res=await fetch(`http://localhost:5000/info/${username}`)
            if(!res.ok){
                if(res.status===404){
                    alert("user not found ")
                }
                else{
                    alert("something went wrong ")
                }
                setloading(false)
                return;
            }
            const data =await res.json()
            if(data.length > 0 && data[0].username === username && data[0].password === password){
                alert("sucessfully login")
                // THis 2 lines added
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("username", username);

                navigate("/sechome")
            }
            else{
                alert("invalid username or password")
                seterror("error")
                return;
            }
        }
        catch(error){
            alert("something went wrong")
        }
    };
    return(
        <div className="div">
            <form onSubmit={handelcheck} className="form">
                <input 
                type="text"
                name="username"
                placeholder="Enter the username"
                value={username}
                onChange={(e)=>setusername(e.target.value)}
                required
                className="input"
                />
                <br></br>
                <input
                type="password"
                name="password"
                value={password}
                placeholder="Enter the password"
                onChange={(e)=>setpassword(e.target.value)}
                className="input"
                />
                <br></br>
                <button type="submit" className="login-but">Login</button>
                {/* {loading?"checking":""} */}
                {/* <br></br> */}
                <button onClick={()=>{navigate("/sign")}} className="sign-but">Sign up</button>
            </form>
        </div>
    )
}

export default Login;