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


   /* sentMessage(text) {
        let newMessage = {
            id: 4,
            message: text
        }
        this._state.dialogsPage.messages.push(newMessage);
    },

    updatedMessage(text) {
        this._state.dialogsPage.newDialogMessage = text;
    },*/

    // _addPost() {
    //     let newPost = {
    //         id: 3,
    //         message: this._state.profilePage.newPostText,
    //         likesCount: 4
    //     }
    //     this._state.profilePage.posts.push(newPost)
    //     this._callSubscriber(this._state);
    // },
    // _postMessageChanged(newText) {
    //     this._state.profilePage.newPostText = newText;
    //     this._callSubscriber(this._state); /*когда же ф-ю rerenderEntireTree кто то вызывает из вне, мы уже передаем
    // локальный state и используем его и он приходит в ф-ю rerenderEntireTree*/
    // },

}

window.store = store;
export default store;