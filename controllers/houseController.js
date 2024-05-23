const House = require('../models/House');

exports.getAllHouses = async (req, res) => {
  try {
    const houses = await House.find();
    res.status(200).json(houses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching houses', error });
  }
};

exports.getHouseById = async (req, res) => {
  const { id } = req.params;
  try {
    const house = await House.findById(id);
    if (!house) {
      return res.status(404).json({ message: 'House not found' });
    }
    res.status(200).json(house);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching house', error });
  }
};

exports.createHouse = async (req, res) => {
  const { userId } = req.params;
  const newHouseData = { ...req.body, user: userId };

  try {
    const newHouse = new House(newHouseData);
    await newHouse.save();
    res.status(201).json(newHouse);
  } catch (error) {
    res.status(500).json({ message: 'Error creating house', error });
  }
};

exports.updateHouse = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedHouse = await House.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedHouse) {
      return res.status(404).json({ message: 'House not found' });
    }
    res.status(200).json(updatedHouse);
  } catch (error) {
    res.status(500).json({ message: 'Error updating house', error });
  }
};

exports.deleteHouse = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedHouse = await House.findByIdAndDelete(id);
    if (!deletedHouse) {
      return res.status(404).json({ message: 'House not found' });
    }
    res.status(200).json({ message: 'House deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting house', error });
  }
};
