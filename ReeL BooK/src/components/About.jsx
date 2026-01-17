import { useState } from "react";
import "../CSS/About.css"
const About=()=>{
  const [formdata,setformdata]=useState({
    email:"",
    comment:""
  })

  const handlechange=(e)=>{
    setformdata(prev=>({
      ...prev,
      [e.target.name]:e.target.value
    }))
  }

  const handlesubmit=async(e)=>{
    e.preventDefault();

    try{
      const res=await fetch("http://localhost:5000/add/comment",{
        method:"POST",
        headers:{
          "content-Type":"application/json"
        },
        body:JSON.stringify(formdata)
      })
      const data=await res.json()
      alert("sucessfully sent")
      setformdata({email:"",comment:""})
    }
    catch(error){
      alert("something went wrong")
    }
  }
  return(
    <div className="aboutdiv">
      <form onSubmit={handlesubmit}>
        <input 
        type="email"
        value={formdata.email}
        name="email"
        placeholder="Enter the email"
        onChange={handlechange}
        className="aboutinput"
        required
        />
        <textarea
         rows="6" cols="50"
        name="comment"
        value={formdata.comment}
        placeholder="Give Feedback Hear"
        onChange={handlechange}
        className="aboutinput1"
        required
        />
        <button type="submit" className="but">SEND</button>
      </form>
    </div>
  )
}

export default About;