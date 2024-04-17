import * as React from "react";
import Users from "./Users";
import {connect} from "react-redux";
import {
    actions, FilterType,
    getUsersTC, UsersType
} from "../../redux/usersReducer";
import LoadingBlock from "../Preloader/Preloader";
import {AppStateType} from "../../redux/redux-store";


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

class UsersContainer extends React.Component<MapStatePropsType & MapDispatchPropsType> {

    componentDidMount() {
        this.props.getUsersTC(this.props.currentPage, this.props.pageSize, this.props.filter)
    }

    changedPage = (page: number) => {
        const {pageSize, filter} = this.props
        this.props.getUsersTC(page, pageSize, filter)
    }
    filterChanged = (filter: FilterType) => {
        const {pageSize} = this.props
        this.props.getUsersTC(1, pageSize, filter)
    }

    render() {
        return <>
            {this.props.isFetching ? <LoadingBlock/>
                : null}
            <Users {...this.props} changedPage={this.changedPage} filterChanged={this.filterChanged}/>
        </>
    }
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
})(UsersContainer);