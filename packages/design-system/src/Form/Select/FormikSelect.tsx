import React from 'react';
import { useField } from 'formik';
import { Select, SelectProps } from './Select';

export interface FormikSelectProps extends Omit<SelectProps, 'name' | 'value' | 'onChange' | 'onBlur' | 'error'> {
    name: string;
}

export const FormikSelect: React.FC<FormikSelectProps> = ({ name, ...props }) => {
    const [field, meta] = useField(name);

    return (
        <Select
            {...field}
            {...props}
            error={meta.touched && meta.error ? meta.error : undefined}
        />
    );
};
