import s from "./Dialogs.module.css";
import * as React from "react";
import {connect} from "react-redux";
import {withRouter, WithRouterProps} from "../../hocs/withRouter";
import {compose} from "redux";
import Message from "./DialogsItems/Message";
import {getUser, UserType} from "../../redux/resourcesReducer";
import LoadingBlock from "../Preloader/Preloader";
import user from "../../pictures/user.jpg";
import {MessagesType, actions} from "../../redux/dialogsReducer";
import {AppStateType} from "../../redux/redux-store";
import {useEffect} from "react";
import {createField, Textarea} from "../../validators/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";

type MapStatePropsType = {
    login: string
    messages: Array<MessagesType>
    user: UserType
}
type MapDispatchPropsType = {
    getUser: (id: string) => void
    sendMessage: (message: string) => void
}

const Conversations: React.FC<MapStatePropsType & MapDispatchPropsType & WithRouterProps> = (props) => {
    const messagesElements = props.messages.map(m => <Message message={m.message}/>)

    const userId = props.params.userId;

    useEffect(() => {
        props.getUser(userId)
    }, []);

    const submittedData = (formData: FormParamsType) => {
        const {addMessage} = formData
        props.sendMessage(addMessage)
    }

    if (!props.user) {
        return <LoadingBlock/>
    }
    return (
        <>
            <div className={s.headDialog}>Now {props.login} and {props.user.name} are chatting...</div>
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                    <img src={user} alt="Image"/>
                    <span>{props.login}</span>
                </div>
                <div className={s.messages}>
                    <div>
                        <img src={user} alt="Image"/>
                        <span>{props.user.name}</span>
                        <div className={s.messagesPosition}>{messagesElements}</div>
                        <ConversationReduxForm onSubmit={submittedData}/>
                    </div>
                </div>
            </div>
        </>
    )
}

type FormParamsType = {
    addMessage: string
}

type PropsType = {}


const ConversationForm: React.FC<InjectedFormProps<FormParamsType, PropsType> & PropsType> = (props) => {
    return <>
        <form onSubmit={props.handleSubmit}>
            {createField(70, 5, "Write the message", "addMessage", [], Textarea)}
            <button className={s.button}>Send message</button>
        </form>
    </>
}
const ConversationReduxForm = reduxForm<FormParamsType>({form: "add-messages-form"})(ConversationForm);
const mapState = (state: AppStateType) => ({
    login: state.auth.login,
    messages: state.dialogsPage.messages,
    user: state.resources.user,
})
export default compose<React.ComponentType>(
    withRouter,
    connect(mapState,
        {getUser, sendMessage: actions.sentMessageAC}))(Conversations);