// // https://mongoosejs.com/
// const mongoose = require("mongoose");

// const { Schema } = mongoose;

// const EmployeeSchema = new Schema({
//   name: String,
//   level: String,
//   position: String,
//   // equipment: String,
//   equipment: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Equipments",
//   },
//   present: {
//     type: Boolean,
//     default: false,
//   },
//   // // onDate: {
//   // //   type: Date,
//   // // },
//   created: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model("Employee", EmployeeSchema);


// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  // equipments: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Equipments",
  // }],
  equipment: String,
  present: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
