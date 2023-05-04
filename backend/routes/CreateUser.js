const express=require('express')
const router=express.Router()
const User = require('../models/User.js')
const { body, validationResult } = require('express-validator');
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const secretKey="fmeognnffnkenfiknignnkenfnnefnkfenffnn"
router.post("/createuser",
body('email').isEmail(),
  body('password').isLength({ min: 5 })
,async(req,res)=>{
    //const{name,location,email,password}=req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt =await  bcrypt.genSalt(10)
    let secPassword=await bcrypt.hash(req.body.password,salt)
    try{
        const result=await User.create({
            name:req.body.name,
            location:req.body.location,
            email:req.body.email,
            password:secPassword,

        

        })
        console.log(result)
        res.json({success:true})
    }catch(error){

     console.log(error)
     res.json({success:false})
    }
    
    

})
router.post("/login",body('email').isEmail(),
body('password','Incorrect Password').isLength({ min: 5 }),
async(req,res)=>{
    //const{name,location,email,password}=req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email=req.body.email
    try{
        const result=await User.findOne({email})
    if(!result){
      return res.status(400).json({ errors: "User doesnot Exist" });
    }
    const pwdcompare=await bcrypt.compare(req.body.password,result.password)
    if(!pwdcompare){
      return res.status(400).json({ errors: "Wrong Passward" }); 

    }
    const data={
      user:{
        id:result._id
      }
    }
    const authtoken=jwt.sign(data,secretKey)
    return res.json({ success:true,authtoken:authtoken });

    }catch(error){

     console.log(error)
     res.json({success:false})
    }
    
    

})
module.exports=router