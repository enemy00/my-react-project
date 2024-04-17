import * as React from "react";
import Users from "./Users";
import {connect} from "react-redux";
import {
    actions, FilterType,
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
    filter: FilterType
}
type MapDispatchPropsType = {
    getUsersTC: (currentPage: number, pageSize: number, filter: FilterType) => void
    followAC: (userId: number) => void
    unfollowAC: (userId: number) => void
}

const UsersContainerWithHooks: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    useEffect(() => {
        props.getUsersTC(props.currentPage, props.pageSize, props.filter)
    }, []);
    const changedPage = (page: number) => {
        const {pageSize, filter} = props
        props.getUsersTC(page, pageSize, filter)

    }
    const filterChanged = (filter: FilterType) => {
        const {pageSize} = props
        props.getUsersTC(1, pageSize, filter)
    }

    return <>
        {props.isFetching ? <LoadingBlock/>
            : null}
        <Users {...props} changedPage={changedPage} filterChanged={filterChanged}/>
    </>

}

const mapStateToProps = (state: AppStateType) => ({
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    usersQuantity: state.usersPage.usersQuantity,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    filter: state.usersPage.filter,
})
export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    followAC: actions.followAC, unfollowAC: actions.unfollowAC, getUsersTC
})(UsersContainerWithHooks);