import React, { useMemo } from 'react';
import { useLocationGeometryQuery, usePropertiesInPolygonQuery } from '@maat/api-maat';
import { PropertyCard, Option, FormProvider, useFormikContext } from '@maat/design-system';
import { PropertyFilter } from '@maat/api-types';
import { PropertiesGridFilters } from './PropertiesGridFilters';
import './PropertiesGridView.css';

interface FilterValues extends PropertyFilter {
    geometryId: string | number;
}

const PropertiesGridContent: React.FC = () => {
    const { values } = useFormikContext<FilterValues>();
    // If geometryId is not selected, the query hook handles enabled: false
    const { data: properties, isLoading, error } = usePropertiesInPolygonQuery(values.geometryId, values);

    if (!values.geometryId) {
        return (
            <div className="properties-grid-empty-state">
                <p>Please select an area to view properties.</p>
            </div>
        );
    }

    if (isLoading) {
        return <div className="properties-grid-loading">Loading properties...</div>;
    }

    if (error) {
        return <div className="properties-grid-error">Error loading properties</div>;
    }

    if (!properties || properties.length === 0) {
        return <div className="properties-grid-empty">No properties found.</div>;
    }

    return (
        <div className="properties-grid-results">
            {properties.map(property => (
                <PropertyCard key={property.id} property={property} />
            ))}
        </div>
    );
};

export const PropertiesGridView: React.FC = () => {
    const { data: locationGeometries, isLoading: isLoadingGeometries } = useLocationGeometryQuery();

    const geometryOptions: Option[] = useMemo(() => {
        if (!locationGeometries) return [];
        return locationGeometries.map(g => ({
            value: g.id,
            label: g.name
        }));
    }, [locationGeometries]);

    const initialValues: FilterValues = {
        geometryId: '',
        type: undefined,
        bedrooms: undefined,
        bathrooms: undefined
    };

    if (isLoadingGeometries) {
        return <div>Loading locations...</div>;
    }

    return (
        <div className="properties-grid-view">
            <FormProvider
                initialValues={initialValues}
                onSubmit={() => { }}
            >
                <div>
                    <PropertiesGridFilters geometryOptions={geometryOptions} />
                    <PropertiesGridContent />
                </div>
            </FormProvider>
        </div>
    );
};
