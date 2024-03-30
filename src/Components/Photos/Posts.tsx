import * as React from "react";
import s from "./Posts.module.css";
import {connect} from "react-redux";
import {CommentsType, getPostsComments} from "../../redux/resourcesReducer";
import {compose} from "redux";
import {withRouter, WithRouterProps} from "../../hocs/withRouter";
import {useEffect} from "react";
import {AppStateType} from "../../redux/redux-store";




type MapStatePropsType = {
    comments: Array<CommentsType>
}
type MapDispatchPropsType = {
    getPostsComments: (postId: string) => void
}
const Posts: React.FC<MapStatePropsType & MapDispatchPropsType & WithRouterProps> = (props) => {
    debugger
    const postId = props.params.postId;

    useEffect(() => {
        props.getPostsComments(postId)
    }, [postId]);

    return (
        <div>
            {props.comments.map(c => {
                return <div key={c.id} className={s.container}>
                    <div>
                        User name: {c.name}
                    </div>
                    <div>
                        User id: {c.id}
                    </div>
                    <div className={s.postContainer}>
                        Message post: {c.body}
                        <div>
                        <span>
                        {c.email}
                    </span>
                        </div>
                    </div>
                </div>
            })}
        </div>
    )
}

const mapState = (state: AppStateType) => ({
    comments: state.resources.comments
})

export default compose<React.ComponentType>(
    withRouter,
    connect(mapState, {getPostsComments}))(Posts)