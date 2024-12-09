import express from 'express';
import Item from './models/item.js'; // Import the Item model

const router = express.Router();

// Route to get all items from the database
router.get('/items', async (req, res) => {
  try {
    const items = await Item.find(); // Fetch all items
    res.status(200).json(items); // Return the items as a JSON response
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Route to add a new item to the database
router.post('/items', async (req, res) => {
  const { name, description, price, quantity, category } = req.body; // Extract the data from the request body

  if (!name || !description || !price || !quantity || !category) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newItem = new Item({
    name,
    description,
    price,
    quantity,
    category,
  });

  try {
    const savedItem = await newItem.save(); // Save the new item to the database
    res.status(201).json(savedItem); // Return the saved item as a JSON response
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
