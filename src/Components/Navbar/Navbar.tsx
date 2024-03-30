import * as React from "react";
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";

const Navbar: React.FC = () => {

    return (
        <div className={s.appNav}>
            <div className={s.item}>
                <NavLink to="/profile"><span>Profile</span></NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/dialogs"><span>Dialogs</span></NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/users"><span>Users</span></NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/watch"><span>Watch</span></NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/mainUsers"><span>Ph users</span></NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/github"><span>Github users</span></NavLink>
            </div>
        </div>
    )
}

export default Navbar;
