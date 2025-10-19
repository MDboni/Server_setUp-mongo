import RegiModel from "../model/RejistrationModel.js";
import UsersModel from "../model/UsersModel.js";


// POST → /api/InsertData
export const InseartData = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Name and Email are required" });
    }

    const user = await UsersModel.create({ name, email });
    res.status(201).json({ message: "User inserted successfully", user });
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const regi = async(req,res) => {

  const bodyy =  req.body 

   const user=await RegiModel.create(bodyy) ;
   res.send(user)
    
}
