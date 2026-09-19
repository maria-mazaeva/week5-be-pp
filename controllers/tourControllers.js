const Tour = require("../models/tourModel");
const mongoose = require("mongoose");

const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find({}).sort({createdAt:-1});
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({message: "Failed to retrieve tours"})
  };
};

const createTour = async (req, res) =>{
  try{
  const newTour = Tour.create({...req.body});
  res.status(200).json(newTour);
  } catch (error) {
    res.status(400).json({message:"Failed to add new tour"})
  };
}

const getTourById = async (req, res) => {
  
  const {tourId} = req.params;
  if (!mongoose.Types.ObjectId.isValid(tourId)){
    return res.status(400).json({message: "Failed to find tour, invalid ID"})
  };
    
  try {
    const tour = await Tour.findById(tourId);
    if (tour) {
      res.status(200).json(tour);
    } else {
      res.status(404).json({message: "Tour not found"});
    }
  } catch (error) {
    res.status(500).json({message: "Failed to retrieve tour"})
  };
}

const updateTour = async (req,res) =>{
  const {tourId} = req.params;
  if (!mongoose.Types.ObjectId.isValid(tourId)){
    return res.status(400).json({message: "Failed to find tour, invalid ID"})
  };

  try{
    const updatedTour = await Tour.findByIdAndUpdate(
      tourId,
      {...req.body},
      {new: true}
    );
    if (updatedTour) { 
      res.status(200).json(updatedTour);
    } else {
      res.status(404).json({message:"Tour not found"});
    }
  

  } catch (error){
    res.status(500).json({ message: "Failed to update tour" });
  }
}

const deleteTour = async (req, res) =>{
  const {tourId} = req.params;

  if (!mongoose.Types.ObjectId.isValid(tourId)){
    return res.status(400).json({message: "Failed to find tour, invalid ID"})
  };

  try {
    const delitedTour = await Tour.findByIdAndDelete({_id: tourId})
    if (delitedTour) {
      res.status(200).json({ message: "Tour deleted successfully" });
    } else {
      res.status(404).json({ message: "Tour not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete tour" });
  }

}


module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};

