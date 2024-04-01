import s from "./Profile.module.css";
import * as React from "react";


type PropsType = {
    isOwner: boolean
}
const HeadProfileBlock: React.FC<PropsType> = (props) => {
    const date = new Date()
    return <>
        <div className={s.alwaysProfileBlock}>
            <div className={s.date}>{date.toDateString()}</div>
        </div>
    </>

}
export default HeadProfileBlock;