// models/InventoryItem.js

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const InventoryItemSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const InventoryItem = model('InventoryItem', InventoryItemSchema);

export default InventoryItem;
