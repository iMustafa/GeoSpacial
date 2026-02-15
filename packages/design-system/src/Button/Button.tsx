import React from 'react';

export const Button = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => {
    return (
        <button
            onClick={onClick}
            style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'background-color 0.3s'
            }}
        >
            {children}
        </button>
    );
};
