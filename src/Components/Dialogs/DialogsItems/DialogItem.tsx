import {NavLink} from "react-router-dom";
import * as React from "react";

type PropsType = {
    id: number
    name: string
}
const DialogItem: React.FC<PropsType> = (props) => {
    return (
        <div>
            <NavLink to={`/dialogs/convo/${props.id}`}>{props.name}</NavLink>
        </div>)

}

export default DialogItem;
