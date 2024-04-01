import * as React from "react";
import s from "./Footer.module.css";
import {NavLink} from "react-router-dom";
import telegram from "../pictures/tg.png";
import vk from "../pictures/vk.png";
import youtube from "../pictures/youtube.png";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

type MapStatePropsType = {
    userId: number | null
}

const Footer: React.FC<MapStatePropsType> = (props) => {

    return <footer className={s.footer}>
        <div className={s.menuContainer}>Menu:</div>
        <div className={s.menu}>
            <ul>
                <NavLink to="/profile">
                    <li>Profile</li>
                </NavLink>
                <NavLink to="/dialogs">
                    <li>Dialogs</li>
                </NavLink>
                <NavLink to="/users">
                    <li>Users</li>
                </NavLink>
            </ul>
            <div>
                <ul>
                    <NavLink to="/starwars">
                        <li>Star Wars</li>
                    </NavLink>
                    <NavLink to="/watch">
                        <li>Watch</li>
                    </NavLink>
                    <NavLink to="/mainUsers">
                        <li>Ph users</li>
                    </NavLink>
                    <NavLink to="/github">
                        <li>Github users</li>
                    </NavLink>
                </ul>
            </div>
        </div>
        <div className={s.footerBlock}>
            <div className={s.contactUs}>
                <h3>Contact Us</h3>
                <p>Email: info@000.com</p>
                <p>Phone: +000</p>
            </div>
            <div className={s.followUs}>
                <h3>My socials</h3>
                <div className={s.socials}>
                    <ul>
                        <li><NavLink to={`/socials/telegram/${props.userId}`}>
                            <img src={telegram} alt="telegram"/>
                        </NavLink>
                        </li>
                        <li><NavLink to={`/socials/vk/${props.userId}`}>
                            <img src={vk} alt="vk"/>
                        </NavLink>
                        </li>
                        <li><NavLink to={`/socials/youtube/${props.userId}`}>
                            <img src={youtube} alt="youtube"/>
                        </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
}


const mapState = (state: AppStateType) => ({
    userId: state.auth.userId
})
export default connect<MapStatePropsType, {}, {}, AppStateType>(mapState, {})(Footer);