import { ReactNode } from 'react';
import { Formik, FormikConfig, FormikValues } from 'formik';

// Re-export specific Formik hooks/types so client doesn't need formik dependency
export { useFormikContext } from 'formik';
export type { FormikValues } from 'formik';

export interface FormProviderProps<Values extends FormikValues = FormikValues> extends FormikConfig<Values> {
    children: ReactNode | ((props: any) => ReactNode);
}

export const FormProvider = <Values extends FormikValues = FormikValues>({
    children,
    ...props
}: FormProviderProps<Values>) => {
    return (
        <Formik {...props}>
            {children}
        </Formik>
    );
};
