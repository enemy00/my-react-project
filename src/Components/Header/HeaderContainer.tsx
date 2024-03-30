import * as React from "react";
import {connect} from "react-redux";
import Header, {MapDispatchPropsType, MapStatePropsType} from "./Header";
import {AppStateType} from "../../redux/redux-store";
import {logout} from "../../redux/authReducer";


class HeaderContainer extends React.Component<MapStatePropsType & MapDispatchPropsType> {

    render() {
        return <Header {...this.props} />
    }
}

const mapState = (state: AppStateType) => ({
    login: state.auth.login,
    isAuth: state.auth.isAuth
})
export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapState, {logout})(HeaderContainer);