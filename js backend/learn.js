require("dotenv").config()
const mysql=require("mysql2")
const express=require("express")
const cors=require("cors")
const connection=mysql.createConnection({
    host:process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database
})
connection.connect((error)=>{
    if (error){
        return error
    }
    console.log('Database is connected')
})

const app=express()
app.use(express.json())
app.use(cors())

app.get("/tables",(req,res)=>{
    connection.query("show tables",(error,result)=>{
        if (error){
            return res.status(400).json("something error")
        }
        res.status(200).json(result)
    })
})
app.listen(5000,()=>{
    console.log('Server is running')
})