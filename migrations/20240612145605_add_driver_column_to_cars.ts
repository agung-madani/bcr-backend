import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("cars", (table) => {
    table.boolean("withDriver").notNullable().defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("cars", (table) => {
    table.dropColumn("withDriver");
  });
}
