import {swAPI} from "../api/api";
import {CommonThunkType, InferActionsTypes} from "./redux-store";

const SET_PEOPLE_STATE = "SET_PEOPLE_STATE";
const SET_PEOPLE_FACT = "SET_PEOPLE_FACT";

export type PeopleFactPropertiesType = {
    name: string
    height: number
    mass: number
    hair_color: string
    skin_color: string
    eye_color: string
    birth_year: number
    gender: string
    homeworld: string
    created: number
    edited: number
    url: string
}
export type PeopleFactType = {
    properties: PeopleFactPropertiesType
    description: string
    uid: number
}
export type PeopleStateType = {
    uid: number
    name: string
    url: string
}
const initial = {
    peopleFact: null as PeopleFactType | null,
    peopleState: null as Array<PeopleStateType> | null,
}
type InitialType = typeof initial
const starWarsReducerTest = (state = initial, action: ActionsTypes): InitialType => {
    switch (action.type) {
        case SET_PEOPLE_STATE:
            return {
                ...state,
                peopleState: action.peopleState
            }

        case SET_PEOPLE_FACT:
            return {
                ...state,
                peopleFact: action.peopleFact
            }
        default:
            return state;
    }
}
type ThunkType = CommonThunkType<ActionsTypes, Promise<void>>
type ActionsTypes = InferActionsTypes<typeof actions>
const actions = {
    setPeopleState: (peopleState: Array<PeopleStateType>) => ({type: SET_PEOPLE_STATE, peopleState} as const),
    setPeopleFact: (peopleFact: PeopleFactType) => ({type: SET_PEOPLE_FACT, peopleFact} as const),
}

export const getPeopleState = (): ThunkType => async (dispatch) => {
    swAPI.getPeopleState()
        .then(data => {
            dispatch(actions.setPeopleState(data.results))
        })
}

export const getPeopleFact = (id: number): ThunkType => async (dispatch) => {
    swAPI.getPeopleFact(id)
        .then(data => {
            dispatch(actions.setPeopleFact(data.result))
        })
}


export default starWarsReducerTest;
