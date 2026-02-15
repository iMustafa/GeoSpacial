import React from 'react';
import './Table.css';

export interface Column<T> {
    header: string;
    accessor: keyof T | ((row: T) => React.ReactNode);
    className?: string;
    width?: string;
}

export interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
    onRowClick?: (row: T) => void;
    className?: string;
}

export const Table = <T extends object>({
    data,
    columns,
    onRowClick,
    className
}: TableProps<T>): React.ReactElement => {

    const renderCell = (row: T, col: Column<T>) => {
        if (typeof col.accessor === 'function') {
            return col.accessor(row);
        }
        return (row[col.accessor] as unknown) as React.ReactNode;
    };

    return (
        <div className={`table-container ${className || ''}`}>
            <table className="ds-table">
                <thead>
                    <tr>
                        {columns.map((col, idx) => (
                            <th
                                key={idx}
                                className={col.className}
                                style={{ width: col.width }}
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="empty-state">No data available</td>
                        </tr>
                    ) : (
                        data.map((row, rowIdx) => (
                            <tr
                                key={rowIdx}
                                onClick={() => onRowClick?.(row)}
                                className={onRowClick ? 'clickable-row' : ''}
                            >
                                {columns.map((col, colIdx) => (
                                    <td key={`${rowIdx}-${colIdx}`} className={col.className}>
                                        {renderCell(row, col)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};
