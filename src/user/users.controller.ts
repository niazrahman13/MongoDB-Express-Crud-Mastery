import Joi from 'joi';
import { userServices } from './users.service';
import { Request, Response } from "express";
import joiValidationSchema from './user.validation';

// Create User

const createUsers = async (req: Request, res: Response)=>{
    try{
        

        const body = req.body

        const {error,value} = joiValidationSchema.validate(body)

        if(error){
            res.status(404).json({
                success: "Data Failed",
                Result: error
            })
        }

        const result = await userServices.createStudentIntoDB(body)
        
    res.status(200).json({
        success:true,
        message: "User created successfully!",
        data: {
            "userId": result.userId,
            "username":result.username,
            "fullName": result.fullName,
            "age": result.age,
            "email": result.email,
            "isActive": result.isActive,
            "hobbies": result.hobbies,
            "address": result.address
        }
    })

    }catch(error){
            res.status(200).json({
            success: "Data Failed",
            Result: error
        })
    }
}

// Get Users

const getAllUsers = async(req: Request,res: Response)=>{
    try{
        const result = await userServices.getAllStudentsFromDB()
        
        res.status(200).json({
            success:true,
            message: "User fetched successfully!",
            data: result
        })
    }catch(error){
        res.status(404).json({
            "success": false,
            "message": "User not found",
            "error": {
            "code": 404,
            "description": "User not found!"
        }
        })
    }
}

// Get User By Id

const getUserById = async(req: Request,res: Response) =>{
   try{
    const id = req.params.userId

    const result = await userServices.getStudentByIdFromDB(id)

    res.status(200).json({
        success:true,
        message:"User fetched successfully!",
        data:result
    })
   }catch(error){

    res.status(404).json(
        {
            "success": false,
            "message": "User not found",
            "error": {
                "code": 404,
                "description": "User not found!"
            }
        }
    )

   }
}

// Get orders from id by db

const getOrdersById = async(req: Request,res: Response) =>{
    try{
     const id = req.params.userId
 
     const result = await userServices.getOrdersByIdFromDB(id)
     
 
     res.status(200).json({
         success:true,
         message:"Orders fetched successfully!",
         data:result
     })
    }catch(error){
 
     res.status(404).json(
         {
             "success": false,
             "message": "User not found",
             "error": {
                 "code": 404,
                 "description": "User not found!"
             }
         }
     )
 
    }
 }

// Update User By Id

const updateUserById = async(req: Request,res: Response) =>{
    try{
     const id = req.params.userId
     const body = req.body
 
     const result = await userServices.updateUserByIdFromDB(id,body)
 
     res.status(200).json({
         success:true,
         message:"User updated successfully!",
         data:result
     })
    }catch(error){
 
     res.status(404).json(
         {
             "success": false,
             "message": "User not found",
             "error": {
                 "code": 404,
                 "description": "User not found!"
             }
         }
     )
 
    }
 }

// Add new Product in Order

const updateUserByOrderId = async(req: Request,res: Response) =>{
    try{
     const id = req.params.userId
     const body = req.body

     const result = await userServices.updateUserByOrderIdFromDB(id,body)
    console.log(result)

     res.status(200).json({
         success:true,
         message:"Order Created successfully!",
         data:null
     })
    }catch(error){
 
     res.status(404).json(
         {
             "success": false,
             "message": "User not found",
             "error": {
                 "code": 404,
                 "description": "User not found!"
             }
         }
     )
 
    }
 }

// Delete Student by id

const deleteUserById = async(req: Request,res: Response) =>{
    try{
     const id = req.params.userId
 
     const result = await userServices.deleteStudentByIdFromDB(id)
 
     res.status(200).json({
        success: true,
        message: "User deleted successfully!",
        data : null
    })
    }catch(error){
 
     res.status(404).json({
        success: false,
        message: "User not found",
        error: {
            code: 404,
            description: "User not found!"
        }
    })
 
    }
 }
// Total Price

 const totalPrice = async(req: Request,res: Response) =>{
    try{
     const id = parseInt(req.params.userId)
 
     const result = await userServices.totalPriceFromDB(id)
        
        console.log(result)

     res.status(200).json({
        success: true,
        message: "Total price calculated successfully!",
        data : result
    })
    }catch(error){
 
     res.status(404).json({
        success: false,
        message: "User not found",
        error: {
            code: 404,
            description: "User not found!"
        }
    })
 
    }
 }

export const userControllers = {
    createUsers,
    getAllUsers,
    getUserById,
    deleteUserById,
    updateUserById,
    updateUserByOrderId,
    getOrdersById,
    totalPrice
}
