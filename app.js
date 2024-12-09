import express from 'express';
import mongoose from 'mongoose';
import Item from './models/item.js'; 

const app = express();
const port = 3001;

app.use(express.json());

const uri = 'mongodb+srv://finalproject:Vasumehta@projectcluster.cgng7.mongodb.net/?retryWrites=true&w=majority&appName=projectcluster';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection failed', err);
  });

// Define a route to create new items
app.post('/items', async (req, res) => {
  const { name, description, price, quantity, category } = req.body;

  try {
    // Create a new item
    const newItem = new Item({ name, description, price, quantity, category });
    await newItem.save();

    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error, could not create item, try again' });
  }
});

// Example of getting all items
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error, no items fetched, try again' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running- on ${port}`);
});
