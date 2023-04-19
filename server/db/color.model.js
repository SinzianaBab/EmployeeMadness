// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const favColorSchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Colors", favColorSchema);
