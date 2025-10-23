import { createCompanyService, deleteCompanyService, getAllCompanyService, getCompanyByIdService, updateCompanyService } from "../models/companyModel.js";

// Standarized response function
const HandleResponse = (res, status, message, data = null) => {
    res.status(status).json({status, message, data });
};

// Company
export const createCompany = async (req, res, next)=>{
    const { name, description, website, location, tel, email } = req.body;
    try{
        const newCompany = await createCompanyService(name, description, website, location, tel, email);
        HandleResponse(res, 201, "Company created successfully", newCompany)
    } catch(err) {
        next(err);
    }
};

export const getAllCompany = async (req, res, next)=>{
    try{
        const company = await getAllCompanyService();
        HandleResponse(res, 200, "Company fetched successfully", company)
    } catch(err) {
        next(err);
    }
};

export const getCompanyById = async (req, res, next)=>{
    try{
        const company = await getCompanyByIdService(req.params.id);
        if (!company) return HandleResponse(res, 404, "Company not found");
        HandleResponse(res, 200, "Company fetched successfully", company)
    } catch(err) {
        next(err);
    }
};

export const updateCompany = async (req, res, next)=>{
    const {name, description, website, location, tel, email} = req.body;
    try{
        const company = await updateCompanyService(req.params.id, name, description, website, location, tel, email);
        console.log(req.params.id, name, description, website, location, tel, email);
        if (!company) return HandleResponse(res, 404, "Company not found");
        HandleResponse(res, 200, "Company updated successfully", company)
    } catch(err) {
        next(err);
    }
};

export const deleteCompany = async (req, res, next)=>{
    try{
        const company = await deleteCompanyService(req.params.id);
        if (!company) return HandleResponse(res, 404, "Company not found");
        HandleResponse(res, 200, "Company deleted successfully", company)
    } catch(err) {
        next(err);
    }
};