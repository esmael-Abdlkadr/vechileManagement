import mongoose from "mongoose";
import { Vehicle } from "./src/model/vichle";
import dotenv from "dotenv";
dotenv.config();
const vehicles = [
  [
    {
      name: "Toyota Corolla",
      status: "active",
      licensePlate: "AA 1234",
      model: "Corolla",
      make: "Toyota",
      year: 2015,
      mileage: 120000,
      fuelType: "Gasoline",
      vehicleModel: "Sedan",
    },
    {
      name: "Hyundai Elantra",
      status: "inactive",
      licensePlate: "AM 5678",
      model: "Elantra",
      make: "Hyundai",
      year: 2018,
      mileage: 85000,
      fuelType: "Diesel",
      vehicleModel: "Sedan",
    },
    {
      name: "Honda Civic",
      status: "active",
      licensePlate: "AA 9101",
      model: "Civic",
      make: "Honda",
      year: 2017,
      mileage: 90000,
      fuelType: "Gasoline",
      vehicleModel: "Sedan",
    },
    {
      name: "Ford Ranger",
      status: "active",
      licensePlate: "AD 1122",
      model: "Ranger",
      make: "Ford",
      year: 2016,
      mileage: 110000,
      fuelType: "Diesel",
      vehicleModel: "Pickup",
    },
    {
      name: "Mazda CX-5",
      status: "inactive",
      licensePlate: "AB 3456",
      model: "CX-5",
      make: "Mazda",
      year: 2020,
      mileage: 30000,
      fuelType: "Gasoline",
      vehicleModel: "SUV",
    },
    {
      name: "Nissan X-Trail",
      status: "active",
      licensePlate: "AC 7890",
      model: "X-Trail",
      make: "Nissan",
      year: 2019,
      mileage: 60000,
      fuelType: "Gasoline",
      vehicleModel: "SUV",
    },
    {
      name: "Mitsubishi L200",
      status: "inactive",
      licensePlate: "AE 1234",
      model: "L200",
      make: "Mitsubishi",
      year: 2014,
      mileage: 150000,
      fuelType: "Diesel",
      vehicleModel: "Pickup",
    },
    {
      name: "BMW 320i",
      status: "active",
      licensePlate: "AB 5678",
      model: "320i",
      make: "BMW",
      year: 2016,
      mileage: 80000,
      fuelType: "Gasoline",
      vehicleModel: "Sedan",
    },
    {
      name: "Mercedes-Benz C-Class",
      status: "inactive",
      licensePlate: "AD 9101",
      model: "C-Class",
      make: "Mercedes-Benz",
      year: 2018,
      mileage: 40000,
      fuelType: "Diesel",
      vehicleModel: "Sedan",
    },
    {
      name: "Kia Sportage",
      status: "active",
      licensePlate: "AC 1122",
      model: "Sportage",
      make: "Kia",
      year: 2017,
      mileage: 95000,
      fuelType: "Gasoline",
      vehicleModel: "SUV",
    },
    {
      name: "Chevrolet Trailblazer",
      status: "active",
      licensePlate: "AA 3344",
      model: "Trailblazer",
      make: "Chevrolet",
      year: 2016,
      mileage: 125000,
      fuelType: "Gasoline",
      vehicleModel: "SUV",
    },
    {
      name: "Subaru Outback",
      status: "inactive",
      licensePlate: "AB 7788",
      model: "Outback",
      make: "Subaru",
      year: 2019,
      mileage: 55000,
      fuelType: "Gasoline",
      vehicleModel: "SUV",
    },
    {
      name: "Land Rover Defender",
      status: "active",
      licensePlate: "AE 3344",
      model: "Defender",
      make: "Land Rover",
      year: 2020,
      mileage: 15000,
      fuelType: "Diesel",
      vehicleModel: "SUV",
    },
    {
      name: "Toyota Hilux",
      status: "inactive",
      licensePlate: "AF 6677",
      model: "Hilux",
      make: "Toyota",
      year: 2018,
      mileage: 70000,
      fuelType: "Diesel",
      vehicleModel: "Pickup",
    },
    {
      name: "Audi A4",
      status: "active",
      licensePlate: "AA 5566",
      model: "A4",
      make: "Audi",
      year: 2015,
      mileage: 100000,
      fuelType: "Gasoline",
      vehicleModel: "Sedan",
    },
  ],
];

const connectDB = async () => {
  try {
    mongoose
      .connect(process.env.MONGO_URI as string)
      .then(() => {
        console.log("DB connected");
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Insert vehicles into the collection
    await Vehicle.insertMany(vehicles);
    console.log("Vehicles data added successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const run = async () => {
  await connectDB();
  await seedData();
};

run();
