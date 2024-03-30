import {whoAmI} from "./authReducer";
import {CommonThunkType, InferActionsTypes} from "./redux-store";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

const initial = {
    initialized: false,
}
type InitialType = typeof initial


const appReducer = (state = initial, action: ActionsTypes): InitialType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

type ThunkType = CommonThunkType<ActionsTypes, Promise<void>>
type ActionsTypes = InferActionsTypes<typeof actions>
const actions = {
    initializedSuccess: () => ({type: INITIALIZED_SUCCESS} as const),
}


export const initializeApp = (): ThunkType => async (dispatch) => {
    dispatch(whoAmI())
        .then(() => {
            dispatch(actions.initializedSuccess())
        })
}

export default appReducer;
