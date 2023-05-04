import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const Signup = () => {
    const [credent, setcredent] = useState({name:"",email:"",password:"",geolocation:""})
    const handlesubmit=async(e)=>{
        e.preventDefault();
        const response= await fetch("http://localhost:8000/api/createuser",{
            method:'POST',
            headers:{
                "Content-Type":'application/json'
            },
            body:JSON.stringify({name:credent.name,email:credent.email,password:credent.password,location:credent.geolocation})
        })
        const json=await response.json()
        console.log(json)
        if(!json.success){
          alert("Enter valid credentials")
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
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control"  name='name' value={credent.name} onChange={onChange}/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credent.email} onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credent.password} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
    <input type="text" className="form-control" id="address" name='geolocation' value={credent.geolocation} onChange={onChange}/>
  </div>
  
  <button type="submit" className="btn btn-success">Submit</button>
  <Link to="/Login" className='m-3 btn btn-danger'>AlreadyUser</Link>
</form>
</div>
    </>
  )
}
