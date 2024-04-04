import * as React from "react"
import s from "./Login.module.css"
import {InjectedFormProps, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {requiredCredentials} from "../../validators/validator";
import {createField, Input} from "../../validators/FormsControls";
import {loginMe} from "../../redux/authReducer";
import {Navigate} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    isAuth: boolean
}
type MapDispatchPropsType = {
    loginMe: (email: string, password: string, rememberMe: boolean) => void
}

export type LoginFormValuesType = {
    loginText: string
    passwordText: string
    rememberMe: boolean
}
type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const sendLoginData = (formData: LoginFormValuesType) => {
        const {loginText, passwordText, rememberMe} = formData
        props.loginMe(loginText, passwordText, rememberMe)
    }
    if (props.isAuth) {
        return <Navigate to="/profile"/>
    }

    return (
        <div className={s.loginForm}>
            <div className={s.formBox}>
                <div className={s.buttonBox}>
                    <div className={s.button}>
                        <h2>Login Form</h2>
                        <LoginReduxForm onSubmit={sendLoginData}/>
                    </div>
                </div>
            </div>
        </div>
    )
}


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
const LoginReduxForm = reduxForm<LoginFormValuesType>({form: "login"})(LoginForm)


const mapState = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})
export default connect(mapState, {loginMe})(Login);
