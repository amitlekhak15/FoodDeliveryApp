
const express=require('express')
const router=express.Router()

//const dbConn="mongodb://127.0.0.1/"
router.post("/fooddata",async(req,res)=>{
    try{
        res.send([global.items,global.foodcat])

        }catch(err){
            res.send(err)
        }
        })




        
        
    

module.exports=router