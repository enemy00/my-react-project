import * as React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getUserProfile,
    getUserProfileStatus, ProfileType, saveProfile, updateUserStatus,
} from "../../redux/profileReducer";
import {compose} from "redux";
import {getProfile, getStatusText} from "../../selectors/selectors";
import {AppStateType} from "../../redux/redux-store";
import {withRouter, WithRouterProps} from "../../hocs/withRouter";
import {withAuthRedirect} from "../../hocs/withAuthRedirect";


type MapStatePropsType = {
    statusText: string
    authorizedUserId: number
    profile: ProfileType
}
type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    getUserProfileStatus: (userId: number) => void
    updateUserStatus: (status: string) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}


type PropsType = MapStatePropsType & MapDispatchPropsType & WithRouterProps;

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId: number | null = +this.props.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.navigate("/login")
            }
        }
        if (!userId) {
            console.error('Id should be exist')
        } else {
            this.props.getUserProfile(userId)
            this.props.getUserProfileStatus(userId)
        }
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if (prevProps.params.userId !== this.props.params.userId)
            this.refreshProfile()
    }

    render() {
        return <Profile profile={this.props.profile}
                        updateUserStatus={this.props.updateUserStatus}
                        statusText={this.props.statusText}
                        isOwner={!this.props.params.userId}
                        saveProfile={this.props.saveProfile}
        />
    }

}

let mapStateToProps = (state: AppStateType) => ({
    profile: getProfile(state),
    statusText: getStatusText(state),
    authorizedUserId: state.auth.userId,
})

export default compose<React.ComponentType>(
    withRouter,
    withAuthRedirect,
    connect(mapStateToProps, {
        getUserProfile,
        getUserProfileStatus, saveProfile, updateUserStatus
    }))(ProfileContainer)
