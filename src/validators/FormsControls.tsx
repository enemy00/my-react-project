import * as React from "react";
import s from "./FormsControls.module.css";
import {Field, WrappedFieldProps} from "redux-form";
import {FieldValidatorType} from "./validator";
import {WrappedFieldMetaProps} from "redux-form/lib/Field";

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
    children: React.ReactNode
}
const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
    return (
        <div className={touched && error ? s.errorBlock : ""}>
            <div>
                {children}
            </div>
            {touched && error && <span>{error}</span>}
        </div>
    )
}
export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}


export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}


export function createField<FormKeysType extends string>(cols: number, rows: number, placeholder: string | undefined,
                                                         name: FormKeysType, validators: Array<FieldValidatorType>,
                                                         component: React.FC<WrappedFieldProps>, props = {}) {
    return (
        <div>
            <Field cols={cols}
                   rows={rows}
                   placeholder={placeholder}
                   name={name}
                   validate={validators}
                   component={component}
                   {...props}
            />
        </div>
    )

}
