import UpdateModel from "../model/UpdateModl.js"

export const update = async(req ,res) =>{
    const data = req.body 

    const user = await UpdateModel.create(data)
    res.send(user)

}