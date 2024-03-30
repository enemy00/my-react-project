import * as React from "react";

type PropsType = {
    message: string
    likesCount: number
}
const Posts: React.FC<PropsType> = (props) => {
    return (
        <div>
            <img alt="image"
                 src="https://gas-kvas.com/uploads/posts/2023-02/1675343501_gas-kvas-com-p-art-risunki-dlya-yutuba-28.jpg"/>
            {props.message}
            <div>
                likes: {props.likesCount}
            </div>
        </div>
    )
}
export default Posts;
