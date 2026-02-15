import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("location_geometries").del();

    await knex("location_geometries").insert([
        {
            name: "Maadi",
            geometry: knex.raw(
                "ST_PolyFromText(?, 4326, 'axis-order=long-lat')",
                ["POLYGON((31.2349785 29.9741597, 31.2326181 29.9730444, 31.2639463 29.9464601, 31.2868631 29.9590653, 31.2637317 29.9811484, 31.2349785 29.9741597))"]
            )
        },
        {
            name: "Gouna",
            geometry: knex.raw(
                "ST_PolyFromText(?, 4326, 'axis-order=long-lat')",
                ["POLYGON((33.6032517 27.4392737, 33.6485703 27.3463014, 33.7139733 27.3626153, 33.6597283 27.4548122, 33.6032517 27.4392737))"]
            )
        }
    ]);
}
