import UserModel from "../model/UserModel.js";
import SendEmail from "../utility/emailUtility.js";

export const UserOTPService = async (email) => {
  if (!email) {
    return { status: "fail", message: "Email is required" };
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  const EmailText = `Your Verification Code is: ${otp}`;
  const EmailSubject = "Email Verification";

  const emailResult = await SendEmail(email, EmailText, EmailSubject);
  if (!emailResult.success) {
    return { status: "fail", message: "Failed to send OTP email" };
  }

  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
  await UserModel.updateOne({ email }, { $set: { otp, otpExpiry } }, { upsert: true });

  return { status: "success", message: "6-digit OTP has been sent" };
};
