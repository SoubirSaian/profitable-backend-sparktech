



//user profile update service
export const userProfileUpdateService = async (payload) => {
    const {image, name, email,number, profession, location, description} = payload;

    //need user email id to find out user in db

    //then findout user by email and update all the necessary fields
    //const user = await UserModel.findOne({email});

    //if(image)  user.image = image;
    //if(description) user.description = description;
    // await user.save();

}