import validateFields from "../../../utils/validateFields.JS";
import FormationModel from "./formation.model.js";
import ApiError from "../../../error/ApiError.js";


//create new formation service
export const createNewFormatService = async (payload) => {
    const {image, title, detail } = payload;

    //check if all necessery fields are availablr or not
    validateFields(payload,["image","title","detail"]);

    //create new format
    const newFormat = await FormationModel.create({image, title, detail});

    if(!newFormat){
        throw new ApiError(500,"Failed to create new formation");
    }

    return newFormat;

}

//get all formation service
export const getAllFormationService = async () => {

    //get all info from db
    const allFormat = await FormationModel.find({});

    if(!allFormat){
        throw new ApiError(404, "Failed to get all formation");
    }

    return allFormat;
}

//update formation service
export const updateFormationService = async (payload) => {
    const { image, title, detail,formatId } = payload;

    //get formation
    const formation = await FormationModel.findById(formatId);
    if(!formation){
        throw new ApiError(404, "Failed to retrieve formation for update");
    }

    //now update format
    if(image) { formation.image = image }
    if(title) { formation.title = title }
    if(detail) { formation.detail = detail }

    await formation.save();

    return formation;
}

//delete formation service
export const deleteFormatservice = async (query) => {

    const {  formationId } = query;

    //check if id is availavle or not
    if(!formationId){
        throw new ApiError(400,"Formation id is required to delete formation");
    }

    const deletedFormat = await FormationModel.findByIdAndDelete(formationId);

    //check if deleteted or not
    if(!deletedFormat){
        throw new ApiError(500, "Failed to delete formation");
    }

    return deletedFormat;

}