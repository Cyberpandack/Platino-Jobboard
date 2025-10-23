import { createAdvertissementService, deleteAdvertissementService, getAllAdvertissementService, getAdvertissementByIdService, updateAdvertissementService } from "../models/advertissementModel.js";

// Standarized response function
const HandleResponse = (res, status, message, data = null) => {
    res.status(status).json({status, message, data });
};

// Advertissement
export const createAdvertissement = async (req, res, next)=>{
    const { first_name, last_name, email, password } = req.body;
    try{
        const newadvertissement = await createAdvertissementService(first_name, last_name, email, password);
        HandleResponse(res, 201, "Advertissement created successfully", newadvertissement)
    } catch(err) {
        next(err);
    }
};

export const getAllAdvertissement = async (req, res, next)=>{
    try{
        const advertissement = await getAllAdvertissementService();
        HandleResponse(res, 200, "Advertissement fetched successfully", advertissement)
    } catch(err) {
        next(err);
    }
};

export const getAdvertissementById = async (req, res, next)=>{
    try{
        const advertissement = await getAdvertissementByIdService(req.params.id);
        if (!advertissement) return HandleResponse(res, 404, "Advertissement not found");
        HandleResponse(res, 200, "Advertissement fetched successfully", advertissement)
    } catch(err) {
        next(err);
    }
};

export const updateAdvertissement = async (req, res, next)=>{
    const {first_name, last_name, email, password} = req.body;
    try{
        const advertissement = await updateAdvertissementService(req.params.id, first_name, last_name, email, password);
        console.log(req.params.id, first_name, last_name, email, password);
        if (!advertissement) return HandleResponse(res, 404, "Advertissement not found");
        HandleResponse(res, 200, "Advertissement updated successfully", advertissement)
    } catch(err) {
        next(err);
    }
};

export const deleteAdvertissement = async (req, res, next)=>{
    try{
        const advertissement = await deleteAdvertissementService(req.params.id);
        if (!advertissement) return HandleResponse(res, 404, "Advertissement not found");
        HandleResponse(res, 200, "Advertissement deleted successfully", advertissement)
    } catch(err) {
        next(err);
    }
};