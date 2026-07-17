import joi from "joi";

//login validation 
export const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
})

export const addUserSchema = joi.object({
    name: joi.string().min(2).max(100).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
})

export const createParcelSchema = joi.object({
    senderName: joi.string().min(2).max(100).required(),
    senderPhone: joi.string().pattern(/^[0-9]{10}$/).required(),
    senderAddress: joi.string().min(5).max(200).required(),
    receiverName: joi.string().min(2).max(100).required(),
    receiverPhone: joi.string().pattern(/^[0-9]{10}$/).required(),
    receiverAddress: joi.string().min(5).max(200).required(),
    shipmentType: joi.string().valid("national", "international").required(),
    originCity: joi.string().min(2).max(100).required(),
    destinationCity: joi.string().min(2).max(100).required(),
    deliveryType: joi.string().valid("sameDay", "overnight", "standard").required(),
    parcelCategory: joi.string().valid("document",
        "electronics",
        "fragile",
        "clothing",
        "food",
        "medicine",
        "cosmetics",
        "books",
        "small_package",
        "large_package").required(),
    weight: joi.number().positive().required(),
})