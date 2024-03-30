import * as React from "react";
import usersPhoto from "./../../pictures/users.png";
import {NavLink} from "react-router-dom";
import {UsersType} from "../../redux/usersReducer";
import s from "./Users.module.css";

type PropsType = {
    usersQuantity: number
    pageSize: number
    users: Array<UsersType>
    changedPage: (page: number) => void
    currentPage: number
    followAC: (userId: number) => void
    unfollowAC: (userId: number) => void
}
const Users: React.FC<PropsType> = (props) => {

    let pagesCount = Math.ceil(props.usersQuantity / props.pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <>
        <h2 className={s.headContainer}>SamuraiAPI users</h2>
        <div className={s.container}>
            <div>
                {pages.map(p => {
                        return <span onClick={() => {
                            props.changedPage(p)
                        }} className={props.currentPage === p ? s.selectedPage : ""}>{p}</span>
                    }
                )}
            </div>
            {
                props.users.map(u => <div key={u.id}>
                        <NavLink to={"/profile/" + u.id}>
                            <img src={u.photos.small ? u.photos.small : usersPhoto} alt="user photo"/>
                        </NavLink>
                        <div>
                            {u.followed
                                ? <button onClick={() => {
                                    props.unfollowAC(u.id)
                                }
                                }>Unfollow</button>
                                : <button onClick={() => {
                                    props.followAC(u.id)
                                }
                                }>Follow</button>
                            }
                        </div>
                        <div>
                            <div>
                                <span>{u.name}</span> and id is {u.id}
                            </div>
                            <div>
                                <span>{u.status}</span>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    </>
}

export default Users;