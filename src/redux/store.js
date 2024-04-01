/*
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import navbarReducer from "./navbarReducer";

let callSubscriber = () => {
    alert("state changed!")
}

const store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: "hey!", likesCount: 0},
                {id: 2, message: "yo!", likesCount: 1}
            ],
            newPostText: ""
        },

        dialogsPage: {
            dialogs: [
                {id: 1, name: "Sultan"},
                {id: 2, name: "Ali"},
                {id: 3, name: "Dana"}
            ],
            messages: [
                {id: 1, message: "whats up"},
                {id: 2, message: "hey"},
                {id: 3, message: "hi"}
            ],
            newDialogMessage: ""
        },
        sidebar: {}
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },


    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = navbarReducer(this._state.sidebar, action)

        this._callSubscriber(this._state);

    },

    getState() {
        return this._state;
    },

    _callSubscriber() {
        alert("state changed!")
    }


}

window.store = store;
export default store;*/
