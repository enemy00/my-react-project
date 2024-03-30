import * as React from "react";
import s from "../Profile.module.css";
import {ContactsType, ProfileType} from "../../../redux/profileReducer";

type ProfileDataPropsType = {
    profile: ProfileType
    toEditProfile: () => void
    isOwner: boolean
}

const ProfileData: React.FC<ProfileDataPropsType> = (props) => {
    return <>
        <button onClick={props.toEditProfile}>Edit profile info</button>
        <div className={s.profileInfo}>
            <div>
                my id is: {props.profile.userId}
                <div>
                    about me: {props.profile.aboutMe
                    ? props.profile.aboutMe : "I am the human!"}
                    <div>
                        looking for a job: {props.profile.lookingForAJob ? "yes" :   "no"}
                        <div>

                            <div>
                                my programming skills: {props.profile.lookingForAJobDescription
                                ? props.profile.lookingForAJobDescription : "----"}
                            </div>

                            <div>
                                my name is: {props.profile.fullName}
                            </div>
                            <div className={s.contacts}>
                                contacts: {Object.keys(props.profile.contacts).map(key => {
                                return <div key={key}>{key}: {props.profile.contacts[key as keyof ContactsType]
                                    ? props.profile.contacts[key as keyof ContactsType] : "https://somesite.com"
                                }</div>
                            })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default ProfileData;