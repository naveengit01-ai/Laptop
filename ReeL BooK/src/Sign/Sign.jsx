import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Sign.css"
const AddUser=()=>{
    const navigate=useNavigate();
    const[formdata,setformdata]=useState({
        email:"",
        user:"",
        password:""
    });
    const handlechange=(e)=>{
        setformdata(prev=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }
    const handlesubmit=async(e)=>{
        e.preventDefault();

        const res=await fetch("http://localhost:5000/add/user",{
            method:"POST",
            headers:{
                "content-Type":"application/json"
            },
            body:JSON.stringify(formdata)
        })
        if(!res.ok){
            if(res.status===409){
                alert("User already exist")
                alert("go to login ")
            }
            else if(res.status===500){
                alert("something went wrong")
            }
            else{
                throw new Error("check it once")
            }
            return;
        }
        const data=await res.json()
        alert('sucessfully created account')
        alert("go to login ")
        setformdata({email:"",user:"",password:""})
    }

    return(
        <div className="div">
            <form onSubmit={handlesubmit}>
                <input 
                type="email"
                placeholder="Enter the email"
                value={formdata.email}
                name="email"
                onChange={handlechange}
                required  
                className="input"              
                />
                <input 
                type="text"
                placeholder="Enter the username"
                value={formdata.username}
                name="user"
                onChange={handlechange}
                required
                className="input"
                />
                <input 
                type="password"
                placeholder="Enter the password"
                value={formdata.password}
                name="password"
                onChange={handlechange}
                required
                className="input"
                />
                <button type="submit" className="login-but">Create</button>
                <button onClick={()=>navigate("/login")} className="login-but">Login</button>
            </form>
        </div>
    )
}


export default AddUser;