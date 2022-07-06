var Token = require('../model/token');

exports.getTokens = (async (requestData, responseData) => {
    try {
        let tokens = await Token.find()
        if(!tokens){
            return responseData.json({
                success: false,
                error: 'No Tokens Found'
            })
        }
        return responseData.json({
            success: true,
            message: 'Tokens Listed Successfully',
            tokens
        })
    } catch (error) {
        return responseData.json({
            success: false,
            error: 'Something went wrong',
        })
    }
})

exports.addToken = (async (requestData, responseData) => {
    try {
        let requestDataBody = requestData.body;
        let newToken = new Token({
            ...requestDataBody
        })
        let newTokenSave = await newToken.save()
    
        if(!newTokenSave){
            return responseData.json({
                success: false,
                error: 'Add New Token Failed'
            })
        }
        return responseData.json({
            success: true,
            messageCode: 'Token Adde Succesfully'
        })
    } catch (error) {
        return responseData.json({
            success: false,
            error: 'Somthing Went Wrong'
        })
    }
})

exports.editToken = (async (requestData, responseData) => {
    try {
        let requestDataBody = requestData.body
        let editToken = await Token.findByIdAndUpdate(requestDataBody._id, requestDataBody)
        if (!editToken) {
            return responseData.json({
                success: false,
                error: 'Token Update Failed'
            })
        }
        return responseData.json({
            success: true,
            messageCode: 'Token Updated Successfully'
        })
    } catch (error) {
        return responseData.json({
            success: false,
            error: 'Somthing Went Wrong'
        })
    }
})

exports.deleteToken = (async (requestData, responseData) => {
    try {
        let requestDataBody = requestData.body
        let deleteToken = await Token.findByIdAndDelete(requestDataBody._id)
        if(!deleteToken) {
            return responseData.json({
                success: false,
                error: 'Token Deletion Failed'
            })
        }
        return responseData.json({
            success: true,
            messageCode: 'Token Deleted Successfully'
        })
    } catch (error) {
        return responseData.json({
            success: false,
            error: 'Somthing Went Wrong'
        })
    }
})