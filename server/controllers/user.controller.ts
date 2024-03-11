import path from 'path'
require('dotenv').config({path:path.resolve(__dirname, '.env')})
import { Request,Response,NextFunction } from "express";
import userModel from '../models/user.model'
import {ErrorHandler} from '../utils/ErrorHandler'
import {catchAsyncError} from '../middleware/catchAsyncError'
import jwt, { Secret } from 'jsonwebtoken'
import ejs from 'ejs'
interface IRegistrationBody{
    name:string,
    email:string,
    password:string,
    avatar?:string,
}

export const registration = catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {name,email,password} = req.body
        const isEmailExist = await userModel.findOne({email})
        if(isEmailExist){
            return next(new ErrorHandler("email already exist",400))
        }
        const user:IRegistrationBody = {
            name,
            email,
            password
        }
        const activationToken = createActivationToken(user)

        const activationCode = activationToken.activationCode;

        const data = {user:{name:user.name},activationCode}
        const html = ejs.renderFile(path.join(__dirname,"../mails/activation-mail.ejs"),data)

        try {
            
        } catch (error) {
            
        }

    } catch (error:any) {
        return next(new ErrorHandler(error.message,400))
    }
})

interface IActivationToken{
    token:string,
    activationCode:string
}

export const createActivationToken = (user:any):IActivationToken=>{
    const activationCode = Math.floor(1000+Math.random()*9000).toString()
    const token = jwt.sign({user,activationCode},process.env.A as Secret,{expiresIn:"5m"})
    return {token,activationCode}
}