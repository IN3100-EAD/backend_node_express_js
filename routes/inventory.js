import express from 'express';
import InventoryItem from '../models/InventoryItem.js';

const router = express.Router();

// Create a new inventory item
router.post('api/items', async (req, res) => {
    try {
      console.log('POST /items route accessed');
      const newItem = new InventoryItem(req.body);
      await newItem.save();
      res.status(201).json(newItem);
    } catch (error) {
      console.error('Error in POST /items:', error);
      if (error.name === 'MongoError' && error.code === 11000) {
        res.status(400).json({ error: 'ItemID must be unique.' });
      } else {
        res.status(400).json({ error: 'Failed to create an inventory item.' });
      }
    }
  });
  

// Get all inventory items
router.get('api/items', async (req, res) => {
  try {
    const items = await InventoryItem.find();
    res.status(200).json(items);
    console.log('Front end connected to back end: Retrieved all inventory items');
  } catch (error) {
    res.status(400).json({ error: 'Failed to retrieve inventory items.' });
  }
});

// Get a single inventory item by ID
router.get('api/items/:id', async (req, res) => {
  try {
    const item = await InventoryItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Inventory item not found.' });
    }
    res.status(200).json(item);
    console.log('Front end connected to back end: Retrieved a single inventory item by ID');
  } catch (error) {
    res.status(400).json({ error: 'Failed to retrieve the inventory item.' });
  }
});

// Update an inventory item by ID
router.put('api/items/:id', async (req, res) => {
  try {
    const updatedItem = await InventoryItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ error: 'Inventory item not found.' });
    }
    res.status(200).json(updatedItem);
    console.log('Front end connected to back end: Updated an inventory item by ID');
  } catch (error) {
    res.status(400).json({ error: 'Failed to update the inventory item.' });
  }
});

// Delete an inventory item by ID
router.delete('api/items/:id', async (req, res) => {
  try {
    const deletedItem = await InventoryItem.findByIdAndRemove(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Inventory item not found.' });
    }
    res.status(204).send();
    console.log('Front end connected to back end: Deleted an inventory item by ID');
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete the inventory item.' });
  }
});

export default router;
