import { UserOTPService } from "../services/UserServices.js"


export const UserOTP = async (req, res) => {
  try {
    const email = req.params.email;
    const result = await UserOTPService(email);
    return res.status(200).json(result);  
  } catch (e) {
    console.error("UserOTP Error:", e.message);
    return res.status(500).json({ status: "fail", message: e.message });
  }
}