import {Action, combineReducers} from 'redux';
import dialogsReducer from "./dialogsReducer";
import navbarReducer from "./navbarReducer";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import {thunk as thunkMiddleware, ThunkAction} from "redux-thunk";
import {reducer as formReducer} from "redux-form"
import resourcesReducer from "./resourcesReducer";
import appReducer from "./appReducer";
import footerReducer from "./footerReducer";
import {configureStore, Tuple} from "@reduxjs/toolkit";
import githubReducer from "./githubReducer";
import starWarsReducerTest from "./starwarsReducerTest";


const reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    navbar: navbarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    starWars: starWarsReducerTest,
    resources: resourcesReducer,
    app: appReducer,
    footer: footerReducer,
    github: githubReducer
})

type ReducersType = typeof reducers
export type AppStateType = ReturnType<ReducersType>


export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export type CommonThunkType<A extends Action, R = Promise<void | boolean>> = ThunkAction<R, AppStateType, unknown, A>
export const store = configureStore({
    reducer: reducers,
    middleware: () => {
        return new Tuple(thunkMiddleware)
    }
})
// @ts-ignore
window.store = store;

