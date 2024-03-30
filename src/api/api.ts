import axios from "axios";
import {ProfileType} from "../redux/profileReducer";
import {UsersType} from "../redux/usersReducer";
import {CommentsType, PostType, UserType} from "../redux/resourcesReducer";
import {PeopleFactPropertiesType, PeopleType, PlanetsType} from "../redux/starwarsReducer";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "0e8fb9f9-af5e-4592-afff-afb544f01c25"
    }
})
type UsersResponseDataType = {
    items: Array<UsersType>
}


export const usersAPI = {
    async getUsers(currentPage: number, pageSize: number) {
        return instance.get<UsersResponseDataType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => res.data)
    },
}
export const profileAPI = {
    async getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`)
            .then(res => res.data)
    },
    async getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
            .then(res => res.data)
    },

}

type PeopleDataType = {
    uid: number
    name: string
    url: string
}
type GetPeopleStateResponseType = {
    results: Array<PeopleDataType>
}
type PeoplePropertiesType = {
    properties: PeopleFactPropertiesType
    description: string
    uid: number
}
type GetPeopleFactResponseType = {
    result: PeoplePropertiesType
}
type GetPlanetsResponseType = {
    results: Array<PlanetsType>
    count: number
}

type GetPeopleResponseType = {
    results: Array<PeopleType>
    count: number
}
export const swAPI = {
    async getPeopleState() {
        return axios.get<GetPeopleStateResponseType>("https://www.swapi.tech/api/people")
            .then(res => res.data)
    },
    async getPeopleFact(id: number) {
        return axios.get<GetPeopleFactResponseType>(`https://swapi.tech/api/people/${id}`)
            .then(res => res.data)
    },
    async getPlanets(id: number | string) {
        return axios.get<GetPlanetsResponseType>(`https://swapi.dev/api/planets/?page=${id}`)
            .then(res => res.data)
    },
    async getPeople(id: number | string) {
        return axios.get<GetPeopleResponseType>(`https://swapi.dev/api/people/?page=${id}`)
            .then(res => res.data)
    }
}

export const phAPI = {
    async getPost(postId = 3) {
        return axios.get<PostType>(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then(res => res.data)
    },
    async getPostsComments(postId = 3) {
        return axios.get<Array<CommentsType>>(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
            .then(res => res.data)
    },
    async getUser(id: number) {
        return axios.get<UserType>(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(res => res.data)
    },
    async getUsers() {
        return axios.get<Array<UserType>>("https://jsonplaceholder.typicode.com/users")
            .then(res => res.data)
    },
    async getComments() {
        return axios.get<Array<CommentsType>>("https://jsonplaceholder.typicode.com/comments")
            .then(res => res.data)
    }
}









