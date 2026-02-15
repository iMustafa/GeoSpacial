import React, { useState } from 'react';
import { usePropertiesQuery } from '@maat/api-maat';
import { FormProvider, useFormikContext } from '@maat/design-system';
import { Property, PropertyFilter } from '@maat/api-types';
import './PropertiesMapView.css';
import { MapViewPropertyFilters } from './MapViewPropertyFilters';
import { MapView } from './MapView';
import { PropertiesList } from './PropertiesList';

const PropertiesListAndMap: React.FC = () => {
    const { values } = useFormikContext<PropertyFilter>();

    const { data: properties, isLoading, error } = usePropertiesQuery(values);
    const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);

    const selectedProperty = properties?.find(p => p.id === selectedPropertyId);

    const handleCardClick = (property: Property) => {
        setSelectedPropertyId(property.id);
    };

    const handleMarkerClick = (point: any) => {
        const prop = properties?.find(p =>
            p.location.coordinates[0] === point.coordinates[0] &&
            p.location.coordinates[1] === point.coordinates[1]
        );
        if (prop) {
            setSelectedPropertyId(prop.id);
            const element = document.getElementById(`property-card-${prop.id}`);
            element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const { setFieldValue } = useFormikContext<PropertyFilter>();

    const calculateRadiusFromZoom = (zoom: number, latitude: number) => {
        return Math.round((40075016.686 * Math.abs(Math.cos(latitude * Math.PI / 180)) / Math.pow(2, zoom)) / 2) * 7;
    };

    const handleMapMoveEnd = (center: [number, number], zoom: number) => {
        const radius = calculateRadiusFromZoom(zoom, center[0]);
        setFieldValue('centerPoint', { latitude: center[1], longitude: center[0] });
        setFieldValue('radius', radius);
    };

    if (error) return <div className="pmv-error">Error loading properties</div>;

    return (
        <div className="pmv-container">
            <MapView
                properties={properties}
                selectedProperty={selectedProperty}
                onMarkerClick={handleMarkerClick}
                onMapMoveEnd={handleMapMoveEnd}
            />

            <div className="pmv-sidebar">
                <div className="pmv-sidebar-top">
                    <div className="pmv-sidebar-header">
                        <h2>Properties</h2>
                        <span className="pmv-count">{properties?.length || 0} results</span>
                    </div>

                    <div className="pmv-filters">
                        <MapViewPropertyFilters />
                    </div>
                </div>

                <PropertiesList
                    properties={properties}
                    selectedPropertyId={selectedPropertyId}
                    onCardClick={handleCardClick}
                    loading={isLoading}
                />
            </div>
        </div>
    );
};

export const PropertiesMapView: React.FC = () => {
    return (
        <FormProvider<PropertyFilter>
            initialValues={{
                radius: 10000,
            }}
            onSubmit={() => { }}
        >
            <PropertiesListAndMap />
        </FormProvider>
    );
};
