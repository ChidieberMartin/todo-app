import UserModel from "../model/userModel.js";
import bcrypt from "bcryptjs";

export const createUser = async (userData) => {
    const {username,email,password} = userData;

    const user = await UserModel.create({
        username,
        email,
        password
    })

    return user
}


export const findUserByEmail = async (email) => {
    return await UserModel.findOne({email});
}

export const findUserById = async (id) => {
    return await UserModel.findById(id);
}

export const updateUserPassord = async (userId,newPassword) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword,salt);

    return await UserModel.findByIdAndUpdate(userId,{password:hashedPassword},{new:true})
}


