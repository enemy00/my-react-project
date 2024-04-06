import * as React from "react"
import {connect} from "react-redux";
import {loginMe} from "../../redux/authReducer";
import {AppStateType} from "../../redux/redux-store";
import Login from "./Login";

export type MapStatePropsType = {
    isAuth: boolean
}
export type MapDispatchPropsType = {
    loginMe: (email: string, password: string, rememberMe: boolean) => void
}

export type LoginFormValuesType = {
    loginText: string
    passwordText: string
    rememberMe: boolean
}
const LoginContainer: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    return <Login {...props} />
}

const mapState = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})
export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapState, {loginMe})(LoginContainer);
