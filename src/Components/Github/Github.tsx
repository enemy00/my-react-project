import {useEffect, useState} from "react";
import * as React from "react"
import axios from "axios";
import s from "./Github.module.css";
import github from "../../pictures/github.jpg";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

type SearchUserType = {
    login: string
    id: number
}
type SearchResult = {
    items: Array<SearchUserType>
}

type UserType = {
    login: string
    id: number
    avatar_url: string
    followers: number
    following: number
    twitter_username: null | string
}

type MapStatePropsType = {
    isRegistered: boolean
}
type MapDispatchPropsType = {}
const Github: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const [selectedUser, setSelectedUser] = useState<null | SearchUserType>(null)
    const [users, setUsers] = useState<Array<SearchUserType>>([])
    const [tempSearch, setTempSearch] = useState("enemy00")
    const [searchTerm, setSearchTerm] = useState("enemy00")
    const [userDetails, setUserDetails] = useState<null | UserType>(null)

    useEffect(() => {
        if (selectedUser) {
            document.title = selectedUser.login
        }
    }, [selectedUser]);
    useEffect(() => {
        axios.get<SearchResult>(`https://api.github.com/search/users?q=${searchTerm}`)
            .then(res => {
                setUsers(res.data.items)
            })
    }, [searchTerm]);

    useEffect(() => {
        if (!!selectedUser) {
            axios.get<UserType>(`https://api.github.com/users/${selectedUser.login}`)
                .then(res => {
                    setUserDetails(res.data)
                })

        }
    }, [selectedUser]);

    return (
        <>
            {props.isRegistered ? null :
                <div className={s.login}>If you want to use this page for search people, u have to login in
                    github: <NavLink
                        to={"/githubLogin"}>Login</NavLink></div>}
            <h2 className={s.headContainer}>Github users <div>(to search for github users and also view them
                brief information)</div></h2>
            <div className={s.githubInfo}>
                <img src={github} alt="github-image"/>
                <span>
                    GitHub is considered an important tool for software developers,
                    and its popularity is second to none. It currently serves more than 25 million users.
                    A significant number of professionals turn to GitHub to improve workflows and collaboration.
                    GitHub is a cloud service that hosts a version control system (VCS) called Git.
                    This allows developers to collaborate and make changes to common projects,
                    tracking their progress in detail.
                    </span>
            </div>

            {props.isRegistered && <div className={s.container}>
                <div>
                    <div>
                        <input placeholder="search"
                               value={tempSearch}
                               onChange={(e) => {
                                   setTempSearch(e.currentTarget.value)
                               }}/>
                        <button onClick={() => {
                            setSearchTerm(tempSearch)
                        }}>Find
                        </button>
                    </div>
                    <ul className={s.usersContainer}>
                        {users.map(u => <li key={u.id}
                                            className={selectedUser === u ? s.selected : ""}
                                            onClick={() => {
                                                setSelectedUser(u)
                                            }}>
                                {u.login}
                            </li>
                        )}
                    </ul>
                </div>
                <div>
                    <h3>User's details:</h3>
                    {userDetails && <div>
                        <img src={userDetails.avatar_url} alt="user image"/>
                        <div>
                            {userDetails.login}, followers: {userDetails.followers}
                            <div>tw username: {userDetails.twitter_username
                                ? userDetails.twitter_username
                                : "The person has no twitter username"},
                                following for: {userDetails.following + " users"}
                            </div>
                        </div>
                    </div>}
                </div>
            </div>}
        </>
    )
}

const mapState = (state: AppStateType) => ({
    isRegistered: state.github.isRegistered
})
export default connect(mapState, {})(Github);