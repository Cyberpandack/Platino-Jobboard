import { createApplicationService, deleteApplicationService, getAllApplicationService, getAppliationByIdService, updateApplicationService } from "../models/applicationModel.js";

// Standarized response function
const HandleResponse = (res, status, message, data = null) => {
    res.status(status).json({status, message, data });
};

// Application
export const createApplication = async (req, res, next)=>{
    const { name, description, website, location, tel, email } = req.body;
    try{
        const newApplication = await createApplicationService(name, description, website, location, tel, email);
        HandleResponse(res, 201, "Application created successfully", newApplication)
    } catch(err) {
        next(err);
    }
};

export const getAllApplication = async (req, res, next)=>{
    try{
        const Application = await getAllApplicationService();
        HandleResponse(res, 200, "Application fetched successfully", Application)
    } catch(err) {
        next(err);
    }
};

export const getApplicationById = async (req, res, next)=>{
    try{
        const Application = await getApplicationByIdService(req.params.id);
        if (!Application) return HandleResponse(res, 404, "Application not found");
        HandleResponse(res, 200, "Application fetched successfully", Application)
    } catch(err) {
        next(err);
    }
};

export const updateApplication = async (req, res, next)=>{
    const {name, description, website, location, tel, email} = req.body;
    try{
        const Application = await updateApplicationService(req.params.id, name, description, website, location, tel, email);
        console.log(req.params.id, name, description, website, location, tel, email);
        if (!Application) return HandleResponse(res, 404, "Application not found");
        HandleResponse(res, 200, "Application updated successfully", Application)
    } catch(err) {
        next(err);
    }
};

export const deleteApplication = async (req, res, next)=>{
    try{
        const Application = await deleteApplicationService(req.params.id);
        if (!Application) return HandleResponse(res, 404, "Application not found");
        HandleResponse(res, 200, "Application deleted successfully", Application)
    } catch(err) {
        next(err);
    }
};