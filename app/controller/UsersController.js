export const Registration=async(req,res)=>{
    return res.status(200).json({status:"success","Message":"Registration"})
}

export const Login=async(req,res)=>{
    return res.status(200).json({status:"success","Message":"Login"})
}


export const ProfileDetails=async(req,res)=>{
    return res.status(200).json({status:"success","Message":"ProfileDetails"})
}

export const ProfileUpdate=async(req,res)=>{
    return res.status(200).json({status:"success","Message":"ProfileUpdate"})
}

export const EmailVerify=async(req,res)=>{
    return res.status(200).json({status:"success","Message":"EmailVerify"})
}

export const CodeVerify=async(req,res)=>{
    return res.status(200).json({status:"success","Message":"CodeVerify"})
}

export const ResetPassword=async(req,res)=>{
    return res.status(200).json({status:"success","Message":"ResetPassword"})
}