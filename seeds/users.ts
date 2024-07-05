// seeds/01_users.ts
import { Knex } from "knex";
import bcrypt from "bcrypt";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  const passwordHash = await bcrypt.hash("admin", 10);

  await knex("users").insert([
    {
      username: "Agung Rashif Madani",
      email: "admin@email.com",
      password: passwordHash,
      role: "admin",
    },
  ]);
}
