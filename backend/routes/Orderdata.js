const express=require('express')
const router=express.Router()
const order = require('../models/Order.js')
//const dbConn="mongodb://127.0.0.1/"
router.post("/orderdata",async(req,res)=>{
    let data=req.body.order_data
    await data.splice(0,0,{order_date:req.body.order_date})
    console.log(data)
    let eid=await order.findOne({'email':req.body.email})
    console.log(eid)
    if(eid==null){
        try{
            await order.create({
                email:req.body.email,
                order_data:[data]
            }).then(()=>{
                res.json({success:true})
            })
        }catch(err){
            console.log(err.message)
            res.status(400).send("Server Error",err.message)
        }
    
        
    }
else{
    try{
        await order.findOneAndUpdate({email:req.body.email},
           {$push:{order_data:data}} ).then(()=>{
            res.json({success:true})
           })
    }catch(err){
        console.log(err.message)
      
        res.status(400).send("Server Error",err.message)
    }
}



        
})   
router.post("/myorder",async(req,res)=>{
    try{
        let mydata=await order.findOne({"email":req.body.email})
        res.json({orderData:mydata})

    }catch(err){
        res.status(400).send("Server Error",err.message)
    }
    

})

    

module.exports=router