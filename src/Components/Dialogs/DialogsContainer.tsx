import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {compose} from "redux";
import {getUsers} from "../../redux/resourcesReducer";
import {AppStateType} from "../../redux/redux-store";
import * as React from "react";
import {withAuthRedirect} from "../../hocs/withAuthRedirect";

let mapStateToProps = (state: AppStateType) => ({
    dialogsPage: state.dialogsPage,
    users: state.resources.users
});

export default compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, {getUsers}))(Dialogs);
