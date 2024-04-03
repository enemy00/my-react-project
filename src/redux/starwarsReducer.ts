/*
import {swAPI} from "../api/api";
import {CommonThunkType, InferActionsTypes} from "./redux-store";

const SET_PEOPLE = "SET_PEOPLE";
const SET_PLANETS = "SET_PLANETS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_PEOPLE_STATE = "SET_PEOPLE_STATE";
const SET_PEOPLE_FACT = "SET_PEOPLE_FACT";
const SET_TOTAL_PEOPLE_COUNT = "SET_TOTAL_PEOPLE_COUNT";
const SET_TOTAL_PLANETS_COUNT = "SET_TOTAL_PLANETS_COUNT";

export type PeopleType = {
    name: string
}
export type PlanetsType = {
    name: string
    rotation_period: number
    orbital_period: number
    diameter: number
    climate: string
    gravity: number | unknown
    terrain: string
    surface_water: number | unknown
    population: number
    residents: Array<string>
    films: [],
    created: number
    edited: number
    url: string

}
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
    people: null as Array<PeopleType> | null,
    planets: null as Array<PlanetsType> | null,
    pageSize: 10,
    currentPage: 1 as string | number,
    peopleFact: null as PeopleFactType | null,
    peopleState: null as Array<PeopleStateType> | null,
    totalPeopleCount: 0,
    totalPlanetsCount: 0
}
type InitialType = typeof initial
const starWarsReducer = (state = initial, action: ActionsTypes): InitialType => {
    switch (action.type) {
        case SET_PEOPLE:
            return {
                ...state,
                people: action.people
            }
        case SET_PEOPLE_STATE:
            return {
                ...state,
                peopleState: action.peopleState
            }
        case SET_PLANETS:
            return {
                ...state,
                planets: action.planets
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.page
            }
        case SET_PEOPLE_FACT:
            return {
                ...state,
                peopleFact: action.peopleFact
            }
        case SET_TOTAL_PEOPLE_COUNT:
            return {
                ...state,
                totalPeopleCount: action.totalPeople
            }
        case SET_TOTAL_PLANETS_COUNT:
            return {
                ...state,
                totalPlanetsCount: action.totalPlanets
            }
        default:
            return state;
    }
}
type ThunkType = CommonThunkType<ActionsTypes, Promise<void>>
type ActionsTypes = InferActionsTypes<typeof actions>
const actions = {
    setPeople: (people: Array<PeopleType>) => ({type: SET_PEOPLE, people} as const),
    setPeopleState: (peopleState: Array<PeopleStateType>) => ({type: SET_PEOPLE_STATE, peopleState} as const),
    setPlanets: (planets: Array<PlanetsType>) => ({type: SET_PLANETS, planets} as const),
    setCurrentPage: (page: number | string) => ({type: SET_CURRENT_PAGE, page} as const),
    setPeopleFact: (peopleFact: PeopleFactType) => ({type: SET_PEOPLE_FACT, peopleFact} as const),
    setTotalPeopleCount: (totalPeople: number) => ({type: SET_TOTAL_PEOPLE_COUNT, totalPeople} as const),
    setTotalPlanetsCount: (totalPlanets: number) => ({type: SET_TOTAL_PLANETS_COUNT, totalPlanets} as const)
}

export let getPeople = (id: string | number): ThunkType => async (dispatch) => {
    swAPI.getPeople(id)
        .then(data => {
            dispatch(actions.setPeople(data.results))
            dispatch(actions.setTotalPeopleCount(data.count))
            dispatch(actions.setCurrentPage(id))
        })
}
export let getPlanets = (id: string | number): ThunkType => async (dispatch) => {
    swAPI.getPlanets(id)
        .then(data => {
            dispatch(actions.setPlanets(data.results))
            dispatch(actions.setTotalPlanetsCount(data.count))
        })
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


export default starWarsReducer;
*/
