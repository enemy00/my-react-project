import * as React from "react";
import s from "./items.module.css";
import {getPeopleFact, PeopleFactType} from "../../redux/starwarsReducer";
import {compose} from "redux";
import {withRouter, WithRouterProps} from "../../hocs/withRouter";
import {connect} from "react-redux";
import LoadingBlock from "../Preloader/Preloader";
import {useEffect, useState} from "react";
import {AppStateType} from "../../redux/redux-store";
import sw from "../../common/sw.mp4";
import user from "../../pictures/user.jpg";
import {CommentsType, getComments} from "../../redux/resourcesReducer";
import likesIcon from "../../pictures/likesicon.png";
import {withAuthRedirect} from "../../hocs/withAuthRedirect";

const Video = () => {
    return (
        <div className={s.videoBlock}>
            <video src={sw} width={700} height={400} controls={true}
                   autoPlay={false}/>
        </div>

    )
}

type MapStatePropsType = {
    peopleFact: PeopleFactType | null
    comments: Array<CommentsType>
}
type MapDispatchPropsType = {
    getPeopleFact: (movieId: string) => void
    getComments: () => void
}

const Movies: React.FC<MapStatePropsType & MapDispatchPropsType & WithRouterProps> = (props) => {

    const [movieLikesCount, setMovieLikesCount] = useState(1293)

    const movieId = props.params.movieId;
    useEffect(() => {
        props.getPeopleFact(movieId)
    }, []);

    useEffect(() => {
        props.getComments()
    }, []);


    if (!props.peopleFact) {
        return <LoadingBlock/>
    }
    return (
        <>
            <div className={s.movie}>
                <div className={s.movieContainer}>
                    <h3>Movie name: Star wars</h3>
                    <div className={s.imageAndLikes}>
                        <img src="https://w.forfun.com/fetch/f8/f8e73717be7ef8b98d69ec80802977b0.jpeg" alt="image"/>
                        <div className={s.likes}>Liked:<span>{movieLikesCount}</span><img onClick={() => {
                            setMovieLikesCount(prev => prev + 1)
                        }} src={likesIcon} alt="likes-icon"/></div>
                    </div>
                </div>
                <div className={s.description}><span>Description: {props.peopleFact.description}</span>
                    <div>Which SW hero plays it: {props.peopleFact.properties.name}</div>
                    <span className={s.movieInfo}><p>After learning the terrible news that the Empire has built and
                        is going to test a new combat space A station with incredible firepower capable of
                        single-handedly destroying entire planets, the highestThe Rebel Alliance command was shocked to
                        realize the hopelessness of their situation. But
                        a group of fighters, in the person of former criminal Jean Erso, who at the age of
                        fifteen remained full
                        an orphan, after which, trying to survive in harsh conditions, she became a thief, as well as a captain
                        The Rebel Alliance of Cassian Andor, tormented by doubts due to events that happened in the distant
                        past, decides to assemble a special squad, which will be given a difficult task: to steal
                        secret blueprints of the unique weapons of the Imperials.
                        Despite the fact that the secret mission, at first glance, seemed completely impossible, small
                        The rebel group was ready to take risks in order to achieve the desired victory in the war.
                        At that moment, our
                        the heroes could not even imagine that in response to their daring actions, the Empire would send
                        A punitive group led by the powerful and ruthless Darth Vader, who by his
                        direct participation reduces the chances of success of the rebel mission to zero.</p>
                    </span>
                </div>
            </div>
            <Video/>
            <div className={s.comments}>
                {props.comments.slice(0, 3).map(c => {
                    return <div className={s.comment} key={c.id}>
                        <img src={user} alt="user image"/>
                        <span>Person with id {c.id} has written this</span>: {c.body}
                    </div>
                })}
            </div>
        </>
    )
}

const mapState = (state: AppStateType) => ({
    peopleFact: state.starWars.peopleFact,
    comments: state.resources.comments
})
export default compose<React.ComponentType>(
    withAuthRedirect,
    withRouter,
    connect(mapState, {getPeopleFact, getComments}))(Movies);
