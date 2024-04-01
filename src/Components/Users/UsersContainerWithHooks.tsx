import * as React from "react";
import Users from "./Users";
import {connect} from "react-redux";
import {
    actions,
    getUsersTC, UsersType
} from "../../redux/usersReducer";
import LoadingBlock from "../Preloader/Preloader";
import {AppStateType} from "../../redux/redux-store";
import {useEffect} from "react";


type MapStatePropsType = {
    users: Array<UsersType>
    pageSize: number
    usersQuantity: number
    currentPage: number
    isFetching: boolean
}
type MapDispatchPropsType = {
    getUsersTC: (currentPage: number, pageSize: number) => void
    followAC: (userId: number) => void
    unfollowAC: (userId: number) => void
}

const UsersContainerWithHooks: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    useEffect(() => {
        props.getUsersTC(props.currentPage, props.pageSize)
    }, []);
    const changedPage = (page: number) => {
        props.getUsersTC(page, props.pageSize)

    }

    return <>
        {props.isFetching ? <LoadingBlock/>
            : null}
        <Users {...props} changedPage={changedPage}/>
    </>

}

const mapStateToProps = (state: AppStateType) => ({
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    usersQuantity: state.usersPage.usersQuantity,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
})
export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    followAC: actions.followAC, unfollowAC: actions.unfollowAC, getUsersTC
})(UsersContainerWithHooks);