import * as React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../../validators/FormsControls";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getLoginData} from "../../redux/githubReducer";
import {Navigate} from "react-router-dom";
import s from "./Github.module.css";

type MapStatePropsType = {
    login: string | null
    password: string | null
    rememberMe: boolean
    isRegistered: boolean
}
type MapDispatchPropsType = {
    getLoginData: (login: string, password: string, rememberMe: boolean) => void
}
const GithubLogin: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {

    const sendLoginData = (formData: LoginFormParamsType) => {
        const {myLogin, myPassword, rememberMe} = formData
        props.getLoginData(myLogin, myPassword, rememberMe)
    }

    if (props.isRegistered) {
        return <Navigate to={"/github"}/>
    }

    return (
        <div className={s.loginForm}>
            <div className={s.formBox}>
                <div className={s.buttonBox}>
                    <div className={s.button}>
                        <h2>Github login form</h2>
                        <GithubLoginReduxForm onSubmit={sendLoginData}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

type LoginFormParamsType = {
    myLogin: string
    myPassword: string
    rememberMe: boolean
}
type PropsType = {}
const GithubLoginForm: React.FC<InjectedFormProps<LoginFormParamsType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <span>
                <div>login: {createField( 0, 0, "login", "myLogin", [], Input)}
                    <hr/>
                    <div>password: {createField(0, 0,"password", "myPassword", [], Input, {type: "password"})}
                        <hr/>
                        Remember me: {createField(0, 0, undefined, "rememberMe", [], Input, {type: "checkbox"})}
                            <button className={s.sendButton}>Send</button>
            </div>
                </div>
            </span>
        </form>
    )
}


const GithubLoginReduxForm = reduxForm<LoginFormParamsType>({form: "github-login-form"})
(GithubLoginForm)

const mapState = (state: AppStateType) => ({
    login: state.github.login,
    password: state.github.password,
    rememberMe: state.github.rememberMe,
    isRegistered: state.github.isRegistered
})
export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapState, {getLoginData})(GithubLogin);
