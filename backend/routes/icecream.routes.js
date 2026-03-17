const express = require('express');
const router = express.Router();
const IceCream = require('../models/icecream');

// Create a new Ice Cream
router.post('/', async (req, res) => {
  try {
    const newIceCream = new IceCream(req.body);
    const savedIceCream = await newIceCream.save();
    res.status(201).json(savedIceCream);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read all Ice Creams
router.get('/', async (req, res) => {
  try {
    const iceCreams = await IceCream.find();
    res.json(iceCreams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read single Ice Cream by ID
router.get('/:id', async (req, res) => {
  try {
    const iceCream = await IceCream.findById(req.params.id);
    if (!iceCream) return res.status(404).json({ message: 'Ice Cream not found' });
    res.json(iceCream);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an Ice Cream
router.put('/:id', async (req, res) => {
  try {
    const updatedIceCream = await IceCream.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedIceCream) return res.status(404).json({ message: 'Ice Cream not found' });
    res.json(updatedIceCream);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an Ice Cream
router.delete('/:id', async (req, res) => {
  try {
    const deletedIceCream = await IceCream.findByIdAndDelete(req.params.id);
    if (!deletedIceCream) return res.status(404).json({ message: 'Ice Cream not found' });
    res.json({ message: 'Ice Cream deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
