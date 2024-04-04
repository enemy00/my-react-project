import {useEffect, useState} from "react";
import * as React from "react"
import s from "./Github.module.css";
import github from "../../pictures/github.jpg";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {compose} from "redux";
import {withAuthRedirect} from "../../hocs/withAuthRedirect";
import {getGithubUsers, getUserDetails} from "../../redux/githubReducer";
import {SearchUserType, UserDetailsType} from "../../api/api";
import userProfile from "../../pictures/userss.png";
import {createField, Input} from "../../validators/FormsControls";
import {requireField} from "../../validators/validator";
import {InjectedFormProps, reduxForm} from "redux-form";


type MapStatePropsType = {
    isRegistered: boolean
    users: Array<SearchUserType>
    userDetails: UserDetailsType
    searchTerm: string
}
type MapDispatchPropsType = {
    getUserDetails: (searchResult: string) => void
    getGithubUsers: (searchResult: string) => void
}
const Github: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const [selectedUser, setSelectedUser] = useState<null | SearchUserType>(null)


    useEffect(() => {
        if (selectedUser) {
            document.title = selectedUser.login
        }
    }, [selectedUser]);
    useEffect(() => {
        props.getGithubUsers(props.searchTerm)
    }, [props.searchTerm]);

    useEffect(() => {
        if (!!selectedUser) {
            props.getUserDetails(selectedUser.login)
        }
    }, [selectedUser]);

    const submittedData = (formData: GithubFormDataType) => {
        const {login} = formData
        props.getGithubUsers(login)
    }

    return (
        <>
            {props.isRegistered ? null :
                <div className={s.login}>If you want to use this page for search people, u have to login in
                    github: <NavLink
                        to={"/githubLogin"}><span className={s.loginButton}>Login</span></NavLink></div>}
            <h2 className={s.headContainer}>Github users <div>(to search for github users and also view them
                brief information)</div></h2>
            <div className={s.githubInfo}>
                <img src={github} alt="github-image"/>
                <span className={s.githubInfoText}>
                    <p>GitHub is considered an important tool for software developers,
                    and its popularity is second to none. It currently serves more than 25 million users.
                    A significant number of professionals turn to GitHub to improve workflows and collaboration.
                    GitHub is a cloud service that hosts a version control system (VCS) called Git.
                    This allows developers to collaborate and make changes to common projects,
                        tracking their progress in detail.</p>
                    <p>GitHub hosts over 100 million repositories, the majority of which are open-source projects.
                    This statistic shows that GitHub is among the most popular Git GUI clients and is used by various professionals
                        and large businesses, such as Hostinger.</p>
                    <p>GitHub in simple terms - is just a space or a cloud if you will where you can save, share,
                    and edit files simultaneously with someone else. Every file, files, or whatever project that you
                        save into GitHub is called a repository or “repo”.</p>
                    </span>
            </div>

            {props.isRegistered && <div className={s.container}>
                <div>
                    <div className={s.searchContainer}>
                        <GithubReduxForm onSubmit={submittedData}/>
                    </div>
                    <ul className={s.usersContainer}>
                        {props.users.slice(0, 20).map(u => <li key={u.id}
                                                               className={selectedUser === u ? s.selected : ""}
                                                               onClick={() => {
                                                                   setSelectedUser(u)
                                                               }}>
                                {u.login}
                            </li>
                        )}
                    </ul>
                </div>
                <div className={s.userDetails}>
                    <h3>User's details:</h3>
                    <div className={s.userCard}>
                        {props.userDetails && <div>
                            <img src={props.userDetails.avatar_url ? props.userDetails.avatar_url : userProfile}
                                 alt="user image"/>
                            <div>
                                Login: {props.userDetails.login}
                                <div>
                                    followers: {props.userDetails.followers}
                                </div>
                                <div>Twitter username: {props.userDetails.twitter_username
                                    ? props.userDetails.twitter_username
                                    : "The person has no twitter username"}
                                    <div>
                                        following for: {props.userDetails.following + " users"}
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>}
        </>
    )
}

type GithubFormDataType = {
    login: string
}
type PropsType = {}


type GithubFormDataTypeKeys = Extract<keyof GithubFormDataType, string>
const GithubForm: React.FC<InjectedFormProps<GithubFormDataType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {createField<GithubFormDataTypeKeys>(s.searchInput, null, null, "enemy00", "login", [requireField], Input)}
            <button className={s.searchButton}>Find
            </button>
        </form>
    )
}

const GithubReduxForm = reduxForm<GithubFormDataType, PropsType>({form: "github-search-form"})(GithubForm)


const mapState = (state: AppStateType) => ({
    isRegistered: state.github.isRegistered,
    users: state.github.githubUsers,
    userDetails: state.github.githubUserDetails,
    searchTerm: state.github.searchTerm,
})
export default compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapState, {getUserDetails, getGithubUsers}))(Github);