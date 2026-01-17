require("dotenv").config();
const mysql=require("mysql2");
const express=require("express");
const cors=require("cors");
const connection=mysql.createConnection({
    host:process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database
});

connection.connect((error)=>{
    if(error) throw error
    console.log('Database connected')
})

const app=express()
app.use(express.json())
app.use(cors())
app.get("/info",(req,res)=>{
    connection.query("Select * from learn",(error,result)=>{
        if(error){
            return res.status(500).json("Faild to get the data")
        }
        res.status(200).json(result)
    })
})

app.post("/adduser",(req,res)=>{
    const{id,name}=req.body
    if(!id||!name){
        return res.status(500).json("Fill the data correctly")
    }
    connection.query("insert into learn values(?,?)",[id,name],(error,result)=>{
        if(error){
            return res.status(400).json("Faild to insert the data")
        }
        if(result.affectedRows===0){
            return res.status(404).json("Duplicate entry")
        }
        res.status(200).json("Sucessfully inserted")
    })
})
app.listen(5000,()=>{
    console.log("server is running")
})