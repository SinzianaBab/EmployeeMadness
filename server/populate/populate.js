/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const equipmentsAmount = require("./equipmentAmount.json");
const equipmentsName = require("./equipmentName.json");
const equipmentsType = require("./equipmentType.json");
const EmployeeModel = require("../db/employee.model");
const EquipmentModel = require("../db/equipment.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

// const populateEmployees = async () => {
//   await EmployeeModel.deleteMany({});
//   const equipments = await EquipmentModel.find();

//   const employees = names.map((name) => {
//     // const employeeEquipments = equipments
//     //   .sort(() => 0.5 - Math.random())
//     //   .slice(0, Math.floor(Math.random() * equipments.length))
//     //   .map((equipment)=> equipment.name);
//     return {
//       name,
//       level: pick(levels),
//       position: pick(positions),
//       equipments: pick(equipmentsName),
//     };
//   });

//   await EmployeeModel.create(...employees);
//   console.log("Employees created");
// };

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});
  const equipments = await EquipmentModel.find();

  const employees = names.map((name) => {
    const employeeEquipments = equipments
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * equipments.length))
      .map((equipment) => equipment._id); // use the equipment id

    return {
      name,
      level: pick(levels),
      position: pick(positions),
      equipment: pick(equipmentsName), // use the equipment ids array
    };
  });

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};




const populateEquipments = async () => {
  await EquipmentModel.deleteMany({});
  const equipments = equipmentsAmount.map(() => ({
    name: pick(equipmentsName),
    type: pick(equipmentsType),
    amount: pick(equipmentsAmount),
  }));
  await EquipmentModel.create(...equipments);
  console.log("Equipments created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEmployees();
  await populateEquipments();
// await populateEmployeesWithEquipments();
  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
