require("dotenv").config()
const bcrypt=require("bcrypt")
const mysql=require("mysql2")
const express=require("express")
const cors=require("cors")
const connection=mysql.createConnection({
    host:process.env.host,
    user:process.env.user,
    database:process.env.database,
    password:process.env.password
});
connection.connect((error)=>{
    if (error) throw error ;
    console.log("Database connnected")
})
const app=express()
app.use(express.json())
app.use(cors())
app.get("/data",(req,res)=>{
    connection.query("select * from test",(error,result)=>{
        if (error){
            res.status(500).json("Faild to get the data")
        }
        res.status(201).json(result)
    })
})
app.post("/add/data",async(req,res)=>{
    const {user,password}=req.body
    if (!user||!password){
        return res.status(400).json("fill the data correctly")
    }
    try{
        const harshpassword= await bcrypt.hash(password,10);
        connection.query("insert into test(user,password) values(?,?)",[user,harshpassword],(error,result)=>{
            if (error){
                return res.status(500).json("faild to inserted ")
            }
            return res.status(200).json("Sucessfully inserted")
        })
    }
    catch(error){
        res.status(500).json("something went wrong")
    }
})
app.post("/check",(req,res)=>{
    const {user,password}=req.body
    if(!user||!password){
        return res.status(400).json("please enter correct")
    }
    connection.query("select password from test where user=?",[user],async(error,result)=>{
        if (error){
            return res.status(500).json("Faild")
        }
        if (result.length===0){
            return res.status(404).json("invalid user")
        }
        const harshpassword=result[0].password

        const match=await bcrypt.compare(password,harshpassword)
        if (match){
            return res.status(200).json("valid")
        }
        else{
            return res.status(200).json("invalid")
        }
    })
})
app.listen(5000,()=>{
    console.log("Server is running")
})