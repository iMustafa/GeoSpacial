SELECT 
    p.id, 
    p.title, 
    p.price, 
    ST_AsText(pl.location) as location_wkt
FROM properties p
JOIN property_locations pl ON p.id = pl.property_id
WHERE ST_Contains(
    (SELECT geometry FROM location_geometries WHERE name = 'Maadi' LIMIT 1),
    pl.location
);