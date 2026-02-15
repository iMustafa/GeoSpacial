import React, { useState } from 'react';
import { FormikSelect } from '@maat/design-system';
import { allPropertyTypes } from '@maat/api-types';

export const MapViewPropertyFilters: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const typeOptions = allPropertyTypes.map(t => ({ value: t, label: t.charAt(0).toUpperCase() + t.slice(1) }));
    const bedBathOptions = [1, 2, 3, 4, 5].map(n => ({ value: n, label: `${n}` }));

    return (
        <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
            <div
                className="pmv-filters-toggle"
                onClick={() => setIsCollapsed(!isCollapsed)}
                style={{
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: isCollapsed ? 0 : '10px',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    color: '#666'
                }}
            >
                <span>Filters</span>
                <span>{isCollapsed ? '+' : '-'}</span>
            </div>

            {!isCollapsed && (
                <>
                    <FormikSelect
                        name="type"
                        label="Type"
                        options={typeOptions}
                    />
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <div style={{ flex: 1 }}>
                            <FormikSelect
                                name="bedrooms"
                                label="Bedrooms"
                                options={bedBathOptions}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <FormikSelect
                                name="bathrooms"
                                label="Bathrooms"
                                options={bedBathOptions}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
