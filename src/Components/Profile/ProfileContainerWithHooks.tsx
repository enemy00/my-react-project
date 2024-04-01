import * as React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {
    getUserProfile,
    getUserProfileStatus, ProfileType, updateUserStatus,
} from "../../redux/profileReducer";
import {withRouter, WithRouterProps} from "../../hocs/withRouter";
import Profile from "./Profile";
import {useEffect} from "react";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    profile: ProfileType | null
    statusText: string
    authorizedUserId: number
    isOwner: boolean
}
type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    getUserProfileStatus: (userId: number) => void
    updateUserStatus: (status: string) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}
const ProfileContainerWithHooks: React.FC<MapStatePropsType & MapDispatchPropsType & WithRouterProps> = (props) => {
    let userId: number | null;
    const refreshProfile = () => {
        userId = +props.params.userId;
        if (!userId) {
            userId = props.authorizedUserId;
            if (!userId)
                props.navigate("/login")
        }
        if (!userId) {
            console.error('Id should be exist')
        } else {
            props.getUserProfile(userId)
            props.getUserProfileStatus(userId)
        }
    }

    useEffect(() => {
        userId = +props.params.userId;
        refreshProfile()
    }, [])

    useEffect(() => {
        userId = +props.params.userId;
        refreshProfile()
    }, [props.params.userId]);

    return <Profile profile={props.profile}
                    updateUserStatus={props.updateUserStatus}
                    statusText={props.statusText}
                    isOwner={!props.params.userId}
                    saveProfile={props.saveProfile}/>
}


let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    statusText: state.profilePage.statusText,
    authorizedUserId: state.auth.userId
})
export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {
        getUserProfile,
        getUserProfileStatus, updateUserStatus
    }))(ProfileContainerWithHooks);
