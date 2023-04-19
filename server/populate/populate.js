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
const BrandsModel = require("../db/brand.model");
const brands = require("./favBrands.json");
const colors = require("./colors.json");
const ColorsModel = require ("../db/color.model")

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];


const populateEquipments = async () => {
  await EquipmentModel.deleteMany({});
  const equipments = equipmentsName.map((name) => ({
    name: name,
    type: pick(equipmentsType),
    amount: pick(equipmentsAmount),
  }));
  await EquipmentModel.create(...equipments);
  console.log("Equipments created");
};

const populateBrands = async () => {
  await BrandsModel.deleteMany({});
  const favs = brands.map((name) => ({
    name: name,
  }));
  await BrandsModel.create(...favs);
  console.log("Brands created");
};

const populateColors = async () => {
  await ColorsModel.deleteMany({});
  const favColors = colors.map((name) => ({
    name: name,
  }));
  await ColorsModel.create(...favColors);
  console.log("Colors created");
};

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});
  const equipments = await EquipmentModel.find();
  const favBrands = await BrandsModel.find();
  const favColors = await ColorsModel.find();
  const employees = names.map((name) => {

    return {
      name,
      level: pick(levels),
      position: pick(positions),
      equipment: pick(equipments),
      brand: pick(favBrands),
      color: pick(favColors)
    };
  });

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};



const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEquipments();
  await populateBrands();
   await populateColors();
  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
