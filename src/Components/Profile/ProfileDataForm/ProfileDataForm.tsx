import * as React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {ProfileType} from "../../../redux/profileReducer";
import s from "../Profile.module.css";
import {createField, Input, Textarea} from "../../../validators/FormsControls";


type PropsType = {
    profile: ProfileType
}

type ProfileTypeKeys = Extract<keyof ProfileType, string>

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = (props) => {
    return <>
        <form onSubmit={props.handleSubmit}>
            <button>Save changes</button>
            <div className={s.profileInfo}>
                <div>
                    my id is: {createField<ProfileTypeKeys>(null, null, null, "User id", "userId", [], Input)}
                    <div>
                        about me: {createField<ProfileTypeKeys>(null, 0, 0, "About me", "aboutMe", [], Textarea)}
                        <div>
                            looking for a job: {createField<ProfileTypeKeys>(null, null, null, "Looking for a job",
                            "lookingForAJob", [],
                            Input, {type: "checkbox"})}
                            <div>
                                <div>
                                    my programming skills: {createField<ProfileTypeKeys>(null, 0, 0, "My skills",
                                    "lookingForAJobDescription",
                                    [], Textarea)}
                                </div>
                                <div>
                                    my name
                                    is: {createField<ProfileTypeKeys>(null, null, null, "Name", "fullName", [], Input)}
                                </div>
                                <div className={s.contacts}>
                                    contacts: {Object.keys(props.profile.contacts).map(key => {
                                    return <div
                                        key={key}>{key}: {createField(null, null, null, key, "contacts." + key, [], Input)}
                                    </div>
                                })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </>
}
const ProfileDataReduxForm = reduxForm<ProfileType, PropsType>({
    form: "edit-profile"
})(ProfileDataForm)


export default ProfileDataReduxForm;