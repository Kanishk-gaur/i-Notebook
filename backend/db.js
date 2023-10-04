const mongoose=require('mongoose');
const mongoURI="mongodb://127.0.0.1:27017/persons"
const connectToMongo=()=>{
  mongoose.connect(mongoURI,()=>{
    console.log("connected to mongo succesfully");
  })
}
module.exports=connectToMongo;