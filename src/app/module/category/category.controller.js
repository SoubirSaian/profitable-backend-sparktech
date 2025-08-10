import ApiError from "../../../error/ApiError.js";
import catchAsync from "../../../utils/catchAsync.js";
import sendResponse from "../../../utils/sendResponse.js";
import CategoryModel from "./category.model.js";




//api ending point to create new category
export const createNewCategory = catchAsync(
    async (req,res) => {
        //to get image name from req.file
        let imageName;
        if(req.file){
            imageName = req.file.filename
        }

        const {categoryName} = req.body;

        if (!categoryName){
            throw new ApiError(400," Category name is required");
        }

        const category = await CategoryModel.create({categoryName,categoryImage: imageName});
        if(!category) {
            throw new ApiError(500," Failed to create new category");
        }

        sendResponse(res,{
            statusCode: 201,
            success: true,
            message: "Created new category",
            data: category
        });
    }
);


//api ending point to get all category
export const getAllCategory = catchAsync(
    async (req,res) => {

        const response = await CategoryModel.find({});

        sendResponse(res,{
            statusCode: 201,
            success: true,
            message: "Created new category",
            data: response
        });
    }
);

//api ending point to update category
export const updateCategory = catchAsync(
    async (req,res) => {

        const { categoryId } = req.query;
        if(!categoryId) {
            throw new ApiError(400,"Category Id is required to update category");
        }
        //handle update image name
        let imageName;
        if(req.file){
            imageName = req.file.filename;
        }

        const { categoryName } = req.body;

        const response = await CategoryModel.findByIdAndUpdate(categoryId,{
            categoryName,categoryImage: imageName},
            { new: true });

        sendResponse(res,{
            statusCode: 200,
            success: true,
            message: "updated category succesfully",
            data: response
        });
    }
);

//api ending point delete category
export const deleteCategory = catchAsync(
    async (req,res) => {

         const { categoryId } = req.query;
         if(!categoryId) {
             throw new ApiError(400,"Category Id is required to delete category");
         }

        const response = await CategoryModel.findByIdAndDelete(categoryId);

        sendResponse(res,{
            statusCode: 200,
            success: true,
            message: "Deleted category",
            data: response
        });
    }
);