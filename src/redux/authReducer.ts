import {CommonThunkType, InferActionsTypes} from "./redux-store";

const SET_AUTH = "SET_AUTH";


const initial = {
    isAuth: false,
    userId: null as number | null,
    login: null as string | null,
}

type InitialType = typeof initial;
const authReducer = (state = initial, action: ActionsTypes): InitialType => {
    switch (action.type) {
        case SET_AUTH:
            return {
                ...state,
                ...action.data,
            }
        default:
            return state;
    }
}
type ThunkTypeFormBooleanPromise = CommonThunkType<ActionsTypes, Promise<boolean>>
type ThunkType = CommonThunkType<ActionsTypes, Promise<void>>
type ActionsTypes = InferActionsTypes<typeof actions>
const actions = {
    setAuth: (userId: number | null, login: string | null, isAuth: boolean) => ({
        type: SET_AUTH,
        data: {userId, login, isAuth}
    } as const)
}

export const whoAmI = (): ThunkTypeFormBooleanPromise => (dispatch) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
            let data = {
                userId: 29746,
                login: "enemy00"
            }
            dispatch(actions.setAuth(data.userId, data.login, true))
        }, 2000)
    })
}


export const loginMe = (authLogin: string, authPassword: string, rememberMe: boolean): ThunkTypeFormBooleanPromise => (dispatch) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)
            if (authLogin === "enemy00" && authPassword === "enemy00" && rememberMe) {
                dispatch(whoAmI())
                    .then(() => resolve(true))
            }
        }, 2000)
    })
}

export const logout = (): ThunkType => async (dispatch) => {
    setTimeout(() => {
        debugger
        dispatch(actions.setAuth(null, null, false))
    }, 2000)
}
export default authReducer;