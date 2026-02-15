import React, { useMemo } from 'react';
import { Map } from '@maat/design-system';
import { Property, LocationPoint } from '@maat/api-types';
import { useUserLocation } from '@maat/hooks';

interface MapViewProps {
    properties: Property[] | undefined;
    selectedProperty: Property | undefined;
    onMarkerClick: (point: LocationPoint) => void;
    onMapMoveEnd?: (center: [number, number], zoom: number) => void;
}

export const MapView: React.FC<MapViewProps> = ({ properties, selectedProperty, onMarkerClick, onMapMoveEnd }) => {
    const { latitude, longitude, loading, error } = useUserLocation();

    const mapPoints = useMemo(() => {
        return properties?.map(p => p.location) || [];
    }, [properties]);

    const center = useMemo<[number, number]>(() => {
        const defaultCenter: [number, number] = [30.0444, 31.2357];
        if (selectedProperty) {
            return [selectedProperty.location.coordinates[1], selectedProperty.location.coordinates[0]];
        }

        if (error || loading) {
            return defaultCenter;
        }

        return [latitude, longitude];
    }, [selectedProperty, latitude, longitude, loading]);

    return (
        <div className="pmv-map-wrapper">
            <Map
                points={mapPoints}
                center={center}
                zoom={selectedProperty ? 22 : 11}
                onMarkerClick={onMarkerClick}
                selectedPoint={selectedProperty?.location}
                userLocation={(!loading && !error && latitude && longitude) ? { latitude, longitude } : undefined}
                className="pmv-map"
                onBoundsChange={onMapMoveEnd}
            />
        </div>
    );
};
