import {createSelector} from "reselect";
import {AppStateType} from "../redux/redux-store";

const getProfileSelector = (state: AppStateType) => {
    return state.profilePage.profile
}
export const getProfile = createSelector(getProfileSelector, (profile) => {
    return profile;
})

const getStatusTextSelector = (state: AppStateType) => {
    return state.profilePage.statusText
}
export const getStatusText = createSelector(getStatusTextSelector, (statusText) => {
    return statusText;
})