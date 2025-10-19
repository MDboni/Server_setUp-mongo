import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
    name: { type: String, required: true },
  email: { type: String, required: true }
})

const RegiModel = mongoose.model('regi', registrationSchema)
export default RegiModel