import React from 'react';
import { PropertyCard } from '@maat/design-system';
import { Property } from '@maat/api-types';

interface PropertiesListProps {
    properties: Property[] | undefined;
    selectedPropertyId: number | null;
    onCardClick: (property: Property) => void;
    loading: boolean;
}

export const PropertiesList: React.FC<PropertiesListProps> = ({ properties, selectedPropertyId, onCardClick, loading }) => {
    if (loading) return <div className="pmv-loading">Loading...</div>;

    return (
        <div className="pmv-list">
            {properties?.map(property => (
                <div
                    key={property.id}
                    id={`property-card-${property.id}`}
                    className={`pmv-card-wrapper ${selectedPropertyId === property.id ? 'selected' : ''}`}
                >
                    <PropertyCard
                        property={property}
                        onClick={onCardClick}
                    />
                </div>
            ))}
        </div>
    );
};
