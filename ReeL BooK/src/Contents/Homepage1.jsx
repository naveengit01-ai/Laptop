// In this page when the user enter the phots and the name and date of movie in backend hear it will updated
import { useState,useEffect } from "react";
import "../CSS/Homepage1.css"
const Display_images=()=>{
    const [data,setdata]=useState([])
    const [loading,setloading]=useState(true)
    const [error,seterror]=useState(null)
    useEffect(()=>{
        fetch("http://localhost:5000/data")
        .then((response)=>{
            if(!response.ok){
                throw new Error("Faild to display the images")
            }
            return response.json()
        })
        .then((data)=>{
            setdata(data)
            setloading(false)
        })
        .catch((err)=>{
            seterror(err.message)
            setloading(false)
        })
    },[])
    if(loading) return <p>Loading...</p>
    if(error) return <p>Error {error}</p>

    return(       
        <div className="heading2">
            <h1 className="main">TOP TRENDING MOVIES</h1><br></br>
        <div className="con">
                {data.slice(0).reverse().map((item,index)=>(
            <table>
                    <tr key={index}>
                        <th>
                            <img src={`/images/movies/${item.image}`}
                            alt="movie image"
                            className="image"
                            />
                            {/* <video src={`/images/${item.image}`} controls className="image"></video> */}
                        </th>
                    </tr>
                <tbody>
                    <h1 className="Title">{item.Name.toUpperCase()}</h1>
                    {/* <b><p className="date">{item.date}</p></b> */}
                </tbody>
            </table>
                ))}
        </div>
        </div>
    )
}
export default Display_images;



// export default Homepage1;
