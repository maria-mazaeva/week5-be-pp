const User = require("../models/userModel");
const mongoose = require("mongoose");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({createdAt:-1});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({message: "Failed to retrieve users"})
  };
};

const createUser = async (req, res) =>{
  try{
  const newUser = await User.create({...req.body});
  res.status(201).json(newUser);

  } catch (error) {
    console.log(error);
    res.status(400).json({message:"Failed to add new user"})
  };
} 

const getUserById = async (req, res) => {
  
  const {userId} = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)){
    return res.status(400).json({message: "Failed to find user, invalid ID"})
  };
    
  try {
    const user = await User.findById(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({message: "User not found"});
    }
  } catch (error) {
    res.status(500).json({message: "Failed to retrieve user"})
  };
}

const updateUser = async (req,res) =>{
  const {userId} = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)){
    return res.status(400).json({message: "Failed to find user, invalid ID"})
  };

  try{
    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      {...req.body},
      {new: true}
    );
    if (updatedUser) { 
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({message:"User not found"});
    }
  

  } catch (error){
    res.status(500).json({ message: "Failed to update user" });
  }
} 

const deleteUser = async (req, res) =>{
  const {userId} = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)){
    return res.status(400).json({message: "Failed to find user, invalid ID"})
  };

  try {
    const delitedUser = await User.findByIdAndDelete({userId});
    if (delitedUser) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }

}


module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

