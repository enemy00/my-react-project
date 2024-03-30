import * as React from "react";
import s from "./Profile.module.css";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import LoadingBlock from "../Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";
import HeadProfileBlock from "./HeadProfileBlock";
import profileAva from "../../pictures/user.jpg"
import {ProfileType} from "../../redux/profileReducer";
import {ChangeEvent, useState} from "react";
import ProfileDataReduxForm from "./ProfileDataForm/ProfileDataForm";
import ProfileData from "./ProfileDataForm/ProfileData";


type MapStatePropsType = {
    profile: ProfileType | null
    statusText: string
    isOwner: boolean
    photo: File
}
type MapDispatchPropsType = {
    updateUserStatus: (status: string) => void
    saveProfile: (profile: ProfileType) => Promise<any>
    getPhoto: (photo: File) => void
}

const Profile: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {

    const [editMode, setEditMode] = useState(false)


    const onPhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            props.getPhoto(e.target.files[0])
        }
    }

    const submittedData = (formData: ProfileType) => {
        props.saveProfile(formData).then(() => {
            setEditMode(prev => !prev)
        })

    }
    if (!props.profile) {
        return <LoadingBlock/>
    }


    return (
        <div>
            <HeadProfileBlock isOwner={props.isOwner}/>
            <div className={s.matchedBlock}>
                <div>
                    <img alt="profile photo" src={profileAva}/>
                    {props.isOwner ? <input onChange={onPhotoChange} type={"file"} className={s.profilePhoto}/>
                        : null}
                    <ProfileStatusWithHooks updateUserStatus={props.updateUserStatus} statusText={props.statusText}/>
                    <div>
                <span>
                 {!editMode ? <ProfileData profile={props.profile} toEditProfile={() => {
                         setEditMode(prev => !prev)
                     }} isOwner={props.isOwner}
                     />
                     : <ProfileDataReduxForm initialValues={props.profile} onSubmit={submittedData}
                                             profile={props.profile}/>}
                </span>
                    </div>
                </div>
            </div>
            <MyPostsContainer/>
        </div>

    )
}


export default Profile;
