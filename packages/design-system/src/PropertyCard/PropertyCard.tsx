import React from 'react';
import { Property } from '@maat/api-types';
import './PropertyCard.css';

interface PropertyCardProps {
    property: Property;
    onClick?: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
    return (
        <div className="property-card" onClick={() => onClick?.(property)}>
            <div className="property-card-image">
                {/* Placeholder for image */}
                <div className="property-image-placeholder" style={{ backgroundColor: '#f0f0f0', height: '200px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span>{property.type}</span>
                </div>
            </div>
            <div className="property-card-content">
                <div className="property-header">
                    <h3 className="property-title">{property.title}</h3>
                </div>
                <p className="property-price">EGP {property.price.toLocaleString()}</p>
                <div className="property-details">
                    <span className="detail-item">{property.bedrooms} Beds</span>
                    <span className="detail-item">•</span>
                    <span className="detail-item">{property.bathrooms} Baths</span>
                    <span className="detail-item">•</span>
                    <span className="detail-item">{property.area} m²</span>
                </div>
                <p className="property-description">{property.description}</p>
            </div>
        </div>
    );
};
