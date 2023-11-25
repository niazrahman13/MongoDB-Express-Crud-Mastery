import { Schema, model } from "mongoose";
import { IAddress, IName, IOrders, IUsers } from "./users.interface";
import validator from 'validator';
import bcrypt from 'bcrypt';

//  Name Schema

const FullName = new Schema<IName> ({
    firstName: { 
         type: String,
        required: [true, 'Pleas input first name']
    },
    lastName: { 
        type: String,
        required: [true, 'Pleas input last name']
    }
})

// Address Schema

const Address = new Schema<IAddress> ({
    street : {
        type: String,
        required : [true,"Please fill the required Field"],
      
    },
    city: {
        type: String,
        required : [true,"Please fill the required Field"],
       
    },
    country: {
        type: String,
        required : [true,"Please fill the required Field"],
    
    }
})

// Orders Schema

const Orders = new Schema<IOrders> ({
    productName : {
        type: String,
        required : [true,"Please fill the required Field"],
    },
    price: {
        type: Number,
        required : [true,"Please fill the required Field"],
    },
    quantity: {
        type: Number,
        required : [true,"Please fill the required Field"],
    }
})

// Main SCHEMA

const usersSchema = new Schema<IUsers>({

    userId: {
        type: Number,
        required : [true,"Please fill the required Field"],
        unique: true
    },
    username: {
        type: String,
        required : [true,"Please fill the required Field"],
        unique: true
    },
    password : { 
        type: String,
        required: true,
        minlength:8 },
    
    fullName: {
        type: FullName,
        required: [true , 'Please Fill up Name']
    },
    age: {
        type: Number,
        required: [true, "Please fill the required Field"]
    },
    email: { 
        type: String, 
        required: true,
        lowercase:true,
        unique:true,
    },
    isActive : {
        type: Boolean,
        required: [true, 'Fill this Field'],
        default: true
    },
    hobbies:{
        type: [String],
        required: [true, 'Fill this Field'],
    },
    address: Address,
    
    orders: [Orders],
    
  }, {versionKey: false});

// Pre save middleware 

usersSchema.pre('save',async function(next){
    const user = this
    user.password = await  bcrypt.hash(user.password,12)
    next()
})

// Post save middleware

usersSchema.post('save',function(document,next){
   document.password = undefined  // We can use undefined for removing any particular field
   
    next()

})


const usersModel = model<IUsers>('usersModels', usersSchema);

export default usersModel;