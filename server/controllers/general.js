import User from "../models/User.js";

// req = Request paramters and body 
// res = Send back information to front-end or whoever called API
export const getUser = async(req, res) => {
    try{
        // Will locate user based on received parameters (ID)
        const { id } = req.params;  // Comes from front-end
        const user = await User.findById(id);
        res.status(200).json(user); // Sends user information to front-end, otherwise, produce error message

    }catch(error){
        res.status(404).json({message: error.message})
    }
};