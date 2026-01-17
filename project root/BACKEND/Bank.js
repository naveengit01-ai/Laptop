require("dotenv").config();
const mysql=require("mysql2")
const express=require("express")
const cors=require("cors")
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});
connection.connect((error) => {
    if (error) {
        console.error("Database connection failed:", error.message);
        return;
    }
    console.log("Database connected");
});
const app=express()
app.use(express.json())
app.use(cors())
// This is use to the get the full data present in the table
app.get("/data",(req,res)=>{
    connection.query("select * from Account",(error,result)=>{
        if (error){
            return res.status(404).json("Faild to get the data")
        }
        res.status(200).json(result)
    })
})
// This Api will used to the create the new Account
app.post("/add/data",(req,res)=>{
    const {name,location,account_type,balance}=req.body
    if (!name||!location||!account_type||!balance){
        return res.status(500).json("fill the data correct")
    }
    connection.query("insert into Account(Name,Location,Account_Type,Balance) values(?,?,?,?)",[name,location,account_type,balance],(error,result)=>{
        if (error){
            return res.status(404).json("faild to insert data")
        }
        res.status(200).json("Sucessfully inserted")
    })
})
// This Api will used to the get the account details based on the Account number
app.get("/data/:number",(req,res)=>{
    const number=req.params.number;
    connection.query("select * from Account where Account_number=?",[number],(error,result)=>{
        if (error){
            return res.status(500).json("Faild to get the details")
        }
        if (result.length===0){
            return res.status(404).json("User not found")
        }
        return res.status(200).json(result)
    })
})
//  Delete the Account based on the Account number 
app.delete("/delete/:number",(req,res)=>{
    const number=req.params.number
    connection.query("delete from Account where Account_number=?",[number],(error,result)=>{
        if (error){
            return res.status(500).json("Faild to delete the account")
        }
        if(result.affectedRows===0){
            return res.status(404).json("No account is found")
        }
        res.status(200).json("Sucessfully deleted the account")
    })
})
// This api will work how actual bank will work
app.put("/withdraw/:number",(req,res)=>{
    const balance=req.body.balance
    const number=req.params.number
    if (!balance){
        return res.status(500).json("Fill the data correct ")
    }
    connection.query("select * from Account where Account_number=?",[number],(error,result)=>{
        if (result[0].Balance<balance){
            res.status(400).json("Insuffent balance")
        }
        else{
            connection.query("update Account set Balance=Balance-? where Account_number=?",[balance,number],(error,result)=>{
            if (error){
            return res.status(400).json("Faild to withdraw the money",)
                    }
            if (result.affectedRows===0){
            return res.status(404).json("No account found")
                    }
            res.status(200).json("money withdraw sucessfully")
                })
        }
    })
})
//  This api is used for the update the balance by deposit
app.put("/deposit/:number",(req,res)=>{
    const {balance}=req.body
    const number=req.params.number
    if(!balance){
        return res.status(500).json("Please enter the amount to deposit")
    }
    connection.query("update Account set Balance=Balance+? where Account_number=?",[balance,number],(error,result)=>{
        if (error){
            return res.status(400).json("Faild to deposit the money ")
        }
        if (result.affectedRows===0){
            return res.status(404).json("Account not exist")
        }
        res.status(200).json("Sucessfully deposited")
    })
})
// This api is used to transfer money one bank to another bank
app.put("/transfer/:ua/:sa",(req,res)=>{
    const ua=req.params.ua
    const sa=req.params.sa
    const money=req.body.money
    connection.query("select * from Account where Account_number=?",[ua],(error,result)=>{
        const balance=result[0].Balance
        if(money<0){
            res.send("Please enter the money correct")
        }
        else if(money<=balance){
            connection.query("update Account set balance=balance-? where Account_number=?",[money,ua],(eror,result)=>{
                if (eror){
                    return res.status(404).json("error")
                }
            })
            connection.query("update Account set balance=balance+? where Account_number=?",[money,sa],(error,result)=>{
                if (error){
                    return res.status(400).json("Erorr to transfer money")
                }
                res.status(200).json("Sucessfully transfer money")
            })
        }
        else{
            return res.status(403).json("Insuffent money",result[0].Balance)
        }
    })
})
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
