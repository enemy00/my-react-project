import * as React from "react";
import s from "./MyPosts.module.css";
import Posts from "./Posts/Posts";
import {InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, requireField} from "../../../validators/validator";
import {createField, Textarea} from "../../../validators/FormsControls";
import {InitialType} from "../../../redux/profileReducer";

export type MapStatePropsType = {
    profilePage: InitialType
}
export type MapDispatchPropsType = {
    addPostAC: (addPostMessage: string) => void
}
const MyPosts: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    let onSendMessage = (formData: AddPostMessageFormType) => {
        const {addPostMessage} = formData
        props.addPostAC(addPostMessage);
    }


    let state = props.profilePage;
    const postsElements = state.posts.map(p => <Posts message={p.message} likesCount={p.likesCount}/>)

    return (
        <div>
            <MyPostsReduxForm onSubmit={onSendMessage}/>
            <div className={s.posts}>
                my posts
                <div>
                    {postsElements}
                </div>
            </div>
        </div>
    )
}

type AddPostMessageFormType = {
    addPostMessage: string
}
type AddPostMessageFormKeysType = Extract<keyof AddPostMessageFormType, string>
type PropsType = {}
const maxLength5 = maxLengthCreator(5)
const MyPostsForm: React.FC<InjectedFormProps<AddPostMessageFormType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.elementsBlock}>
                {
                    createField<AddPostMessageFormKeysType>(0, 0,"Type ur message", "addPostMessage", [requireField, maxLength5], Textarea)}
                <button>Send message</button>
            </div>
        </form>

    )
}

const MyPostsReduxForm = reduxForm<AddPostMessageFormType>({form: "addPostMessageForm"})(MyPostsForm)

export default MyPosts;
