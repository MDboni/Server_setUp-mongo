export const CreateTask=async(req,res)=>{
    return res.status(200).json({status:"success","Message":"CreateTask"})
}

export const UpdateTaskStatus=async(req,res)=>{
    return res.status(200).json({status:"success","Message":"UpdateTaskStatus"})
}

export const TaskListByStatus=async(req,res)=>{
    return res.status(200).json({status:"success","Message":"TaskListByStatus"})
}

export const DeleteTask=async(req,res)=>{
    return res.status(200).json({status:"success","Message":"DeleteTask"})
}

export const CountTask=async(req,res)=>{
    return res.status(200).json({status:"success","Message":"CountTask"})
}