import React,{useEffect,useState} from 'react'
import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
import { Card } from '../components/Card'
//import Carousel from '../components/Carousel'
export const Home = () => {
  const[search,setsearch]=useState("")
  const[foodcat,setfoodcat]=useState([])
  const[fooditems,setfooditems]=useState([])
  const loadData=async()=>{
    let response=await fetch("http://localhost:8000/api/fooddata",{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      }
    })
    response=await response.json()
    setfooditems(response[0])
    setfoodcat(response[1])
    console.log(response)
  }

useEffect(()=>{
  loadData()

},[])

  return (
    <div>
        <div><Navbar/></div>
        {/*crousel*/}
        <div> <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
  <div className="carousel-inner"id='carousel'>
  <div className="carousel-caption " style={{zIndex:"10"}}>
       <div className='d-flex justify-center'>
        <input className='form-control me-2' type="Search" placeholder='Search' value={search} onChange={(e)=>{setsearch(e.target.value)}}/>
            {/*<button className="btn btn-outline-success" type="submit">Search</button>*/}
        

       </div>
      </div>
    <div className="carousel-item active">
      <img src="https://source.unsplash.com/random/900×700/?burger" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/900×700/?barbeque" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/900×700/?sandwich" className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div> </div>
{/*crouselend*/}
        <div className='container'>
          {
            foodcat!==[]
            ?foodcat.map((data )=>{
              return( <div className='row mb-3'>
              <div key={data._id} className="fs-3 m-3">{data.CategoryName}</div>
              <hr/>
              {
                fooditems!==[]? fooditems.filter((item)=>item.CategoryName===data.CategoryName && item.name.toLowerCase().includes(search.toLocaleLowerCase()))
                .map(filterItems=>{
                  return(
                    <div key={filterItems._id} className="col 12 col-md-6 col-lg-3">
                      <Card fooditem={filterItems}
                      options={filterItems.options[0]}
                      
                      
                      />

                      </div>
                  )
                })

                :<div>"No Item Found"</div>
              }
              </div>)
            }):""
          }

          
        </div>
        <div><Footer/></div>
    </div>
    
  )
}
