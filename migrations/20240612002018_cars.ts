import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  return knex.schema.createTable("cars", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    table.string("plate").notNullable();
    table.string("manufacture").notNullable();
    table.string("model").notNullable();
    table.string("image").nullable();
    table.integer("rentPerDay").notNullable();
    table.integer("capacity").notNullable();
    table.text("description").notNullable();
    table.timestamp("availableAt").nullable();
    table.string("transmission").notNullable();
    table.boolean("available").notNullable();
    table.string("type").notNullable();
    table.integer("year").notNullable();
    table.specificType("options", "text[]").notNullable();
    table.specificType("specs", "text[]").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("cars");
}
