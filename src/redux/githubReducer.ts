import {CommonThunkType, InferActionsTypes} from "./redux-store";

const SET_LOGIN_DATA = "SET_LOGIN_DATA"

const initial = {
    login: null as string | null,
    password: null as string | null,
    rememberMe: false,
    isRegistered: false
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
        default:
            return state
    }
}


type ThunkType = CommonThunkType<ActionsTypes>
type ActionsTypes = InferActionsTypes<typeof actions>

const actions = {
    setLoginData: (login: string, password: string, rememberMe: boolean) => ({
        type: SET_LOGIN_DATA,
        data: {login, password, rememberMe}
    } as const)
}
export const getLoginData = (myLogin: string, myPassword: string, rememberMe: boolean): ThunkType => (dispatch, getState) => {
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
export default githubReducer;