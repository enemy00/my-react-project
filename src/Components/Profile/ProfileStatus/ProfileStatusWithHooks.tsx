import * as React from "react";
import s from './../Profile.module.css';
import {ChangeEvent, useEffect, useState} from "react";

type PropsType = {
    statusText: string
    updateUserStatus: (status: string) => void
}
const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState("")


    useEffect(() => {
        setStatus(props.statusText)
    }, [props.statusText]);
    let toSetStatus = () => {
        setEditMode(true)
    }
    let toSaveStatus = () => {
        setEditMode(false)
    }
    props.updateUserStatus(status)

    let statusChanging = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div className={s.status}>
            {!editMode &&
                <div>
                    status: <span onClick={toSetStatus}>{props.statusText || "----"}</span>
                </div>}
            {editMode &&
                <div>
                    <input onBlur={toSaveStatus} value={status} onChange={statusChanging}/>
                </div>}
        </div>
    )
}
export default ProfileStatusWithHooks;