import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LocationPoint } from '@maat/api-types';
import './Map.css';

// Fix for default marker icon in leaflet with webpack/vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
    points: LocationPoint[];
    center?: [number, number];
    zoom?: number;
    className?: string;
    onMarkerClick?: (point: LocationPoint) => void;
    selectedPoint?: LocationPoint;
    userLocation?: { latitude: number; longitude: number };
    onBoundsChange?: (center: [number, number], zoom: number) => void;
}

interface MapUpdaterProps {
    center: [number, number];
    onBoundsChange?: (center: [number, number], zoom: number) => void;
}

const MapUpdater: React.FC<MapUpdaterProps> = ({ center, onBoundsChange }) => {
    const map = useMap();

    useEffect(() => {
        // Update view center without changing zoom (avoid flyTo animation)
        map.setView(center, map.getZoom());
    }, [center, map]);

    useEffect(() => {
        if (!onBoundsChange) return;

        const handleMoveEnd = () => {
            const newCenter = map.getCenter();
            const newZoom = map.getZoom();
            onBoundsChange([newCenter.lat, newCenter.lng], newZoom);
        };

        map.on('moveend', handleMoveEnd);
        return () => {
            map.off('moveend', handleMoveEnd);
        };
    }, [map, onBoundsChange]);

    return null;
}

const SelectedIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [35, 57], // ~40% larger than [25, 41]
    iconAnchor: [17, 57]
});

const UserIcon = L.divIcon({
    className: 'user-location-marker',
    html: '<div style="background-color: #3b82f6; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3);"></div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
});

export const Map: React.FC<MapProps> = ({
    points,
    center = [30.0444, 31.2357], // Cairo default
    zoom = 6,
    className,
    onMarkerClick,
    selectedPoint,
    userLocation,
    onBoundsChange
}) => {
    return (
        <div className={`map-container ${className || ''}`}>
            <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapUpdater center={center} onBoundsChange={onBoundsChange} />

                {userLocation && (
                    <Marker
                        position={[userLocation.latitude, userLocation.longitude]}
                        icon={UserIcon}
                        zIndexOffset={100}
                    >
                        <Popup>Your Location</Popup>
                    </Marker>
                )}

                {points.map((point, idx) => {
                    const isSelected = selectedPoint && (
                        point === selectedPoint ||
                        (point.coordinates[0] === selectedPoint.coordinates[0] && point.coordinates[1] === selectedPoint.coordinates[1])
                    );

                    return (
                        <Marker
                            key={`${point.coordinates[0]}-${point.coordinates[1]}-${idx}`}
                            position={[point.coordinates[1], point.coordinates[0]]}
                            icon={isSelected ? SelectedIcon : DefaultIcon}
                            zIndexOffset={isSelected ? 1000 : 0}
                            eventHandlers={{
                                click: () => onMarkerClick?.(point),
                            }}
                        >
                            <Popup>
                                Location: {point.coordinates[1].toFixed(4)}, {point.coordinates[0].toFixed(4)}
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
};
