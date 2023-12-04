
import app from "./app";
import mongoose from 'mongoose'
import config from "./config";


function main() {
  try{
  mongoose.connect(config.url_local);

  app.listen(3000,(()=>{
    console.log('Server Is Running')
}))
  }catch(error){
    console.log('Database Connection Failed')
  }
}

main()
