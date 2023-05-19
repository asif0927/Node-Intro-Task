import React, { useEffect, useState } from 'react';
import { Card } from 'antd';

const Cars = () => {
    const [cars,setCars]=useState([]);
    const [newcar,setNewCar]=useState({brandName:"",modelname:"",color:"",isNew:false,year:""})
    useEffect(()=>{
       fetch(`http://localhost:5050/api/cars`)
       .then(res=>res.json())
       .then(data=>{
         setCars(data)
       })
    },[cars])
    function handleSubmit(e){
        e.preventDefault();
        fetch('http://localhost:5050/api/cars',{
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body:JSON.stringify(newcar)
        })
        setCars([...cars,newcar]);
        setNewCar({ brandName: '', modelname: '', color: '', year: '', isNew: false });
      }
      function handleChange(e) {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
      
        setNewCar({ ...newcar, [name]: newValue });
      }
    return (
    <>
    <div>
  <h2 style={{ textAlign: "center" }}>Cars</h2>
    <form onSubmit={(e)=>handleSubmit(e)} style={{display:"flex",flexDirection:"column",width:"30%",margin:"0 auto",padding:"10px"}}>
        <input onChange={(e)=>handleChange(e)} name="brandName" placeholder="car brandname" type="text"/>
        <input onChange={(e)=>handleChange(e)} name="modelname" placeholder="car modelname" type="text"/>
        <input onChange={(e)=>handleChange(e)} name="year" placeholder="car year" type="number" />
        <input onChange={(e)=>handleChange(e)} name="color" placeholder="car color" type="text" />
        <label>
        <input onChange={(e) => handleChange(e)} name="isNew" type="checkbox" />
           Is New
        </label>
        <button>Add Car</button>
   </form>
  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
    {cars &&
      cars.map((car) => (
        <Card key={car.id} title="Car Info" bordered={false} style={{ margin: "10px", padding: "20px",width:"30%" }}>
          <p>Car Name:{car.brandName}</p>
          <p>
            Cars Model and style:{car.modelname}&nbsp;&nbsp;&nbsp;{car.color}
          </p>
          <p>Car Year: {car.year}</p>
          <button onClick={()=>{
                if (window.confirm('are you sure?')) {
                    fetch(`http://localhost:5050/api/cars/${car.id}`,{
                      method:'DELETE'
                    })
                    setCars(cars.filter((item)=>item.id!==car.id))
                }
              }}>Delete</button>
        </Card>
      ))}
  </div>
</div>
    </>
   )
}

export default Cars
