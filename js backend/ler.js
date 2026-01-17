const mysql=require("mysql2")
const express=require("express")

const connetion=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"naveen@123",
    database:"college"
})

connetion.connect((error)=>{
    if (error) return error
    console.log("database connected")
})

const app=express()
app.use(express.json())

app.get("/data",(req.res)=>{
    
})

app.post("/data/add",(req,res)=>{
    const {roll,name,marks}=req.body
    if(!roll||!name||!marks){
        return res.status(404).json("fill data correct")
    }
    connetion.query("insert into data values(?,?,?)",[roll,name,marks],(error,result)=>{
        if (error){
            return res.status(500).json("faild to insert")
        }
        res.status(200).json("sucess")
    })
})

app.listen(5000,()=>{
    console.log("server is running")
})