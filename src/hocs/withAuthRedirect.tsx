import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import * as React from "react";
import {AppStateType} from "../redux/redux-store";

type MapStatePropsType = {
    isAuth: boolean
}
type MapDispatchPropsType = {}

const mapState = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})
export function withAuthRedirect <WCP>(Component: React.ComponentType<WCP>) {
    const AuthRedirectComponent: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
        let {isAuth, ...restProps} = props
        if (!isAuth) return <Navigate to={"/login"}/>

        return <Component {...restProps as WCP & MapDispatchPropsType & MapStatePropsType} />
    }
    let ConnectedAuthRedirectComponent = connect<MapStatePropsType, MapDispatchPropsType, WCP, AppStateType>(
        mapState, {})(AuthRedirectComponent)
    return ConnectedAuthRedirectComponent
}
