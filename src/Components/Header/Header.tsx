import * as React from "react";
import {NavLink} from "react-router-dom";
import s from "./Header.module.css";
import glasses from "../../pictures/glasses3d.png";

export type MapStatePropsType = {
    login: string | null
    isAuth: boolean
}
export type MapDispatchPropsType = {
    logout: () => void
}
const Header: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    return (
        <header>
            <div className={s.appInfo}><span>ChatC<span className={s.fLetter}>i</span>ne<span className={s.sLetter}>m</span>a
                is the website</span><br/>where
                u can chat & search for gh users<br/> read posts & watch the star wars movies.
            </div>
            <div className={s.headerContainer}><span>ChatCine<img className={s.glasses} src={glasses} alt="glasses"/>ma</span>
            </div>
            <div className={s.link}>
                <NavLink to={"/youtube"}></NavLink>
                {props.isAuth
                    ? <div>{props.login} - <button className={s.btn} onClick={props.logout}>Logout</button></div>
                    : <NavLink to={"/login"}>Login</NavLink>}
            </div>
        </header>
    )
}

export default Header;