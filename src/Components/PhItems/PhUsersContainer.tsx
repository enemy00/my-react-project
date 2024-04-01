import * as React from "react";
import {connect} from "react-redux";
import {getUsers, UserType} from "../../redux/resourcesReducer";
import {useEffect} from "react";
import {AppStateType} from "../../redux/redux-store";
import PhUsers from "./PhUsers";

type MapStatePropsType = {
    users: Array<UserType>
}

type MapDispatchPropsType = {
    getUsers: () => void
}
const PhUsersContainer: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    useEffect(() => {
        props.getUsers()
    }, []);

    return <PhUsers {...props} />
}


const mapState = (state: AppStateType) => ({
    users: state.resources.users,
})
export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapState, {getUsers})(PhUsersContainer);