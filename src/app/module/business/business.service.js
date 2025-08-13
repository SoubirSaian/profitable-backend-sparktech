import ApiError from "../../../error/ApiError.js";
import validateFields from "../../../utils/validateFields.js";
import InterestedModel from "../interested/interested.model.js";
import BusinessModel from "./business.model.js";
import nodemailer from "nodemailer";
import fs from "fs";
import config from "../../../config/index.js";
import path from "path";
import CategoryModel from "../category/category.model.js";
import UserModel from "../user/user.model.js";


//create new business service
export const createNewBusinessService = async (req) => {
    const userId = req.user.userId;
    console.log(userId);
    
    const role = req.user.role;
    // console.log(req.file.filename); 
    let image;
    if(req.file){
         image = req.file.filename;
    }
    
    if(!image){
        throw new ApiError(400, "Image is required to create new business");
    }

    const { title, category, country, location, askingPrice, ownerShipType, businessType, industryName, description} = req.body;

    //check if all the fields are available
    validateFields(req.body,[
         "title", "category", "country", "location", "askingPrice", "ownerShipType", "businessType"
    ]);

    //user type and subscription wise different add business functionlity
    const user = await UserModel.findById(userId).populate({
            path: "subscriptionPlan", select: "subscriptionPlanType"
        }).select('isSubscribed totalBusiness');

    const businessCount = user.totalBusiness;
    const subscriptionPlanType = user.subscriptionPlan.subscriptionPlanType;

    //Seller add business
    if(role === "Seller"){

        if(subscriptionPlanType === "Free Plan"){

            //check if user can add new business or not
             if(businessCount >= 1) throw new ApiError(400, "Free plan user can't add more than one business");
             
             const newBusiness = await BusinessModel.create({
                user: userId,image, title, businessRole: role, category, country, location, askingPrice, ownerShipType, businessType, industryName, description
             });

            //check if business is created or not
            if(!newBusiness){
                throw new ApiError(500,"failed to create new business");
            }

            return newBusiness;

        }
        else if(subscriptionPlanType === "1 Months"){

            //check if user can add new business or not
             if(businessCount >= 2) throw new ApiError(400, "1 month subscription plan user can't add more than 2 business");

             const newBusiness = await BusinessModel.create({
                user: userId,image, title, businessRole: role, category, country, location, askingPrice, ownerShipType, businessType, industryName, description
            });

            //check if business is created or not
            if(!newBusiness){
                throw new ApiError(500,"failed to create new business");
            }

            return newBusiness;

        }
        else if(subscriptionPlanType === "3 Months"){

            //check if user can add new business or not
             if(businessCount >= 5) throw new ApiError(400, "3 Months subscription plan user can't add more than 5 business");

             const newBusiness = await BusinessModel.create({
                user: userId,image, title, businessRole: role, category, country, location, askingPrice, ownerShipType, businessType, industryName, description
            });

            //check if business is created or not
            if(!newBusiness){
                throw new ApiError(500,"failed to create new business");
            }

            return newBusiness;

        }
        else if(subscriptionPlanType === "6 Months"){

            //check if user can add new business or not
             if(businessCount >= 10) throw new ApiError(400, "6 Month subscriptiopn plan user can't add more than 10 business");

             const newBusiness = await BusinessModel.create({
                user: userId,image, title, businessRole: role, category, country, location, askingPrice, ownerShipType, businessType, industryName, description
            });

            //check if business is created or not
            if(!newBusiness){
                throw new ApiError(500,"failed to create new business");
            }

            return newBusiness;

        }
    }
    else if(role === "Asset Seller") {

         if(subscriptionPlanType === "1 Months"){

            //check if user can add new business or not
             if(businessCount >= 1) throw new ApiError(400, "1 month subscription plan user can't add more than 1 business");

             const newBusiness = await BusinessModel.create({
                user: userId,image, title, businessRole: role, category, country, location, askingPrice, ownerShipType, businessType, industryName, description
            });

            //check if business is created or not
            if(!newBusiness){
                throw new ApiError(500,"failed to create new business");
            }

            return newBusiness;

         }
        else if(subscriptionPlanType === "3 Months"){

            //check if user can add new business or not
             if(businessCount >= 3) throw new ApiError(400, "3 Months subscription plan user can't add more than 3 business");

             const newBusiness = await BusinessModel.create({
                user: userId,image, title, businessRole: role, category, country, location, askingPrice, ownerShipType, businessType, industryName, description
            });

            //check if business is created or not
            if(!newBusiness){
                throw new ApiError(500,"failed to create new business");
            }

            return newBusiness;

        }
        else if(subscriptionPlanType === "6 Months"){

            //check if user can add new business or not
             if(businessCount >= 5) throw new ApiError(400, "6 Month subscriptiopn plan user can't add more than 5 business");

             const newBusiness = await BusinessModel.create({
                user: userId,image, title, businessRole: role, category, country, location, askingPrice, ownerShipType, businessType, industryName, description
            });

            //check if business is created or not
            if(!newBusiness){
                throw new ApiError(500,"failed to create new business");
            }

            return newBusiness;

        }
    }
    else if(role === "Business Idea Lister"){
        //for Business Idea lister there is no limitation to add new Business
        const newBusiness = await BusinessModel.create({
            user: userId,image, title, businessRole: role, category, country, location, askingPrice, ownerShipType, businessType, industryName, description
        });

        //check if business is created or not
        if(!newBusiness){
            throw new ApiError(500,"failed to create new business");
        }

        return newBusiness;
    }

    else if(role === "Broker"){

         if( subscriptionPlanType === "Basic Broker Package"){

            //check if user can add new business or not
            if(businessCount >= 5) throw new ApiError(400, "Basic broker package subscriptiopn plan user can't add more than 5 business");

            const newBusiness = await BusinessModel.create({
                user: userId,image, title, businessRole: role, category, country, location, askingPrice, ownerShipType, businessType, industryName, description
           });

            //check if business is created or not
            if(!newBusiness){
                throw new ApiError(500,"failed to create new business");
            }

            return newBusiness;

        }
         else if(subscriptionPlanType === "Professional Broker Package"){

            //check if user can add new business or not
            if(businessCount >= 15) throw new ApiError(400, "Professional broker package subscriptiopn plan user can't add more than 15 business");

            const newBusiness = await BusinessModel.create({
                user: userId,image, title, businessRole: role, category, country, location, askingPrice, ownerShipType, businessType, industryName, description
           });

            //check if business is created or not
            if(!newBusiness){
                throw new ApiError(500,"failed to create new business");
            }

            return newBusiness;

        }
         else if(subscriptionPlanType === "Premium Broker Package"){

            //check if user can add new business or not
            // if(businessCount >= 5) throw new ApiError(400, "Premium broker package subscriptiopn plan user can't add more than 5 business");

            const newBusiness = await BusinessModel.create({
                user: userId,image, title, businessRole: role, category, country, location, askingPrice, ownerShipType, businessType, industryName, description
           });

            //check if business is created or not
            if(!newBusiness){
                throw new ApiError(500,"failed to create new business");
            }

            return newBusiness;

        }
    }

    else if(role === "Francise Seller"){

        if(subscriptionPlanType === "1 Months"){
            //check if user can add new business or not
                if(businessCount >= 1) throw new ApiError(400, "1 Month subscriptiopn plan user can't add more than 1 business");
    
                const newBusiness = await BusinessModel.create({
                    user: userId,image, title, businessRole: role, category, country, location, askingPrice, ownerShipType, businessType, industryName, description
               });
    
                //check if business is created or not
                if(!newBusiness){
                    throw new ApiError(500,"failed to create new business");
                }
    
                return newBusiness;
        }
        else if(subscriptionPlanType === "3 Months"){
            //check if user can add new business or not
                if(businessCount >= 3) throw new ApiError(400, "3 Month subscriptiopn plan user can't add more than 3 business");
    
                const newBusiness = await BusinessModel.create({
                    user: userId,image, title, businessRole: role, category, country, location, askingPrice, ownerShipType, businessType, industryName, description
               });
    
                //check if business is created or not
                if(!newBusiness){
                    throw new ApiError(500,"failed to create new business");
                }
    
                return newBusiness;
        }
        else if(subscriptionPlanType === "6 Months"){
            //check if user can add new business or not
                if(businessCount >= 5) throw new ApiError(400, "6 Month subscriptiopn plan user can't add more than 5 business");
    
                const newBusiness = await BusinessModel.create({
                    user: userId,image, title, businessRole: role, category, country, location, askingPrice, ownerShipType, businessType, industryName, description
               });
    
                //check if business is created or not
                if(!newBusiness){
                    throw new ApiError(500,"failed to create new business");
                }
    
                return newBusiness;
        }

    }  

}

//update a business service
export const updateABusinessService = async (req) => {
    //if image comes then have to extract image name from req.file.filename
    let imgName;
    if(req.file){
        imgName = req.file.filename;
    }
    const {businessId,user} = req.query;
    const { userId } = req.user;
    // console.log(businessId);
    
    if(!businessId || !user){
        throw new ApiError(400, "BusinessId and userId is required to update a business");
    }

    //check if user can update or not
    if(userId !== user){
        throw new ApiError(403,"You can't update this business");
    }

    //destructure property
    const { title,category, country, location, askingPrice, ownerShipType, businessType, industryName, description} = req.body;

    //no need to validate update service payload . because during updation all fields are not necessery

    //findout which business instance have to update
    const updatedBusiness = await BusinessModel.findByIdAndUpdate(businessId,{
        image: imgName,title,category, country, location, askingPrice, ownerShipType, businessType, industryName, description
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

//delete business service
export const deleteBusinessService = async (query) => {
    const { businessId } = query;
    if(!businessId) throw new ApiError(400, "Business Id is required to delete a businesss");

    // 1️⃣ Find business by ID
    const business = await BusinessModel.findById(businessId);
    if (!business) {
      throw new ApiError(404, "Business not found to delete");
    }

    // 2️⃣ Delete image from uploads folder if exists
    if (business.image) {
      const imagePath = path.join(process.cwd(), "uploads/business-image", business.image);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // delete file
      }
      console.log("business img deleted");
      
    }

    // 3️⃣ Delete business from DB
    const deleted = await BusinessModel.findByIdAndDelete(businessId);

    return deleted;

}

//get single business details
export const singleBusinessDetailsService = async (req) => {
    const {businessId} = req.query;
    console.log(businessId);
    
    if(!businessId){
        throw new ApiError(400,"business id is required to get business details");
    }

    //here you will get a business details and also can mark it as viewed
    //$inc: { views: 1 } will increase the views count by 1 atometically, so even under high traffic, the view count stays consistent.
    const business = await BusinessModel.findByIdAndUpdate(businessId,{ $inc: { views: 1 } },{new: true});

    if(!business){
        throw new ApiError(500, "No business details found on this buisness id");
    }

    //now get interested users who is interested to this business
    //If you don’t need the full data, just the number of users, use .countDocuments() instead — it’s faster and uses less memory:
    const totalInterested = await InterestedModel.countDocuments({ businessId: businessId });

    return {business,totalInterested};

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
export const advancedSearchService = async (query) => {
    const {category,country,location,askingPrice,businessType,ownerShipType,SortBy} = query;

    //check if it is older first or newest first
    let sortOrder;
    if(SortBy === "Oldest") sortOrder = 1;
    else if(SortBy === "Newest") sortOrder = -1;

    const searchedBusiness = await BusinessModel.aggregate([
      {
         $match: {
            category: category,
            country: country,
            location: location,
            askingPrice: askingPrice, 
            businessType: businessType,
            ownerShipType: ownerShipType
        }
      },
      {
        $sort: { createdAt: sortOrder }
      }
    ]);
    

    if(!searchedBusiness){
        throw new ApiError(404, "No business data found");
    }

    return searchedBusiness;
}

// get business valuation service
export const getBusinessValuationService = async (req) => {
    //destructure all data from payload
    const { ownerName,businessName,email, countryCode, mobile, region, country,location,businessType,category, annualTurnover, currency, yearOfEstablishment, annualExpenses,purpose, annualProfit,valueOfAsset,valueOfStock,message } = req.body;
    
    //then send all the data to owner through node mailer
    //  const { name, email, contactNumber } = req.body;
        const files = req.files;

        // if (!name || !email || !contactNumber || !files.length) {
        //     throw new ApiError(400,"name , email, number are required to get your business valuation");
        // }

        // Setup Nodemailer
        try {
            
            const transporter = nodemailer.createTransport({
            service: config.smtp.smtp_service,
            auth: {
                user: config.smtp.smtp_mail,
                pass: config.smtp.smtp_password, // Use App Password for Gmail with 2FA
            },
            });
    
            // Prepare attachments
            const attachments = files.map(file => ({
            filename: file.originalname,
            path: file.path,
            contentType: 'application/pdf',
            }));
    
            const mailOptions = {
            from: `${config.smtp.NAME} <${config.smtp.smtp_mail}>`,
            to: config.smtp.smtp_mail,
            subject: 'Detailed information for business valuation',
            text: `Hi This is ${ownerName ? ownerName : "NA"},\n\n
                Here are the details:\n\n
                Owner Name: ${ownerName ? ownerName : "NA"}\n
                Business Name : ${businessName ? businessName : "NA"}\n
                Email: ${email ? email : "NA"}\n
                Country Code : ${countryCode ? countryCode : "NA"}\n
                Mobile : ${mobile ? mobile : "NA"}\n
                Region : ${region ? region : "NA"}\n
                Country : ${country ? country : "NA"}\n
                location : ${location ? location : "NA"}\n
                Business Type : ${businessType ? businessType : "NA"}\n
                Category : ${category ? category : "NA"}\n
                Annual Turnover : ${annualTurnover ? annualTurnover : "NA"}\n
                Currency : ${currency ? currency : "NA"}\n
                Year Of Establishment : ${yearOfEstablishment ? yearOfEstablishment : "NA"}\n
                Annual Expense : ${annualExpenses ? annualExpenses : "NA"}\n
                Purpose : ${purpose ? purpose : "NA"}\n
                Annual Profit : ${annualProfit ? annualProfit : "NA"}\n
                Value Of Asset : ${valueOfAsset ? valueOfAsset : "NA"}\n
                Value of Stock : ${valueOfStock ? valueOfStock : "NA"}\n
                Message : ${message ? message : "NA"}\n
                
                `,
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
        throw new ApiError(500,"failed to send email to get your business valuation");
    }



}

//filter business service
export const filterBusinessService = async (query) => {
    const {category,country,location,askingPrice,businessType,ownerShipType,ageOfListing,sortBy,searchText,businessRole} = query;

    //filter all data by various query
    if(!category && !country && !location && !askingPrice && !businessType && !ownerShipType && !ageOfListing && !sortBy && !searchText && !businessRole){
        const business = await BusinessModel.find({});
        return business;
    }
    else if(category){
        const business = await BusinessModel.find({category: category});
        return business;
    }
    else if(country){
        const business = await BusinessModel.find({country: country});
        return business;
    }
    else if(location){
        const business = await BusinessModel.find({location: location});
        return business;
    }
    else if(askingPrice){
        const business = await BusinessModel.find({askingPrice: askingPrice});
        return business;
    }
    else if(businessType){
        const business = await BusinessModel.find({businessType: businessType});
        return business;
    }
    else if(ownerShipType){
        const business = await BusinessModel.find({ownerShipType: ownerShipType});
        return business;
    }
    else if(ageOfListing){
        //present date
        const todaysDate = new Date();

        if(ageOfListing === "Anytime"){
            //newest business to show first
            const business = await BusinessModel.find({}).sort({createdAt: -1});
            return business;
        }
        else if(ageOfListing === "Last 3 Days"){

            //set date 3 days ago
            todaysDate.setDate(todaysDate.getDate() - 3);
            const business = await BusinessModel.find({ createdAt: { $gte: todaysDate } });
            return business;
        }
        else if(ageOfListing === "Last 14 Days"){
            //set date 14 days ago
            todaysDate.setDate(todaysDate.getDate() - 14);
            const business = await BusinessModel.find({ createdAt: { $gte: todaysDate } });
            return business;
        }
        else if(ageOfListing === "Last Month"){
            //set date 30 days ago
            todaysDate.setDate(todaysDate.getDate() - 30);
            const business = await BusinessModel.find({ createdAt: { $gte: todaysDate } });
            return business;
        }
        else if(ageOfListing === "Last 3 Months"){
            //set date 90 days ago
            todaysDate.setDate(todaysDate.getDate() - 90);
            const business = await BusinessModel.find({ createdAt: { $gte: todaysDate } });
            return business;
        }
    }
    else if(sortBy){

        if(sortBy=== "Newest First"){
            const business = await BusinessModel.find({}).sort( { createdAt: -1 } );
            return business;
        }

        else if(sortBy === "Price (Low to High)"){
            //here I am using mongoose aggregation to filter price
            const business = await BusinessModel.aggregate([
                {
                    $match:{
                        askingPrice: "Under $50k"
                    }
                },
                {
                    $match:{
                        askingPrice: "$50k - $100k"
                    }
                },
                {
                    $match:{
                        askingPrice: "$100k - $250k"
                    }
                },
                {
                    $match:{
                        askingPrice: "$250k - $500k"
                    }
                },
                {
                    $match:{
                        askingPrice: "$500k - 1M"
                    }
                },
                {
                    $match:{
                        askingPrice: "Over 1M"
                    }
                }
            ]);

            return business;

        }

        else if( sortBy === "Most Viewed"){
            //.find() retrieves all business documents.
            //.sort({ views: -1 }):
           //-1 = descending order (most views → fewest views).
            //If two businesses have the same number of views, they will appear based on creation time or MongoDB’s default order.
            const mostViewedApproved = await BusinessModel.find({
                // isApproved: true,
                // isSold: false
            }).sort({ views: -1 });
            

            return mostViewedApproved;

        }
       

    }
    else if(searchText){
        //$regex: searchTerm → Matches titles that contain the given term.
        //$options: "i" → Makes it case-insensitive (so "Coffee" matches "coffee").
        const business = await BusinessModel.aggregate([
           {
            $match: {
                title: { $regex: searchText, $options: "i" }
            }
           } 
        ]);

        return business;
    }
    else if(businessRole){
        const business = await BusinessModel.find({businessRole: businessRole});
        return business;
    }
    


}

//filter business by business role service
export const filterBusinessByBusinessRoleService = async (query) => {
    const { businessRole } = query;

    if (!businessRole) throw new ApiError(400, "Business role is required to filter business by role");

    const business = await BusinessModel.find( { businessRole: businessRole } );

    if(!business) throw new ApiError(404, "No data found");

    return business;
}

//filter business by business most viewed
export const filterBusinessByMostViewService = async (query) => {
    console.log(query.role,query.userId);

    //if no user logged in then this api will work
    if(!query.role && !query.userId){
        console.log(query.role,query.userId);
        // if(!query.role && !query.userId)
        const business = await BusinessModel.find({isApproved: true}).sort({ views: -1});

        if(!business) throw new ApiError(404, "No data found");

        return business;

    }

    //if user logged in then this api will work
    if(query.userId && (query.role === "Seller" || query.role === "Broker" || query.role === "Asset Seller" || query.role === "Francise Seller" || query.role === "Business Idea Lister" ) ){

        const userId = query.userId;
        console.log('comoing');
        
        const business = await BusinessModel.find({user: userId, isApproved: true}).sort({ views: -1 });

        if(!business) throw new ApiError(404, "No data found");
    
        return business;

    }else if(query.role === "Buyer") {

       const business = await BusinessModel.find({
            businessRole: { 
                $in: [
                    "Sellers-business",
                    "Franchise",
                    "Asset-seller",
                    "Broker-business"
                ]
            },
            isApproved: true
        }).sort( { views: -1 } );

        if(!business) throw new ApiError(404, "No data found");
                
        return business;
    } else if( query.role = "Investor"){

        const business = await BusinessModel.find({ businessRole: "Business-idea-lister", isApproved: true}).sort({ views: -1});

        if(!business) throw new ApiError(404, "No data found");

        return business;

    }
     

}

//filter business by business role service
export const filterBusinessByCategoryWithBusinessService = async () => {
    
    const categories = await BusinessModel.aggregate([
      // Group businesses by category and count them
      {
        $group: {
          _id: "$category",
          totalBusinesses: { $sum: 1 }
        }
      },
      // Join with Category collection
      {
        $lookup: {
          from: "categories", // MongoDB auto-pluralizes collection names
          localField: "_id",  // category name from business
          foreignField: "categoryName", // category name from category model
          as: "categoryInfo"
        }
      },
      // Flatten the categoryInfo array
      {
        $unwind: {
          path: "$categoryInfo",
          preserveNullAndEmptyArrays: true // in case no matching category image
        }
      },
      // Shape the output
      {
        $project: {
          _id: 0,
          category: "$_id",
          totalBusinesses: 1,
          categoryImage: "$categoryInfo.categoryImage"
        }
      },
      // Sort by totalBusinesses (descending)
      {
        $sort: { totalBusinesses: -1 }
      }
    ]);


    return categories;
}

//marked your business as sold service
export const markedBusinessSoldService = async (query) => {
    const { businessId, isSold } = query;
    if(!businessId) throw new ApiError(400, "business id is required to mark your business as sold");

    //find business and update isSold
    const business = await BusinessModel.findByIdAndUpdate(businessId,{isSold: isSold},{new: true}).select('isSold');

    if(!business) throw new ApiError(500, "Failed to update business as sold");

    return business;
}

//featured business in home page
export const featuredBusinessService = async (query) => {
    const {businessRole} = query;
    if(!businessRole) throw new ApiError(400, "businessRole is required");

    const businessesWithMaxPricePlan = await BusinessModel.aggregate([
        // Step 1: Join Business with User
        {
             $match:{
                businessRole: businessRole,
                isApproved:true
            }
        },

        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "userData"
            }
        },
        { $unwind: "$userData" },

        // 2️⃣ Join with subscription plans
        {
            $lookup: {
            from: "subscriptionplans",
            localField: "userData.subscriptionPlan",
            foreignField: "_id",
            as: "planData"
            }
        },
        { $unwind: "$planData" },

        // 3️⃣ Find max price for each role
        {
            $lookup: {
            from: "subscriptionplans",
            let: { role: "$planData.subscriptionPlanRole" },
            pipeline: [
                { $match: { $expr: { $eq: ["$subscriptionPlanRole", "$$role"] } } },
                { $group: { _id: null, maxPrice: { $max: "$price" } } }
            ],
            as: "maxPriceData"
            }
        },
        { $unwind: "$maxPriceData" },

        // 4️⃣ Keep only businesses where user's plan price == max price for their role
        {
            $match: {
                $expr: { $eq: ["$planData.price", "$maxPriceData.maxPrice"] }
            }
        },

        // 5️⃣ Project only business details + subscriptionPlanName
        {
            $project: {
            _id: 1,
            title: 1,
            image: 1,
            category: 1,
            country: 1,
            location: 1,
            askingPrice: 1,
            businessRole: 1,
            createdAt: 1,
            subscriptionPlanPrice: "$userData.subscriptionPlanPrice",
            planPrice: "$planData.price"
            }
        }
    ]);

    return businessesWithMaxPricePlan;
}