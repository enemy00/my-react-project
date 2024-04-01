import * as React from "react";
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import profileIcon from "../../pictures/profileicon.png";
import dialogsIcon from "../../pictures/dialogsicon.png";
import usersIcon from "../../pictures/usersicon.jpg";
import cinemaIcon from "../../pictures/cinemaicon.jpg";
import phAPIIcon from "../../pictures/phapiicon.png";
import ghAPIIcon from "../../pictures/ghapiicon.jpg";

const Navbar: React.FC = () => {

    return (
        <div className={s.appNav}>
            <ul>dsasdasd
                <div>
                    <li>
                        <img src={profileIcon} alt="profile-icon"/><NavLink to="/profile">Profile</NavLink>
                    </li>
                </div>
                <div>
                    <li>
                        <img src={dialogsIcon} alt="dialogs-icon"/><NavLink to="/dialogs">Dialogs</NavLink>
                    </li>
                </div>
                <div>
                    <li>
                        <img src={usersIcon} alt="users-icon"/><NavLink to="/users">Users</NavLink>
                    </li>
                </div>
                <div>
                    <li>
                        <img src={cinemaIcon} alt="watch-icon"/><NavLink to="/watch">Watch</NavLink>
                    </li>
                </div>
                <div>
                    <li>
                        <img src={phAPIIcon} alt="phUsers-icon"/><NavLink to="/phUsers">Ph users</NavLink>
                    </li>
                </div>
                <div>
                    <li>
                        <img src={ghAPIIcon} alt="github-icon"/><NavLink to="/github">Github users</NavLink>
                    </li>
                </div>
            </ul>
        </div>
    )
}

export default Navbar;
