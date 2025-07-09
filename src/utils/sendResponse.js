

export default function sendResponse(res,data){
    const responseData = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message,
        meta: data.meta || null,
        data: data.data || null,
        activationToken: data.activationToken || null

    }

    //IF ACTIVATIONtoken is null then remove it from response data object
    if(responseData.activationToken === null){
        delete responseData.activationToken
    }

    res.status(data.statusCode).json(responseData);

}