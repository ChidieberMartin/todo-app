import crypto from "crypto";
import UserModel from "../model/userModel.js";
import { sendEmail } from "../utils/sendEmail.js";

// ✅ Request Password Reset (Send Email)
export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    // Generate reset token
    const resetToken = user.getResetPasswordToken();
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    console.log("reset1", resetUrl)

    try {
        console.log("reset2", resetUrl)
        await sendEmail(user.email, "Password Reset", `Click the link to reset your password: ${resetUrl}`);
        res.status(200).json({ success: true, message: "Reset password link sent to your email." });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        res.status(500).json({ success: false, message: "Email could not be sent" });
    }
};

// ✅ Reset Password (Using Token)
export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    console.log("Hashed token from URL:", hashedToken);
    const user = await UserModel.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() },
    });
    console.log("user", user)

    if (!user) {
        return res.status(400).json({ success: false, message: "Invalid or expired token" });
    }

    // Update password
    user.password = newPassword; // Don't hash here
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save(); 


    res.status(200).json({ success: true, message: "Password reset successfully" });
};
