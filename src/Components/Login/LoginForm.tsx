import * as React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import s from "./Login.module.css";
import {createField, Input} from "../../validators/FormsControls";
import {requiredCredentials} from "../../validators/validator";

export type LoginFormValuesType = {
    loginText: string
    passwordText: string
    rememberMe: boolean
}
export type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType>> = (props) => {
    return (
        <form className={s.appForm} onSubmit={props.handleSubmit}>
            <div> Login: {createField<LoginFormValuesTypeKeys>(null, null, null, "Login", "loginText",
                [requiredCredentials], Input)}
            </div>
            <hr/>
            <div>
                Password: {createField<LoginFormValuesTypeKeys>(null, null, null, "Password", "passwordText",
                [requiredCredentials], Input, {type: "password"})}
            </div>
            <hr/>
            <div>
                Remember me: {createField<LoginFormValuesTypeKeys>(null, null, null, undefined, "rememberMe",
                [requiredCredentials], Input, {type: "checkbox"})}
            </div>
            <button className={s.sendButton}>Send</button>
        </form>
    )
}
export const LoginReduxForm = reduxForm<LoginFormValuesType>({form: "login"})(LoginForm)

