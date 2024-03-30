import * as React from "react";
import s from "./Posts.module.css";
import {connect} from "react-redux";
import {getPost, getUsers, PostType, UserType} from "../../redux/resourcesReducer";
import {NavLink} from "react-router-dom";
import {compose} from "redux";
import {withRouter, WithRouterProps} from "../../hocs/withRouter";
import {useEffect} from "react";
import {AppStateType} from "../../redux/redux-store";


type MapStatePropsType = {
    post: PostType
    users: Array<UserType>
}
type MapDispatchPropsType = {
    getPost: (postId: string) => void
    getUsers: () => void
}

const PostsContainer: React.FC<MapStatePropsType & MapDispatchPropsType & WithRouterProps> = (props) => {

    const postId = props.params.postId;
    useEffect(() => {
        props.getPost(postId)
    }, [postId]);


    return (
        <div className={s.mainContainer}>
            <h4>Posts are here</h4>
            <div className={s.postsContainer}>
                <div className={s.postTitle}><b>Post theme is</b>: {props.post.title}</div>
                <div className={s.post}>The person said: {props.post.body}
                    <NavLink to={`/mainUsers/posts/${props.post.id}/comments`}>
                        <div>
                            <span className={s.postButton}>Click to take a look</span>
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
const mapState = (state: AppStateType) => ({
    post: state.resources.post,
    users: state.resources.users
})

export default compose<React.ComponentType>(
    withRouter,
    connect(mapState, {getPost, getUsers}))(PostsContainer)