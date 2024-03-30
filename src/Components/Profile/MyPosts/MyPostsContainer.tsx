import MyPosts, {MapDispatchPropsType, MapStatePropsType} from "./MyPosts";
import {connect} from "react-redux";
import {actions} from "../../../redux/profileReducer";
import {AppStateType} from "../../../redux/redux-store";

let mapStateToProps = (state: AppStateType) => ({
    profilePage: state.profilePage
});
export default connect<MapStatePropsType, MapDispatchPropsType, {},
    AppStateType>(mapStateToProps, {addPostAC: actions.addPostAC})(MyPosts);
