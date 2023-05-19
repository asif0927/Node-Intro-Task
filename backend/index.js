const express = require('express');
const crypto = require('crypto');
const app = express()
const PORT=5050;
const bodyParser = require('body-parser');
app.use(bodyParser.json())
const cors = require('cors');
app.use(cors());


const fakeData=[
    {
        id:1,
        brandName:"Mercedes",
        modelname:"Ceska",
        year:1990,
        color:"gray",
        isNew:false
    },
    {
        id:2,
        brandName:"Porsche",
        modelname:"Kayen",
        year:2010,
        color:"blue",
        isNew:true
    }
]

app.get('/api',(req, res) => {
    res.send('Hello Car Api')
})

//get
app.get('/api/cars',(req,res)=>{
   res.send(fakeData)
})
//getbyid
app.get('/api/cars/:id',(req,res)=>{
    const id=req.params.id;
    const product=fakeData.find((x)=>x.id==id);
    if(product==undefined){
        res.status(204).send("data not content")
    }
    else{
        res.status(200).send(product)
    }
})
//post
app.post('/api/cars',(req,res)=>{
    const {brandName,modelname,year,color,isNew}=req.body;
   const newcar=({
    id:crypto.randomUUID(),
    brandName:brandName,
    modelname:modelname,
    year:year,
    color:color,
    isNew:isNew
   })
   fakeData.push(newcar)
   res.status(201).send({
    message: "car created successfully!",
    data: newcar,
  });
    
})
//delete
app.delete('/api/cars/:id',(req,res)=>{
    const id=req.params.id
    const deletecars=fakeData.find((x) => x.id == id);
    let idx = fakeData.indexOf(deletecars);
    fakeData.splice(idx, 1);
    if (deletecars === undefined) {
        res.status(204).send("car not found!");
    } 
    else {
        res.status(203).send({
          message: "car deleted successfully!",
        });
    }
})
//put
app.put('/api/cars/:id',(req,res)=>{
    const id=req.params.id;
    const {brandName,modelname,year,color,isNew}=req.body;
    let editingcars = fakeData.find((x) => x.id == id);
    if (brandName) {
      editingcars.brandName = brandName;
    }
    if (modelname) {
      editingcars.modelname = modelname;
    }
    if (color) {
        editingcars.color = color;
    }
    if(isNew){
        editingcars.isNew=isNew;
    }
    if(year){
        editingcars.year=year;
    }
    res.status(200).send({
      message: "product updated successfully!",
    });
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})