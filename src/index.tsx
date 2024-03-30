import "./index.css";
import reportWebVitals from "./reportWebVitals";
import * as ReactDOM from "react-dom/client";
import * as React from "react";
import EnemyApp from "./App";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<EnemyApp/>);

/* тут rerenderEntireTree вызывается
в 1 раз когда ком-та оживает и в него передается state
т.к для 1 раза нужен state чтобы отрисовать данные из объекта находящийся в BLL(redux)*/

reportWebVitals();
