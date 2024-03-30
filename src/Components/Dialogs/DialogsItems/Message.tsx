import * as React from "react";

type PropsType = {
    message: string
}
const Message: React.FC<PropsType> = (props) => {

    return <>
        <div>
            {props.message}
        </div>
        <div>
        </div>
    </>

}

export default Message;