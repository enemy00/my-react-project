import * as React from "react";
import Users from "./Users";
import {connect} from "react-redux";
import {
    actions,
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
}
type MapDispatchPropsType = {
    getUsersTC: (currentPage: number, pageSize: number) => void
    followAC: (userId: number) => void
    unfollowAC: (userId: number) => void
}

class UsersContainer extends React.Component<MapStatePropsType & MapDispatchPropsType> {

    componentDidMount() {
        this.props.getUsersTC(this.props.currentPage, this.props.pageSize)
    }

    changedPage = (page: number) => {
        this.props.getUsersTC(page, this.props.pageSize)

    }

    render() {
        return <>
            {this.props.isFetching ? <LoadingBlock/>
                : null}
            <Users {...this.props} changedPage={this.changedPage}/>
        </>
    }
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
})(UsersContainer);