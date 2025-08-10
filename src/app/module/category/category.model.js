import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryName:{
        type: String,
        required: [true, "Category name is required to create a new category"]
    },
    categoryImage:{
        type: String
    }
},{ timestamps: true });

const CategoryModel = mongoose.models.Category || mongoose.model("Category", categorySchema);

export default CategoryModel;