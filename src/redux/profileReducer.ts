import {profileAPI} from "../api/api";
import {CommonThunkType, InferActionsTypes} from "./redux-store";

const ADD_POST = "ADD_POST"
const SET_PROFILE = "SET_PROFILE"
const ADD_PROFILE_STATUS = "ADD_PROFILE_STATUS"
export type PhotosType = {
    small: string | null
    large: string | null
}
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PostsType = {
    id: number
    message: string
    likesCount: number
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    aboutMe: string
}
const initial = {
    posts: [
        {id: 1, message: "hey!", likesCount: 0},
        {id: 2, message: "yo!", likesCount: 1}
    ] as Array<PostsType>,
    newPostText: "",
    profile: null as ProfileType | null,
    statusText: "",
    error: null as string | null
}

export type InitialType = typeof initial


const profileReducer = (state = initial, action: ActionsTypes): InitialType => {

    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 3,
                message: action.newText,
                likesCount: 4
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ""
            }

        case ADD_PROFILE_STATUS:
            return {
                ...state,
                statusText: action.status
            }

        case SET_PROFILE:
            return {
                ...state,
                profile: action.profile
            }

        default:
            return state;
    }
}
type ThunkType = CommonThunkType<ActionsTypes, Promise<void>>
type ThunkTypeForBooleanPromise = CommonThunkType<ActionsTypes, Promise<boolean>>
type ActionsTypes = InferActionsTypes<typeof actions>
export const actions = {
    addPostAC: (newText: string) => ({type: ADD_POST, newText} as const),
    addProfileStatusAC: (status: string) => ({type: ADD_PROFILE_STATUS, status} as const),
    setProfileAC: (profile: ProfileType) => ({type: SET_PROFILE, profile} as const),
}

export const getUserProfile = (userId: number): ThunkType =>
    async (dispatch) => {
        profileAPI.getProfile(userId)
            .then(data => {
                dispatch(actions.setProfileAC(data))
            })
    }
export const getUserProfileStatus = (userId: number): ThunkType =>
    async (dispatch) => {
        profileAPI.getStatus(userId)
            .then(data => {
                dispatch(actions.addProfileStatusAC(data))
            })
    }
export const updateUserStatus = (status: string): ThunkTypeForBooleanPromise =>
    async (dispatch) => {
        return new Promise(resolve => {
            resolve(true)
            if (status.length >= 20) {
                return Promise.reject("Status can only be 20 symbols of length")
            } else {
                dispatch(actions.addProfileStatusAC(status))
            }
        })

    }
export const saveProfile = (profile: ProfileType): ThunkTypeForBooleanPromise =>
    async (dispatch) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true)
                dispatch(actions.setProfileAC(profile))
            }, 1000)
        })
    }


export default profileReducer;