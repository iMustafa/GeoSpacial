import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    // 1. Create properties table (Merged)
    await knex.schema.createTable("properties", (table) => {
        table.increments("id").primary();
        table.string("title").notNullable();
        table.string("description").notNullable();
        table.decimal("price", 10, 2);

        table.specificType("location", "POINT NOT NULL SRID 4326");
        table.index("location", "idx_properties_location", "SPATIAL");

        table.timestamps(true, true);

        // Strategic fields
        table.string("type").notNullable().defaultTo("apartment"); // e.g., apartment, villa
        table.decimal("area", 10, 2).notNullable(); // in sq meters
        table.integer("bedrooms").notNullable();
        table.integer("bathrooms").notNullable();
    });

    // 2. Keep Regions separate (This is correct!)
    // A property can be inside many regions (Neighborhood, City, State), 
    await knex.schema.createTable("location_geometries", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.specificType("geometry", "POLYGON NOT NULL SRID 4326");
        table.index("geometry", "idx_location_geometry_spatial", "SPATIAL");
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("location_geometries");
    await knex.schema.dropTableIfExists("properties");
}
