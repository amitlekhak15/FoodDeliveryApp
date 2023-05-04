import React, { useRef, useState,useEffect } from 'react'
import { useDispatchCart,useCart } from './ContextReducer'


export const Card = (props) => {
  const priceref=useRef()
  let dispatch=useDispatchCart()
  let data=useCart()
    let options=props.options
    let priceOptions=Object.keys(options)
    let foodItem=props.fooditem
    const [size,setsize] = useState("")
    const[qunt,setqunt]=useState(1)
    let finalPrice=qunt*parseInt(options[size])
    useEffect(() => {
    setsize(priceref.current.value)
    }, [])
    
    
    const handleAddcart=async()=>{
      let food=[]
      for (const item of data){
        if(item.id===foodItem._id){
          food=item;
          break
        }
      }
      if(food!==[]){
        if(food.size===size){
          await dispatch({type:"Update",id:foodItem._id,price:finalPrice,qty:qunt})
        }
      
        else if(food.size!==size){
          await dispatch({type:"Add",id:foodItem._id,name:foodItem.name,price:finalPrice,qty:qunt,size:size,img:foodItem.img})
          return

      }
      return
    }
    await dispatch({type:"Add",id:foodItem._id,name:foodItem.name,price:finalPrice,qty:qunt,size:size,img:foodItem.img})
 
      

    }
    console.log(data) 
  
  return (
    
    <div className="card mt-3" style={{"width": "18rem","maxheight":"360px"}}>
    
    <img src={foodItem.img} className="card-img-top" alt="..." style={{height:"120px",objectFit:"fill"}}/>
    <div className="card-body">
      <h5 className="card-title">{foodItem.name}</h5>
      
      <div className='container w-100'>
          <select className='m-2 h-100 bg-success rounded' onChange={(e)=>setqunt(e.target.value)}>
              {Array.from(Array(6),(e,i)=>{
                  return(
                      <option key={i+1} value={i+1}>{i+1}</option>
                  )
  
              })}
          </select>
          <select className='m-2 h-100  bg-success rounded' ref={priceref} onChange={(e)=>setsize(e.target.value)}>
              {priceOptions.map((data)=>{
                return(<option key={data}value ={data}>{data}</option> )
              })}
          </select>
          <div className='d-inline h-100'>₹{finalPrice}/-</div>
  
      </div>
      </div>
      <hr>
      </hr>
      <button className={`btn btn-success justify-center ms-2` } onClick={handleAddcart}>Add to Cart</button>
  </div>
  )
}
