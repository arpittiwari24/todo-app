import bcrypt from "bcrypt"
import { User } from "../models/user.js"
import { setCookie } from "../utils/features.js"


export const getAllUsers = async (req,res) => {

}




export const login = async (req,res) => {
    const {email, password} = req.body

    let user = await User.findOne({email}).select("+password")

    if(!user) return res.status(404).json({
        success: false, 
        message:"invalid email or password"
    });

    const isMatch = bcrypt.compare(password,user.password)

    if(!isMatch) return res.status(404).json({
        success: false, 
        message:"invalid email or password"
    });

    setCookie(user,res,`Welcome back ${user.name}`,200)
 
}




export const register = async (req,res) => {
    const {name,email,password} = req.body

     let user = await User.findOne({email})

    if(user) return res.status(404).json({
        success: false, 
        message:"User already exists"
    });

    const hashedpassword = bcrypt.hash(password,10)

    user = await User.create({name,email,password: hashedpassword})

    setCookie(user,res,"registered successfully",201)
}




export const getMyProfile = (req,res) => {

    res.status(200).json({
        success: true,
        user:req.user,
    })
}


export const logout = (req,res) => {
    
    res.status(200).cookie("token","",{expires:new Date(Date.now())}).json({
        success: true,
        user:req.user,
    })
}

