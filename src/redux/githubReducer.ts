import {CommonThunkType, InferActionsTypes} from "./redux-store";
import {githubAPI, SearchUserType, UserDetailsType} from "../api/api";

const SET_LOGIN_DATA = "SET_LOGIN_DATA"
const SET_USER_DETAILS = "SET_USER_DETAILS"
const SET_USERS = "SET_USERS"

const initial = {
    login: null as string | null,
    password: null as string | null,
    rememberMe: false,
    isRegistered: false,
    githubUsers: [] as Array<SearchUserType>,
    githubUserDetails: {} as UserDetailsType,
    searchTerm: "enemy00",
}
type InitialType = typeof initial;

const githubReducer = (state = initial, action: ActionsTypes): InitialType => {
    switch (action.type) {
        case SET_LOGIN_DATA:
            return {
                ...state,
                ...action.data,
                isRegistered: true
            }
        case SET_USER_DETAILS:
            return {
                ...state,
                githubUserDetails: action.userDetails
            }
        case SET_USERS:
            return {
                ...state,
                githubUsers: action.users
            }
        default:
            return state
    }
}


type ThunkType = CommonThunkType<ActionsTypes>
type ThunkTypeForBoolean = CommonThunkType<ActionsTypes, Promise<boolean>>
type ActionsTypes = InferActionsTypes<typeof actions>

const actions = {
    setLoginData: (login: string, password: string, rememberMe: boolean) => ({
        type: SET_LOGIN_DATA,
        data: {login, password, rememberMe}
    } as const),
    setSearchResult: (userDetails: UserDetailsType) => ({type: SET_USER_DETAILS, userDetails} as const),
    setUsers: (users: Array<SearchUserType>) => ({type: SET_USERS, users} as const)
}
export const getLoginData = (myLogin: string, myPassword: string, rememberMe: boolean): ThunkTypeForBoolean => (dispatch, getState) => {
    const login = getState().auth.login
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)
            if (myLogin === login && myPassword === login && rememberMe) {
                dispatch(actions.setLoginData(myLogin, myPassword, rememberMe))
            }
        }, 2000)
    })
}

export const getGithubUsers = (searchResult: string): ThunkType => async (dispatch) => {
    githubAPI.getGithubUsers(searchResult)
        .then(data => {
            dispatch(actions.setUsers(data.items))
        })
}
export const getUserDetails = (searchResult: string): ThunkType => async (dispatch) => {
    githubAPI.getUserDetails(searchResult)
        .then(data => {
            dispatch(actions.setSearchResult(data))
        })
}

export default githubReducer;