import ApiError from "../../../error/ApiError.js";
import validateFields from "../../../utils/validateFields.js";
import BusinessModel from "./business.model.js";


//create new business service
export const createNewBusinessService = async (payload) => {
    const {image, title, category, country, location, askingPrice, ownerShipType, businessType, industryName, description} = payload;

    //check if all the fields are available
    validateFields(payload,[
        image, title, category, country, location, askingPrice, ownerShipType, businessType, industryName, description
    ]);

    //create a new business
    const newBusiness = await BusinessModel.create({
        image, title, category, country, location, askingPrice, ownerShipType, businessType, industryName, description
    });

    //check if business is created or not
    if(!newBusiness){
        throw new ApiError(500,"failed to create new business");
    }

    return newBusiness;

}

//update a business service
export const updateABusinessService = async (payload) => {
    //destructure property
    const { category, country, location, askingPrice, ownerShipType, businessType, industryName, description} = payload;

    //findout which business instance have to update
    const business = await BusinessModel.findById(payload.businessId);
    if(!business){
        throw new ApiError(500, "Failed to update a business");
    }

    //now if a field is available then change that field
    if(category) business.category = category;
    if(country) business.country = country;
    if(location) business.location = location;
    if(askingPrice) business.askingPrice = askingPrice;
    if(ownerShipType) business.ownerShipType = ownerShipType;
    if(businessType) business.businessType = businessType;
    if(industryName) business.industryName = industryName;
    if(description) business.description = description;

    //save the changes
    await business.save();

}

//get all business service
export const getAllBusinessService = async () => {

    const allBusiness = await BusinessModel.find({}).limit(3);

    //check got all business data or not
    if(!allBusiness){
        throw new ApiError(500,"Failed to get all listed business data");
    }

    return allBusiness;
}

//get a single business by id
export const getASingleBusinessByIdService = async (payload) => {

    const {id} = payload;
    if(!id){
        throw new ApiError(400,"business id is required to perform search");
    }

    const business = await BusinessModel.findById(id);
    if(!business){
        throw new ApiError(500, "No business details found");
    }

    return business;

}  

//advanced search service
export const advancedSearchService = async (payload) => {
    const {category,country,location,askingPrice,businessType,ownerShipType} = payload;

    //implement search
    // const searchedBusiness = await BusinessModel.findOne({
    //     category: category, country: country, location: location, askingPrice: askingPrice,businessType: businessType, ownerShipType: ownerShipType
    // });

    let priceQuery;

    if(askingPrice === "less than $100000") { priceQuery = {$lte : 100000}}
    else if(askingPrice === "$100000 to $500000") { 
        priceQuery = {$and: [ { askingPrice: { $gte: 100000 } },{askingPrice: { $lte: 500000 } } ]}
    }
    // else if(askingPrice === "less than $100000") { priceQuery = {$lt : 100000}}
    // else if(askingPrice === "less than $100000") { priceQuery = {$lt : 100000}}
    
    

    const filters = {
        category: category,
        country: country,
        location: location,
        // askingPrice: { $lte: 500000 }, // Example: less than or equal to 500k
        businessType: businessType,
        ownerShipType: ownerShipType
    };

    const searchedBusiness = await BusinessModel.aggregate([
      {
         $match: {
            category: filters.category,
            country: filters.country,
            location: filters.location,
            askingPrice: priceQuery, // You can also use $gte, $lte here
            businessType: filters.businessType,
            ownerShipType: filters.ownerShipType
        }
      }
    ]);

    if(!searchedBusiness){
        throw new ApiError(500, "No business data found");
    }

    return searchedBusiness;
}


// https://chatgpt.com/?utm_source=google&utm_medium=paidsearch_brand&utm_campaign=DEPT_SEM_Google_Brand_Acquisition_APAC_Bangladesh_Consumer_CPA_BAU_Mix_Bengali&utm_term=chatgpt&gad_source=1&gad_campaignid=22545504846&gbraid=0AAAAA-IW-UWe4CEZpysejQfJXl9BmOax1&gclid=EAIaIQobChMI9Z_Lic6sjgMVFySDAx0LwAfFEAAYASAAEgJDJPD_BwE