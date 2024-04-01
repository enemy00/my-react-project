import * as React from "react";
import s from "./Profile.module.css";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import LoadingBlock from "../Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";
import HeadProfileBlock from "./HeadProfileBlock";
import profileAva from "../../pictures/user.jpg"
import {ProfileType} from "../../redux/profileReducer";
import {useState} from "react";
import ProfileDataReduxForm from "./ProfileDataForm/ProfileDataForm";
import ProfileData from "./ProfileDataForm/ProfileData";


type MapStatePropsType = {
    profile: ProfileType | null
    statusText: string
    isOwner: boolean
}
type MapDispatchPropsType = {
    updateUserStatus: (status: string) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

const Profile: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {

    const [editMode, setEditMode] = useState(false)
    const [profileImage, setProfileImage] = useState<null | string>(null)

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
                    <img className={s.profilePhoto} alt="profile photo" src={props.profile.photos.small || profileAva || profileImage}/>
                    {props.isOwner ? <input onChange={(e) => {
                            if (e.target.files && e.target.files.length) {
                                setProfileImage(URL.createObjectURL(e.target.files[0]));
                            }
                        }} type={"file"} className={s.changeProfilePhoto}/>
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
