import * as React from "react";
import {connect} from "react-redux";
import Header, {MapDispatchPropsType, MapStatePropsType} from "./Header";
import {AppStateType} from "../../redux/redux-store";
import {logout} from "../../redux/authReducer";


const HeaderContainerWithHooks: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    return <Header {...props} />
}


const mapState = (state: AppStateType) => ({
    login: state.auth.login,
    isAuth: state.auth.isAuth
})
export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapState, {logout})(HeaderContainerWithHooks);