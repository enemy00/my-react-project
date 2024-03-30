import * as React from "react";
import {connect} from "react-redux";
import {getUsers, UserType} from "../../redux/resourcesReducer";
import MainUsers from "./MainUsers";
import {useEffect} from "react";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    users: Array<UserType>
}

type MapDispatchPropsType = {
    getUsers: () => void
}
const MainUsersContainer: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    useEffect(() => {
        props.getUsers()
    }, []);

    return <MainUsers {...props} />
}


const mapState = (state: AppStateType) => ({
    users: state.resources.users,
})
export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapState, {getUsers})(MainUsersContainer);