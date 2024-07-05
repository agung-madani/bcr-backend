import { checkPrime } from "crypto";
import CarsRepository from "../repositories/carsRepository";

class CarsService {
  static async createCar(
    plate: string,
    manufacture: string,
    model: string,
    image: string,
    rentPerDay: number,
    capacity: number,
    description: string,
    availableAt: Date,
    transmission: string,
    available: boolean,
    type: string,
    year: number,
    options: string[],
    specs: string[],
    withDriver: boolean
  ) {
    const car = await CarsRepository.create({
      plate,
      manufacture,
      model,
      image,
      rentPerDay,
      capacity,
      description,
      availableAt: new Date(availableAt),
      transmission,
      available,
      type,
      year,
      options,
      specs,
      withDriver,
    });
    return { status: 201 };
  }

  static async getCars() {
    const cars = await CarsRepository.findAll();
    return cars;
  }

  static async getCarById(id: string) {
    const car = await CarsRepository.findById(id);
    return car;
  }

  static async updateCar(
    id: string,
    plate: string,
    manufacture: string,
    model: string,
    image: string,
    rentPerDay: number,
    capacity: number,
    description: string,
    availableAt: Date,
    transmission: string,
    available: boolean,
    type: string,
    year: number,
    options: string[],
    specs: string[],
    withDriver: boolean
  ) {
    const updatedCar = await CarsRepository.updateById(id, {
      plate,
      manufacture,
      model,
      image,
      rentPerDay,
      capacity,
      description,
      availableAt: new Date(availableAt),
      transmission,
      available,
      type,
      year,
      options,
      specs,
      withDriver,
    });
    return { status: 200 };
  }

  static async getAvailableCars() {
    const cars = await CarsRepository.findAllAvailable();
    return cars;
  }

  static async deleteCarById(id: string) {
    const car = await CarsRepository.deleteById(id);
    return car;
  }
}

export default CarsService;
