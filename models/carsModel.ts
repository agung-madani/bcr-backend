import { Model, ModelObject } from "objection";

export class CarsModel extends Model {
  static tableName = "cars";

  id!: string;
  plate!: string;
  manufacture!: string;
  model!: string;
  image!: string;
  rentPerDay!: number;
  capacity!: number;
  description!: string;
  availableAt!: Date;
  transmission!: string;
  available!: boolean;
  type!: string;
  year!: number;
  options!: string[];
  specs!: string[];
  withDriver!: boolean;

  static get idColumn() {
    return "id";
  }
}

export type Cars = ModelObject<CarsModel>;
