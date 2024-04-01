import {connect} from "react-redux";
import * as React from "react";
import s from "./items.module.css"
import {NavLink} from "react-router-dom";
import {getPeopleState, PeopleStateType} from "../../redux/starwarsReducer";
import LoadingBlock from "../Preloader/Preloader";
import movie from "../../pictures/movie.jpg";
import {useEffect, useState} from "react";
import {AppStateType} from "../../redux/redux-store";


type MapStatePropsType = {
    peopleState: Array<PeopleStateType> | null
}
type MapDispatchPropsType = {
    getPeopleState: () => void
}
const WatchItems: React.FC<MapStatePropsType & MapDispatchPropsType> = ({peopleState, getPeopleState}) => {

    /* const [itemsClick, setItemsClick] = useState(false)*/
    const [selectedMood, setSelectedMood] = useState("")

    useEffect(() => {
        getPeopleState()
    }, []);


    if (!peopleState) {
        return <LoadingBlock/>
    }

    const moviesElements = peopleState.slice(0, 3).map(p => {
        return <div className={s.matched}>
            <div>Movie w/{p.name}</div>
            <div className={s.attention}>Watch the movie by clicking on the image</div>
            <NavLink to={`/watch/movies/${p.uid}`}>
                <img src={movie} className={s.item} alt="Image"/>
            </NavLink>
        </div>
    })

    /*    const serialsElements = serials.map(sr => {
            return <div className={s.matched}>
                <div>Serial name: {sr.serialName}</div>
                <NavLink to={`/watch/serials/${sr.serialId}`}>
                    <img src={sr.serialImage} className={s.item} alt="Image"/>
                </NavLink>
            </div>

        })*/


    return (
        <div className={s.container}>
            <div className={s.headContainer}>
                <label htmlFor="shape-select">Choose a shape for today:</label>
                <select onChange={(e) => {
                    setSelectedMood(e.currentTarget.value)
                }} value={selectedMood} name="shape" id="shape-select">
                    <option value="">Please choose an option</option>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="angry">Angry</option>
                    <option value="bad">Bad</option>
                </select>
            </div>
            <span>Movies which heroes from SW have played in</span>
            <div className={s.watchContainer}>
                <div className={s.qMark}>What is (SW) Star Wars?</div>
                <span>Star Wars is an American epic space opera media franchise created by George Lucas, which began
                    with the eponymous 1977 film and quickly became a worldwide pop culture phenomenon. The franchise
                    has been expanded into various films and other media, including television series, video games,
                    novels, comic books, theme park attractions, and themed areas, comprising an all-encompassing
                    fictional universe. Star Wars is one of the highest-grossing media franchises of all time.
                </span>
                <div className={s.moviesELem}>
                    {moviesElements}
                </div>
                {/*  {serialsElements}*/}
            </div>
            {/*{!itemsClick
                ? <div className={s.watchingContainer}>
                    {moviesElements}
                </div>
                : <Movies movies={movies} {...props} />}
            {!itemsClick
                ? <div className={s.watchingContainer}>
                    {serialsElements}
                </div>
                : <Serials serials={serials} {...props} />}*/}
        </div>
    )
}


let mapStateToProps = (state: AppStateType) => ({
    peopleState: state.starWars.peopleState,
    currentPage: state.starWars.currentPage
})


export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {getPeopleState})(WatchItems);