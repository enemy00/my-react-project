import {usersAPI} from "../api/api";
import {PhotosType} from "./profileReducer";
import {CommonThunkType, InferActionsTypes} from "./redux-store";

const ADD_USERS = "ADD_USERS"
const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const PICKED_CURRENT_PAGE = "PICKED_CURRENT_PAGE"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"

export type UsersType = {
    name: string
    id: number
    photos: PhotosType
    status: string
    followed: boolean
}
const initial = {
    users: [] as Array<UsersType>,
    usersQuantity: 80,
    pageSize: 5,
    currentPage: 1,
    isFetching: false,
}
type InitialType = typeof initial
const usersReducer = (state = initial, action: ActionsTypes): InitialType => {

    switch (action.type) {
        case ADD_USERS:
            return {
                ...state,
                users: action.newUsers
            }
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                        if (u.id === action.userId) {
                            return {...u, followed: true}
                        }

                        return u;
                    }
                )
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case PICKED_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.page
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }

        default:
            return state;
    }
}
type ThunkType = CommonThunkType<ActionsTypes, Promise<void>>
type ActionsTypes = InferActionsTypes<typeof actions>
export const actions = {
    addUsersAC: (users: Array<UsersType>) => ({type: ADD_USERS, newUsers: users} as const),
    followAC: (userId: number) => ({type: FOLLOW, userId} as const),
    unfollowAC: (userId: number) => ({type: UNFOLLOW, userId} as const),
    toggleIsFetchingAC: (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const),
    pickedCurrentPageAC: (page: number) => ({type: PICKED_CURRENT_PAGE, page} as const),
}

export const getUsersTC = (currentPage: number, pageSize: number): ThunkType => async (dispatch) => {
    dispatch(actions.toggleIsFetchingAC(true))
    usersAPI.getUsers(currentPage, pageSize)
        .then(data => {
            dispatch(actions.addUsersAC(data.items))
            dispatch(actions.toggleIsFetchingAC(false))
            dispatch(actions.pickedCurrentPageAC(currentPage))
        })

}

export default usersReducer;