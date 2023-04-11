// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const EquipmentSchema = new Schema(
  {
    name: String,
    type: String,
    amount: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Equipments", EquipmentSchema);
