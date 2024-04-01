import * as React from "react";
import s from "./PhUsers.module.css";
import users from "../../pictures/userss.png";
import {NavLink} from "react-router-dom";
import {UserType} from "../../redux/resourcesReducer";


type PropsType = {
    users: Array<UserType>
    getUsers: () => void
}
const PhUsers: React.FC<PropsType> = (props) => {

    return <>
        <h2 className={s.headContainer}>PlaceholderAPI users</h2>
        <div className={s.usersContainer}>
            {props.users.slice(0, 3).map(u => {
                return <div className={s.userContainer} key={u.id}>
                    <NavLink to={`/phUsers/posts/${u.id}`}>
                        <div>
                        <span>
                        <img src={users} className={s.userAvatar} alt="Image"/>
                        </span>
                        </div>
                    </NavLink>
                    <div className={s.info}>Information about person:
                        <div className={s.someInfo}>
                            <div>Real name: {u.name}
                                <div>
                                    User name: {u.username}
                                    <div>
                                        User website: {u.website}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            })
            }

        </div>
    </>
}

export default PhUsers;