import React from 'react';
import { FormikSelect, Option } from '@maat/design-system';
import { allPropertyTypes } from '@maat/api-types';

interface PropertiesGridFiltersProps {
    geometryOptions: Option[];
}

export const PropertiesGridFilters: React.FC<PropertiesGridFiltersProps> = ({ geometryOptions }) => {
    const typeOptions = allPropertyTypes.map(t => ({ value: t, label: t.charAt(0).toUpperCase() + t.slice(1) }));
    const bedBathOptions = [1, 2, 3, 4, 5].map(n => ({ value: n, label: `${n}` }));

    return (
        <div className="properties-grid-filters" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            padding: '1rem',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            marginBottom: '2rem'
        }}>
            <FormikSelect
                name="geometryId"
                label="Area"
                options={geometryOptions}
            />
            <FormikSelect
                name="type"
                label="Property Type"
                options={typeOptions}
            />
            <FormikSelect
                name="bedrooms"
                label="Bedrooms"
                options={bedBathOptions}
            />
            <FormikSelect
                name="bathrooms"
                label="Bathrooms"
                options={bedBathOptions}
            />
        </div>
    );
};
