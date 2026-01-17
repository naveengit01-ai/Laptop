require("dotenv").config();

const mysql=require("mysql2")
const express=require("express")
const cors=require("cors");
const connection=mysql.createConnection({
    host:process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database
});

connection.connect((error)=>{
    if(error) throw error;
    console.log("Database connected")
});

const app=express();
app.use(express.json())
app.use(cors())
app.get("/data",(req,res)=>{
    connection.query("select * from credentials",(error,result)=>{
        if(error){
            return res.status(500).json("error in this ")
        }
        res.status(200).json(result)
    })
})

app.get("/get/:user",(req,res)=>{
    const {user}=req.params;
    connection.query("select user,password from credentials where user= ?",[user],(error,result)=>{
        if(error){
            return res.status(500).json("something went wrong")
        }
        res.status(200).json(result)
    });
});

app.post("/data/addt",(req,res)=>{
    const{email,user,password}=req.body;
    if(!email||!user||!password){
        return res.status(400).json("fill the data correctly")
    }
    connection.query("insert into credentials values (?,?,?)",[email,user,password],(error,result)=>{
        if(error){
            return res.status(500).json("faild to insert the data")
        }
        res.status(200).json("sucessfully inserted the data")
    })
})
app.listen(5000,()=>{
    console.log("server is running")
});