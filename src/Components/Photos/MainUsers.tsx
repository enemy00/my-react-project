import * as React from "react";
import s from "./MainUsers.module.css";
import users from "../../pictures/userss.png";
import {NavLink} from "react-router-dom";
import {UserType} from "../../redux/resourcesReducer";


type PropsType = {
    users: Array<UserType>
    getUsers: () => void
}
const MainUsers: React.FC<PropsType> = (props) => {

    return <>
        <h2 className={s.headContainer}>PlaceholderAPI users</h2>
        <div className={s.usersContainer}>

            {props.users.slice(0, 3).map(u => {
                return <div key={u.id}>
                    <NavLink to={`/mainUsers/posts/${u.id}`}>
                        <div className={s.container}>
                        <span>
                        <img src={users} alt="Image"/>
                        </span>
                        </div>
                    </NavLink>
                    <div className={s.infoContainer}>
                        <div className={s.usersInfo}>
                        <span>
                            <div className={s.info}>Information about person:</div>
                            <div className={s.someInfo}>
                            Real name: {u.name}
                                <div>
                            User name: {u.username}
                                    <div>
                                User website: {u.website}
                            </div>
            </div>
                            </div>
                </span>

                        </div>
                    </div>

                </div>
            })
            }

        </div>
    </>
}

export default MainUsers;