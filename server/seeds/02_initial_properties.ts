import { Knex } from "knex";

function isPointInPolygon(point: [number, number], polygon: number[][]): boolean {
    const x = point[0], y = point[1];
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i][0], yi = polygon[i][1];
        const xj = polygon[j][0], yj = polygon[j][1];

        const intersect = ((yi > y) !== (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

function generateRandomPoint(polygon: number[][]): [number, number] {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    polygon.forEach(p => {
        minX = Math.min(minX, p[0]);
        maxX = Math.max(maxX, p[0]);
        minY = Math.min(minY, p[1]);
        maxY = Math.max(maxY, p[1]);
    });

    while (true) {
        const x = minX + Math.random() * (maxX - minX);
        const y = minY + Math.random() * (maxY - minY);
        if (isPointInPolygon([x, y], polygon)) {
            return [x, y];
        }
    }
}

const PROPERTY_TYPES = ["apartment", "villa", "penthouse", "studio"];

export async function seed(knex: Knex): Promise<void> {
    await knex("properties").del();

    const locations = await knex("location_geometries")
        .select("id", "name", knex.raw("ST_AsGeoJSON(geometry) as geometry_json"));

    const propertiesToInsert: any[] = [];

    for (const location of locations) {
        const geoJson = typeof location.geometry_json === 'string'
            ? JSON.parse(location.geometry_json)
            : location.geometry_json;
        if (!geoJson || geoJson.type !== 'Polygon' || !geoJson.coordinates || !geoJson.coordinates[0]) {
            console.warn(`Skipping location ${location.name}: Invalid or unsupported geometry.`);
            continue;
        }

        const polygonCoords = geoJson.coordinates[0];

        for (let i = 0; i < 25; i++) {
            const [lng, lat] = generateRandomPoint(polygonCoords);
            const type = PROPERTY_TYPES[Math.floor(Math.random() * PROPERTY_TYPES.length)];
            const bedrooms = Math.floor(Math.random() * 5) + 1;
            const bathrooms = Math.max(1, Math.floor(bedrooms * 0.7) + (Math.random() > 0.5 ? 1 : 0));
            const area = 50 + Math.floor(Math.random() * 450);

            let basePrice = area * 5000;
            if (type === 'villa') basePrice *= 1.5;
            const price = Math.floor(basePrice * (0.8 + Math.random() * 0.4));

            propertiesToInsert.push({
                title: `${type.charAt(0).toUpperCase() + type.slice(1)} in ${location.name} #${i + 1}`,
                description: `A beautiful ${bedrooms} bedroom ${type} located in ${location.name}. Features ${bathrooms} bathrooms and a spacious area of ${area}m².`,
                price: price,
                type: type,
                area: area,
                bedrooms: bedrooms,
                bathrooms: bathrooms,
                location: knex.raw(
                    "ST_GeomFromText(?, 4326, 'axis-order=long-lat')",
                    [`POINT(${lng} ${lat})`]
                )
            });
        }
    }

    if (propertiesToInsert.length > 0) {
        await knex("properties").insert(propertiesToInsert);
        console.log(`Seeded ${propertiesToInsert.length} properties.`);
    }
}
