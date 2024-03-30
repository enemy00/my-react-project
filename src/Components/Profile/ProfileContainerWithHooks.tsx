/*
import * as React from "react";
import axios from "axios";
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
    photo: File
    isOwner: boolean
}
type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    getUserProfileStatus: (userId: number) => void
    updateUserStatus: (status: string) => void
    getPhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}
const ProfileContainerWithHooks: React.FC<MapStatePropsType & MapDispatchPropsType & WithRouterProps> = (props) => {
    debugger
    let userId: number | null = +props.params.userId

    useEffect(() => {
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

        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            .then(res => {
                props.getUserProfile(res.data)
            })
    }, [])
    useEffect(() => {
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

        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/status/${userId}`)
            .then(res => {
                props.getUserProfileStatus(res.data)
            })
    }, []);

    return <Profile profile={props.profile}
                    updateUserStatus={props.updateUserStatus}
                    statusText={props.statusText}
                    isOwner={!props.params.userId}
                    getPhoto={props.getPhoto}
                    saveProfile={props.saveProfile}
                    photo={props.photo}/>
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
*/
