import jwt from 'jsonwebtoken';

export const encrypt = (data) => {
    const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "6h" });
    return token;
}

export const dcrypt = (token) => {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    return data;
}

export const remember = (data, willExpire = true,res) => {
    const expiresIn = willExpire ? { expiresIn: "30d" } : null;
    const token = jwt.sign(data, process.env.JWT_SECRET, expiresIn);


    // Set the token as a cookie
    const cookieOptions = {
        httpOnly: true, // Helps prevent XSS attacks
        secure: process.env.NODE_ENV === 'production', // Only set cookies over HTTPS in production
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days expiration (in ms)
        sameSite: 'Strict', // Adjust based on your needs
    };

    res.cookie('token', token, cookieOptions);
    return token;

}
