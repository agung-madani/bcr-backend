import { Knex } from "knex";
import * as fs from "fs";
import * as path from "path";

// Define the new path to the JSON file
const carsDataPath = path.join(__dirname, "..", "cars.min.json");

export async function seed(knex: Knex): Promise<void> {
  // Read the JSON file
  const carsData: any[] = JSON.parse(fs.readFileSync(carsDataPath, "utf-8"));

  // Modify data to add new column withDriver
  const modifiedCarsData = carsData.map((car) => ({
    ...car,
    withDriver: Math.random() < 0.5 ? true : false,
    available: Math.random() < 0.6 ? true : false,
    availableAt: new Date(
      new Date().getTime() + Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 7)
    ).toISOString(),
  }));

  // Deletes ALL existing entries
  await knex("cars").del();

  // Inserts seed entries
  await knex("cars").insert(modifiedCarsData);
}
