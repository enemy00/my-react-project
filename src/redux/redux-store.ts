import {Action, combineReducers} from 'redux';
import dialogsReducer from "./dialogsReducer";
import navbarReducer from "./navbarReducer";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import {thunk as thunkMiddleware , ThunkAction} from "redux-thunk";
import {reducer as formReducer} from "redux-form"
import starWarsReducer from "./starwarsReducer";
import resourcesReducer from "./resourcesReducer";
import appReducer from "./appReducer";
import footerReducer from "./footerReducer";
import {configureStore, Tuple} from "@reduxjs/toolkit";
import githubReducer from "./githubReducer";


/*const middleware = []
const thunk = require("redux-thunk");
middleware.push(thunk)*/

const reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    navbar: navbarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    starWars: starWarsReducer,
    resources: resourcesReducer,
    app: appReducer,
    footer: footerReducer,
    github: githubReducer
})

type ReducersType = typeof reducers
export type AppStateType = ReturnType<ReducersType>

/*type PropertiesType<T> = T extends {[key: string] : infer U} ? U : never*/
/*export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesType<T>>*/
export type InferActionsTypes<T> = T extends {[keys: string]: (...args: any[]) => infer U } ? U : never

export type CommonThunkType<A extends Action, R = Promise<void | boolean | any>> = ThunkAction<R, AppStateType, unknown, A>
export const store = configureStore({
    reducer: reducers,
    middleware: () => {
        return new Tuple(thunkMiddleware)
    }
})
// @ts-ignore
window.store = store;

