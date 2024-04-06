import * as React from "react"
import s from "./Login.module.css"
import {Navigate} from "react-router-dom";
import {MapDispatchPropsType, MapStatePropsType} from "./LoginContainer";
import {LoginFormValuesType, LoginReduxForm} from "./LoginForm";


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



export default Login;

