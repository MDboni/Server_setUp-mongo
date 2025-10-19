import mongoose from "mongoose";

const update = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true }
})

const UpdateModel = mongoose.model('model', update)
export default UpdateModel 