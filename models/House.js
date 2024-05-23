const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const houseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true }
  },
  price: { type: Number, required: true },
  description: { type: String }
}, { timestamps: true });

const House = mongoose.model('House', houseSchema);
module.exports = House;
