import ApiError from "../../../error/ApiError.js";
import catchAsync from "../../../utils/catchAsync.js";
import sendResponse from "../../../utils/sendResponse.js";
import validateFields from "../../../utils/validateFields.js";
import CategoryModel from "./category.model.js";
import SubCategoryModel from "./subCategory.model.js";
import path from "path";
import fs from "fs";



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

//api ending point to create subcategory
export const createSubCategory = catchAsync(
    async (req,res) => {

        const { name, categoryId } = req.body;
        validateFields(req.body,["name","categoryId"]);

        // make sure category exists
        const category = await CategoryModel.findById(categoryId);
        if (!category) throw new ApiError(404, "Category is needed to create sub category");

        // create subcategory
        const subCategory = new SubCategoryModel({ name, category: categoryId });
        await subCategory.save();

        if(!subCategory) throw new ApiError(500, "Failed to create sub category");

        // push subcategory into category's list
        category.subCategories.push(subCategory._id);
        await category.save();


        sendResponse(res,{
            statusCode: 201,
            success: true,
            message: "successfully created subcategory",
            data: subCategory
        });
    }
);


//api ending point to get all category
export const getAllCategoryWithSubCategory = catchAsync(
    async (req,res) => {

        const response = await CategoryModel.find({}).populate({
            path: "subCategories", select: "-_id name"
        }).select('-_id -createdAt -updatedAt');

        if(!response) throw new ApiError(404, "Categories and subCategories not found");

        sendResponse(res,{
            statusCode: 200,
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

        const category = await CategoryModel.findById(categoryId);
        if(!category) throw new ApiError(404,"Category not found to update");

        if(req.file){
            if(category.categoryImage){
                // Step 2: Remove old images from filesystem      
                const filePath = path.join("uploads/category-image", category.categoryImage);
                
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath); // delete the file
                }
            }
        }

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

         const category = await CategoryModel.findById(categoryId);
         if(!category) throw new ApiError(404, "Category not found to delete");

         //delete category image before delete category
         if(category.categoryImage){
            // Step 2: Remove old images from filesystem      
            const filePath = path.join("uploads/category-image", category.categoryImage);
            
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath); // delete the file
            }
            
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