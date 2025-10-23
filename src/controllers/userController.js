import { createUserService, deleteUserService, getAllUsersService, getUserByIdService, updateUserService } from "../models/userModel.js";

// Standarized response function
const HandleResponse = (res, status, message, data = null) => {
    res.status(status).json({status, message, data });
};

// USERS
export const createUser = async (req, res, next)=>{
    const { first_name, last_name, email, password } = req.body;
    try{
        const newUser = await createUserService(first_name, last_name, email, password);
        HandleResponse(res, 201, "User created successfully", newUser)
    } catch(err) {
        next(err);
    }
};

export const getAllUsers = async (req, res, next)=>{
    try{
        const users = await getAllUsersService();
        HandleResponse(res, 200, "User fetched successfully", users)
    } catch(err) {
        next(err);
    }
};

export const getUserById = async (req, res, next)=>{
    try{
        const user = await getUserByIdService(req.params.id);
        if (!user) return HandleResponse(res, 404, "User not found");
        HandleResponse(res, 200, "User fetched successfully", user)
    } catch(err) {
        next(err);
    }
};

export const updateUser = async (req, res, next)=>{
    const {first_name, last_name, email, password} = req.body;
    try{
        const user = await updateUserService(req.params.id, first_name, last_name, email, password);
        console.log(req.params.id, first_name, last_name, email, password);
        if (!user) return HandleResponse(res, 404, "user not found");
        HandleResponse(res, 200, "User updated successfully", user)
    } catch(err) {
        next(err);
    }
};

export const deleteUser = async (req, res, next)=>{
    try{
        const user = await deleteUserService(req.params.id);
        if (!user) return HandleResponse(res, 404, "user not found");
        HandleResponse(res, 200, "User deleted successfully", user)
    } catch(err) {
        next(err);
    }
};