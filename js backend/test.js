require("dotenv").config();
const mysql=require("mysql2")
const express=require("express")
const connection=mysql.createConnection({
    host:process.env.host,
    user:process.env.user,
    database:process.env.database,
    password:process.env.password
});

connection.connect((error)=>{
    if (error) throw error
    console.log("Database connected")
})

const app=express()
app.use(express.json())

app.get("/data",(req,res)=>{
    connection.query("select * from college",(error,result)=>{
        if (error){
            return res.status(404).json({message : "Faild to get the data"})
        }
        res.status(200).json(result)
    })
})

app.post("")
app.listen(5000,()=>{
    console.log("server is running")
})