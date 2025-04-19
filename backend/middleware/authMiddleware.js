import jwt from 'jsonwebtoken';
import UserModel from '../model/userModel.js';
import { dcrypt } from '../utils/crypto.js';

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            //verify token
            // const decoded = jwt.verify(token,process.env.JWT_SECRET);
            const decoded = dcrypt(token)
            req.user = await UserModel.findById(decoded.id).select("-password")

            next();
        } catch (error) {
            res.status(401).json({ success: false, message: "Not authorized" })
        }
    } else {
        res.status(401).json({ success: false, message: "Not authorized ,no token" })
    }
}

