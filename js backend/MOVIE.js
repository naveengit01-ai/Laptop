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
    console.log("Database connected sucessfully")
});

const app=express();
app.use(express.json());
app.use(cors());


// Geting the tables in the database 

app.get("/Tables",(req,res)=>{
    connection.query("show tables",(error,result)=>{
        if(error){
            return res.status(404).json("faild to get the tables")
        }
        res.status(200).json(result)
    });
});

//POST email,username,password ->It means create the new user

app.post("/add/user",(req,res)=>{
    const{email,user,password}=req.body;
    if(!email||!user||!password){
        return res.status(400).json("fill the data correctly")
    }
    connection.query("insert into credentials values(?,?,?)",[email,user,password],(error,result)=>{
        if(error){
            return res.status(500).json("Faild to Create the user")
        }
        res.status(200).json("sucessfully user added")
    });
});

// Get the username and password and email based on username

app.get("/info/:username",(req,res)=>{
    const{username}=req.params;
    connection.query("select username,password from credentials where username = ?",[username],(error,result)=>{
        if(error){
            return res.status(404).json("faild to get the data")
        }
        res.status(200).json(result)
    });
});

app.get("/cred/data",(req,res)=>{
    connection.query("select * from credentials",(error,result)=>{
        if(error){
            return res.status(400).json("faild to get the credentials")
        }
        res.status(200).json(result)
    })
})

//sample

app.get("/data",(req,res)=>{
    connection.query("select * from new_movies  ",(error,result)=>{
        if(error){
            return res.status(404).json("faild in this")
        }
        res.status(200).json(result)
    })
})


//POST comment and email

app.post("/add/comment",(req,res)=>{
    const {email,comment}=req.body;
    if(!email||!comment){
        res.status(404).json("Fill the data correctly")
    }
    connection.query("insert into feedback values(?,?)",[email,comment],(error,result)=>{
        if(error){
            return res.status(400).json("error to insert ")
        }
        res.status(200).json("sucessfully inserted")
    })
})


// get the movie name based

app.get("/movie/:name",(req,res)=>{
    const{name}=req.params;
    connection.query("select image from new_movies where name=?",[name],(error,result)=>{
        if(error){
            return res.status(404).json("Faild to get the data")
        }
        res.status(200).json(result)
    })
})

app.listen(5000,()=>{
    console.log("Server is running")
})