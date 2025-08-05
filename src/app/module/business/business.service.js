import ApiError from "../../../error/ApiError.js";
import validateFields from "../../../utils/validateFields.js";
import InterestedModel from "../interested/interested.model.js";
import BusinessModel from "./business.model.js";
import nodemailer from "nodemailer";
// import fs from "fs";


//create new business service
export const createNewBusinessService = async (req) => {
    const userId = req.user.userId;
    const image = req.file.filename;
    if(!image){
        throw new ApiError(400, "Image is required to create new business");
    }

    const { title, category, country, location, askingPrice, ownershipType, businessType, industryName, description} = req.body;

    //check if all the fields are available
    validateFields(req.body,[
         "title", "category", "country", "location", "askingPrice", "ownershipType", "businessType"
    ]);

    //create a new business
    const newBusiness = await BusinessModel.create({
        user: userId,image, title, category, country, location, askingPrice, ownershipType, businessType, industryName, description
    });

    //check if business is created or not
    if(!newBusiness){
        throw new ApiError(500,"failed to create new business");
    }

    return newBusiness;

}

//update a business service
export const updateABusinessService = async (req) => {
    //if image comes then have to extract image name from req.file.filename
    let imgName;
    if(req.file){
        imgName = req.file.filename;
    }
    const businessId = req.params.businessId;
    // console.log(businessId);
    
    if(!businessId){
        throw new ApiError(400, "Business id is required to update a business");
    }
    //destructure property
    const { title,category, country, location, askingPrice, ownershipType, businessType, industryName, description} = req.body;

    //no need to validate update service payload . because during updation all fields are not necessery

    //findout which business instance have to update
    const updatedBusiness = await BusinessModel.findByIdAndUpdate(businessId,{
        image: imgName,title,category, country, location, askingPrice, ownershipType, businessType, industryName, description
    });

    if(!updatedBusiness){
        throw new ApiError(500, "Failed to update a business");
    }

}

//get all business service
export const getAllBusinessService = async () => {

    const allBusiness = await BusinessModel.find({}).limit(10);

    //check got all business data or not
    if(!allBusiness){
        throw new ApiError(500,"Failed to get all listed business data");
    }

    return allBusiness;
}

//get a single business by id
export const getASingleBusinessByIdWithUsersService = async (query) => {

    const {businessId} = query;
    // console.log(businessId);
    
    if(!businessId){
        throw new ApiError(400,"business id is required to get business");
    }

    const business = await BusinessModel.findById(businessId);

    if(!business){
        throw new ApiError(500, "No business details found");
    }

    //find out all users who are interested to this business
    const interestedUsers = await InterestedModel.find({businessId: businessId}).populate({
    path: "userId",
    select: "role", // only fetch 'role' from User model
   });


    return {business,interestedUsers};

}  

//get single business details
export const singleBusinessDetailsService = async (req) => {
    const {businessId} = req.query;
    console.log(businessId);
    
    if(!businessId){
        throw new ApiError(400,"business id is required to get business details");
    }

    const business = await BusinessModel.findById(businessId);

    if(!business){
        throw new ApiError(500, "No business details found");
    }

    return business;

}

//interested buyers details service
export const interestedBuyersDetailsService = async (query) => {
    const {businessId,interestedId } = query;

    validateFields(query,["businessId","interestedId"]);

    const business = await BusinessModel.findById(businessId);
    if(!business){
        throw new ApiError(404,"No business found on this businessId");
    }

    const interestedUser = await InterestedModel.findById(interestedId);
    if(!interestedUser){
        throw new ApiError(404,"No Interested user found on this InterestedId");
    }

    return {business,interestedUser};

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

// get business valuation service
export const getBusinessValuationService = async (req) => {
    //destructure all data from payload
    // const { ownerName,BusinessName,email, countryCode, mobile, region, country,location, annualTurnover, currency, yearOfEstablishment, annualExpenses,purpose, annualProfit,valueOfAsset,valueOfStock,plReportPdf,equipmentListPdf,businessProfilePdf,businessImagesPdf,message } = payload;
    
    //then send all the data to owner through node mailer
     const { name, email, contactNumber } = req.body;
        const files = req.files;

        if (!name || !email || !contactNumber || !files.length) {
            throw new ApiError(400,"name , email, number are required to get your business valuation");
        }

        // Setup Nodemailer
        try {
            
            const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'soubir.sparktech19820@gmail.com',
                pass: 'qcrw vxot hhpi xtmh', // Use App Password for Gmail with 2FA
            },
            });
    
            // Prepare attachments
            const attachments = files.map(file => ({
            filename: file.originalname,
            path: file.path,
            contentType: 'application/pdf',
            }));
    
            const mailOptions = {
            from: 'soubir.sparktech19820@gmail.com',
            to: 'soubir2018@gmail.com',
            subject: 'Your Submitted PDFs',
            text: `Hi ${name},\n\nThank you for your submission.\n\nHere are the details:\nName: ${name}\nEmail: ${email}\nContact Number: ${contactNumber}`,
            attachments,
            };
    
            // Send email
            await transporter.sendMail(mailOptions);
    
            // Optional: Delete uploaded files after sending email
            files.forEach(file => fs.unlinkSync(file.path));
    
            // res.status(200).json({ message: 'Email sent successfully!' });
        } 
     catch (error) {
        console.error('Error sending email:', error);
        // res.status(500).json({ message: 'Something went wrong.' });
        throw new ApiError(500,"failed to send api");
    }



}


// https://chatgpt.com/?utm_source=google&utm_medium=paidsearch_brand&utm_campaign=DEPT_SEM_Google_Brand_Acquisition_APAC_Bangladesh_Consumer_CPA_BAU_Mix_Bengali&utm_term=chatgpt&gad_source=1&gad_campaignid=22545504846&gbraid=0AAAAA-IW-UWe4CEZpysejQfJXl9BmOax1&gclid=EAIaIQobChMI9Z_Lic6sjgMVFySDAx0LwAfFEAAYASAAEgJDJPD_BwE