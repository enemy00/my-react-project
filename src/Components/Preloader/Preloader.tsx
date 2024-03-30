import loading from "../../common/loading.gif";
import * as React from "react";
import s from "./Preloader.module.css";

const LoadingBlock: React.FC = () => {
    return (
    <div className={s.loaderBlock}>
        <img src={loading} alt="Preloader"/>
    </div>
)}

export default LoadingBlock;