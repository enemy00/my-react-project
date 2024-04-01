import * as React from "react";
import s from "../MyPosts.module.css";
import likesIcon from "../../../../pictures/likesicon.png";
import profileAva from "../../../../pictures/user.jpg";


type PropsType = {
    message: string
    likesCount: number
}
const Posts: React.FC<PropsType> = (props) => {
    return (
        <div className={s.posts}>
            <img className={s.profilePhoto} alt="image"
                 src={profileAva}/>
            <div className={s.postMessage}>{props.message}</div>
            <div className={s.postLikes}>
                Likes: {props.likesCount} <img src={likesIcon} alt="likes-icon"/>
            </div>
        </div>
    )
}
export default Posts;
