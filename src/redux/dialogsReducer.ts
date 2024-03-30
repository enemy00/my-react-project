import {InferActionsTypes} from "./redux-store";

const SENT_MESSAGE = "SENT_MESSAGE";


export type DialogsType = {
    id: number
    name: string
}
export type MessagesType = {
    id: number
    message: string
}

const initial = {
    dialogs: [
        {id: 1, name: "Sultan"},
        {id: 2, name: "Ali"},
        {id: 3, name: "Dana"}
    ] as Array<DialogsType>,
    messages: [
        {id: 1, message: "whats up"},
        {id: 2, message: "hey"},
        {id: 3, message: "hi"}
    ] as Array<MessagesType>
}

export type InitialType = typeof initial
const dialogsReducer = (state = initial, action: ActionsTypes): InitialType => {
    switch (action.type) {
        case SENT_MESSAGE:
            let newMessage = {
                id: 4,
                message: action.message,
            }
            return {
                ...state,
                messages: [...state.messages, newMessage],
            }
        default:
            return state;
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>
export const actions = {
    sentMessageAC: (message: string) => ({type: SENT_MESSAGE, message} as const),
}

export default dialogsReducer;