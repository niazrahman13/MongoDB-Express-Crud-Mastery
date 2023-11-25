import { IUsers } from "./users.interface";
import usersModel from "./users.model";


// Create Students

const createStudentIntoDB = async(student: IUsers)=>{

   const result =  await usersModel.create(student)  // Built in Static Method
    return result
}

// Get Students Info

const getAllStudentsFromDB = async ()=>{
    const excludedFields = ['userId','password', 'hobbies','isActive','isDeleted','orders'];

    const query = usersModel.find().select(`-${excludedFields.join(' -')}`);
    const result = query.exec()
    
    return result
}

// Get Student info by ID

const getStudentByIdFromDB = async(id: string)=>{
    const excludedFields = ['password', 'hobbies','isActive','isDeleted','orders'];

    const query = usersModel.findOne({userId:id}).select(`-${excludedFields.join(' -')}`);
    const result = await query.exec()
    

    return result
}

// get orders by id

const getOrdersByIdFromDB = async(id: string)=>{

    const excludedFields = ['userId', 'username','password', 'fullName','age', 'email','isActive','hobbies','address'];

    const query = usersModel.findOne({userId:id}).select(`-${excludedFields.join(' -')}`);
    const data = query.exec()

    return data
}

// Update User Info by id

const updateUserByIdFromDB = async(id: any,body : any)=>{
    const result = await usersModel.updateOne({userId:id}, {$set: body})
    return result
}

// Update User Info by id

const updateUserByOrderIdFromDB = async(id: any,body : any)=>{

    const result = await usersModel.updateOne({userId:id}, {$addToSet:{orders: body} })
    return result
}

// Delete student by Id

const deleteStudentByIdFromDB = async (id:any)=>{
    const result = await usersModel.deleteOne({userId:id})
    return result
}

// Total Price

const totalPriceFromDB = async (id: any)=>{
    const result = await usersModel.aggregate([
        { $match: { "userId": id } },
        {
            $unwind: "$orders"
        },
        {
            $group: {
                _id: null,
                totalPrice: { $sum: "$orders.price" }
            }
        },
        {
            $project:{
                _id: 0,
                totalPrice : 1
            }
        }
    ]);
    return result
}

export const userServices = {
    createStudentIntoDB,
    getAllStudentsFromDB,
    getStudentByIdFromDB,
    deleteStudentByIdFromDB,
    updateUserByIdFromDB,
    updateUserByOrderIdFromDB,
    getOrdersByIdFromDB,
    totalPriceFromDB
}