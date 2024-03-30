import s from "./Profile.module.css";
import * as React from "react";


type PropsType = {
    isOwner: boolean
}
const HeadProfileBlock: React.FC<PropsType> = (props) => {
    const date = new Date()

    const onSizeChange = () => {
        let size = (document.getElementById("size") as HTMLInputElement).value
        let image = (document.getElementById("pic") as HTMLInputElement)
        image.width = 1 + 20 * +size

    }
    return <>
        <div className={s.alwaysProfileBlock}>
            <img alt="image is here"
                 id="pic" src="https://images.hdqwalls.com/download/sunset-tree-red-ocean-sky-7w-2880x1800.jpg"/>
            <div>{props.isOwner ? <input defaultValue={20} onChange={onSizeChange} type={"range"} min={1} max={40} id="size"/>
                : null}</div>
            <div className={s.date}>{date.toDateString()}</div>
        </div>
    </>

}
export default HeadProfileBlock;