const mongoose = require('mongoose');

const CropSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  area: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Crop', CropSchema); 