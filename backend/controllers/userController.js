import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { encrypt, remember } from '../utils/crypto.js';

import { createUser, findUserByEmail, findUserById, updateUserPassord } from '../services/userService.js'


export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (await findUserByEmail(email)) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // ❌ Don't manually hash the password here, let Mongoose handle it
        const newUser = await createUser({ username, email, password });

        const token = encrypt({ id: newUser._id })


        res.status(200).json({ success: true, message: "User registered successfully", user: newUser, token: token });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


export const loginUser = async (req, res) => {
    try {
        const { email, password,rememberMe  } = req.body;

        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match result:", isMatch);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        const token = remember({ id: user._id, email: user.email }, rememberMe )

        res.status(200).json({ success: true, token, message: "Login successful", });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const user = await findUserById(req.user.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        res.status(200).json({ success: true, user })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" })

    }

}


export const logoutUser = (req, res) => {
    res.status(200).json({ success: true, message: "Logout successfully" })
}