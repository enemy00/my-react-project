import * as React from "react";
import {NavLink} from "react-router-dom";
import s from "./Header.module.css";
import enemy00logo from "../../pictures/enemy00logo.jpg"

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
            <div>
                <div className={s.link}>
                    {props.isAuth
                        ? <div>{props.login} - <button onClick={props.logout}>Logout</button></div>
                        : <NavLink to={"/login"}>Login</NavLink>}
                </div>
                <img src={enemy00logo} className={s.logo} alt="logo"/>
            </div>
        </header>
    )
}

export default Header;