import { CarsModel } from "../models/carsModel";

class CarsRepository {
  static async create(carData: any) {
    return await CarsModel.query().insert(carData);
  }

  static async findAll() {
    return await CarsModel.query();
  }

  static async findById(id: string) {
    return await CarsModel.query().findById(id);
  }

  static async updateById(id: string, carData: any) {
    return await CarsModel.query().patchAndFetchById(id, carData);
  }

  static async findAllAvailable() {
    const today = new Date().toISOString();
    return await CarsModel.query().where("available", true);
  }

  static async deleteById(id: string) {
    return await CarsModel.query().deleteById(id);
  }
}
export default CarsRepository;
