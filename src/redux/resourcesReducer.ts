import {phAPI} from "../api/api";
import {CommonThunkType, InferActionsTypes} from "./redux-store";

const SET_POSTS = "SET_POSTS";
const SET_USERS = "SET_USERS";
const SET_USER = "SET_USER";
const SET_POSTS_COMMENTS = "SET_POSTS_COMMENTS";

export type PostType = {
    userId: number
    id: number
    title: string
    body: string
}
export type AddressType = {
    street: string
    suite: string
    city: string
    zipcode: number
}

export type UserType = {
    id: number
    name: string
    username: string
    email: string
    address: AddressType
    website: string

}
export type CommentsType = {
    postId: number
    id: number
    name: string
    email: string
    body: string
}

const initial = {
    user: null as UserType | null,
    post: {} as PostType,
    comments: [] as Array<CommentsType>,
    users: [] as Array<UserType>,
}
type InitialType = typeof initial
const resourcesReducer = (state = initial, action: ActionsTypes): InitialType => {

    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                post: action.post
            }
        case SET_POSTS_COMMENTS:
            return {
                ...state,
                comments: action.postsComments
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }

        case SET_USER:
            return {
                ...state,
                user: action.user
            }
        default:
            return state;
    }
}
type ThunkType = CommonThunkType<ActionsTypes, Promise<void>>
type ActionsTypes = InferActionsTypes<typeof actions>
const actions = {
    setPostsComments: (postsComments: Array<CommentsType>) => ({type: SET_POSTS_COMMENTS, postsComments} as const),
    setPost: (post: PostType) => ({type: SET_POSTS, post} as const),
    setUsers: (users: Array<UserType>) => ({type: SET_USERS, users} as const),
    setUser: (user: UserType) => ({type: SET_USER, user} as const)
}


export const getPost = (postId: number): ThunkType => async(dispatch) => {
    phAPI.getPost(postId)
        .then(data => {
            dispatch(actions.setPost(data))
        })
}

export const getPostsComments = (postId: number): ThunkType => async(dispatch) => {
    phAPI.getPostsComments(postId)
        .then(data => {
            dispatch(actions.setPostsComments(data))
        })
}

export const getUsers = (): ThunkType => async(dispatch) => {
    phAPI.getUsers()
        .then(data => {
            dispatch(actions.setUsers(data))
        })
}

export const getUser = (id: number): ThunkType => async(dispatch) => {
    phAPI.getUser(id)
        .then(data => {
            dispatch(actions.setUser(data))
        })
}
export const getComments = (): ThunkType => async(dispatch) => {
    phAPI.getComments()
        .then(data => {
            dispatch(actions.setPostsComments(data));
        })
}
export default resourcesReducer;