
const MongoClient = require('mongodb').MongoClient;
const mongoose =require('mongoose');

const url = 'mongodb://127.0.0.1:27017/foodmania';


const db=async()=>{
  const   client = await mongoose.connect(url).then(console.log("database connected")).catch((err)=>console.log(err));
  //const db = client.db();
  const db = mongoose.connection;
  const collection = db.collection('food_items');
  //console.log(collection)
  global.items = await collection.find({}).toArray();
  const collection2 = db.collection('foodCategory');
  //console.log(collection)
  global.foodcat = await collection2.find({}).toArray();
  //console.log(global.items)
  

           //     console.log(err)

  
  
  
 
}

module.exports=db