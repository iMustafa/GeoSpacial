import React from 'react';
import './Select.css';

export interface Option {
    value: string | number;
    label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: Option[];
    error?: string;
}

export const Select: React.FC<SelectProps> = ({ label, options, error, className, ...props }) => {
    return (
        <div className={`ds-select-wrapper ${className || ''}`}>
            {label && <label className="ds-select-label">{label}</label>}
            <select className={`ds-select ${error ? 'ds-select-error' : ''}`} {...props}>
                <option value="">Select an option</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <span className="ds-select-error-message">{error}</span>}
        </div>
    );
};
