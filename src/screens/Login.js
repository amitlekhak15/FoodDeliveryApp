import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
export const Login = () => {
  const [credent, setcredent] = useState({email:"",password:""})
  let navigate=useNavigate()
    const handlesubmit=async(e)=>{
        e.preventDefault();
        const response= await fetch("http://localhost:8000/api/login",{
            method:'POST',
            headers:{
                "Content-Type":'application/json'
            },
            body:JSON.stringify({email:credent.email,password:credent.password})
        })
        const json=await response.json()
        console.log(json)
        if(!json.success){
          alert("Enter valid credentials")
        }
        if(json.success){
          localStorage.setItem("userEmail",credent.email)
          localStorage.setItem("authtoken",json.authtoken)
          console.log(localStorage.getItem("authtoken"))
          navigate("/")
        }
    }
    const onChange=(e)=>{
     setcredent({...credent,[e.target.name]:e.target.value})
    }
  return (
    <>
    <div className='container'> 
    <form onSubmit={handlesubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credent.email} onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credent.password} onChange={onChange}/>
  </div>
  
  
  <button type="submit" className="btn btn-success">Submit</button>
  <Link to="/Signup" className='m-3 btn btn-danger'>NewUser </Link>
</form>
</div>
    </>
  )
}
