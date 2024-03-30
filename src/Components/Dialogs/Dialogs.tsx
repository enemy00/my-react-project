import * as React from "react";
import s from "./Dialogs.module.css";
import {NavLink} from "react-router-dom";
import LoadingBlock from "../Preloader/Preloader";
import {InitialType} from "../../redux/dialogsReducer";
import {UserType} from "../../redux/resourcesReducer";
import {useEffect} from "react";

type MapStatePropsType = {
    dialogsPage: InitialType
    users: Array<UserType>
}
type MapDispatchPropsType = {
    getUsers: () => void
}
const Dialogs: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    useEffect(() => {
        props.getUsers()
    }, []);

    if (!props.users) {
        return <LoadingBlock/>
    }
    return (
        <>
            <h2 className={s.headContainer}>PhAPI dialogs</h2>
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                    <span><b>Choose the person to start a dialog</b>:</span>
                    {props.users.map(u => {
                        return <div>
                            <NavLink to={`/dialogs/convo/${u.id}`}>
                        <span>
                           {u.name}
                        </span>
                            </NavLink>
                        </div>
                    })}
                </div>
                <div className={s.messages}>
                    <div className={s.textPosition}>
                        Start ur dialog now!
                    </div>
                </div>
            </div>
        </>
    )
}
export default Dialogs;