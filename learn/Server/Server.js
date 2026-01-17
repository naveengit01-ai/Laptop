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
    if(error) throw error;
    console.log("Database connected")
});

const app=express();
app.use(express.json());
app.use(cors())

//GET
app.get("/data",(req,res)=>{
    connection.query("select * from credentails",(error,result)=>{
        if(error){
            return res.status(500).json("faild to fetch the data")
        }
        res.status(200).json(result)
    });
});
// POST
app.post("/adduser",(req,res)=>{
    const{email,user,password}=req.body;
    if(!email||!user||!password){
        return res.status(500).json("fill the data corectly")
    }
    connection.query("insert into credentails values(?,?,?)",[email,user,password],(error,result)=>{
        if(error){
            return res.status(404).json("something went wrong")
        }
        if(result.affectedRows===0){
            return res.status(404).json("duplicate entry")
        }
        res.status(200).json("sucessfully data inserted")
    })
})

// PUT

app.put("/update/:mail",(req,res)=>{
    const{password}=req.body
    const{mail}=req.params
    if(!password||!mail){
        return res.status(500).json({Message : "Fill the data correctly"})
    }
    connection.query("update credentails set password = ? where mail=?",[password,mail],(error,result)=>{
        if(error){
            return res.status(400).json({Message : "Faild to update the data"})
        }
        if(result.affectedRows===0){
            return res.status(404).json({Message : "Data not found"})
        }
        res.status(200).json({message : "Sucessfully updated"})
    })
})

app.listen(5000,()=>{
    console.log("Server is running")
})