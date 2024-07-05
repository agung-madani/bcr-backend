import { Model, ModelObject } from "objection";

export class UsersModel extends Model {
  static tableName = "users";

  id!: string;
  username!: string;
  email!: string;
  password!: string;
  role!: "admin" | "member";

  static get idColumn() {
    return "id";
  }
}

export type Users = ModelObject<UsersModel>;
