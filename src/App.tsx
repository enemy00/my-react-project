import * as React from "react";
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Movies from "./Components/Movies/Movies";
import Footer from "./Footer/Footer";
import {compose} from "redux";
import {connect, Provider} from "react-redux";
import LoadingBlock from "./Components/Preloader/Preloader";
import {withRouter, WithRouterProps} from "./hocs/withRouter";
import PostsContainer from "./Components/PhItems/PostsContainer";
import Posts from "./Components/PhItems/Posts";
import {initializeApp} from "./redux/appReducer";
import Conversations from "./Components/Dialogs/Convo";
import {AppStateType, store} from "./redux/redux-store";
import Github from "./Components/Github/Github";
import GithubLogin from "./Components/Github/GithubLogin";
import {lazy, useEffect} from "react";
import {withSuspense} from "./hocs/withSuspense";
import WatchItems from "./Components/Movies/WatchItems";
import PhUsersContainer from "./Components/PhItems/PhUsersContainer";
import UsersContainerWithHooks from "./Components/Users/UsersContainerWithHooks";
import HeaderContainerWithHooks from "./Components/Header/HeaderContainerWithHooks";
import LoginContainer from "./Components/Login/LoginContainer";

type MapStatePropsType = {
    initialized: boolean

}
type MapDispatchPropsType = {
    initializeApp: () => void
}

const ProfileContainer = lazy(() => import("./Components/Profile/ProfileContainerWithHooks"))
const DialogsContainer = lazy(() => import("./Components/Dialogs/DialogsContainer"))

const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedDialogs = withSuspense(DialogsContainer)

const App: React.FC<MapStatePropsType & MapDispatchPropsType & WithRouterProps> = (props) => {

    useEffect(() => {
        props.initializeApp()
    }, []);

    if (!props.initialized) {
        return <LoadingBlock/>
    }
    return (
        <div className="app">
            <HeaderContainerWithHooks/>
            <Navbar/>
            <div className="app-content">
                <Routes>
                    <Route path="/profile/:userId?" element={<SuspendedProfile/>}/>
                    <Route path="/" element={<Navigate to={"/profile"}/>}/>
                    <Route path="/dialogs" element={<SuspendedDialogs/>}/>
                    <Route path="/dialogs/convo/:userId?" element={<Conversations/>}/>
                    <Route path="/login" element={<LoginContainer/>}/>
                    <Route path="/users" element={<UsersContainerWithHooks/>}/>
                    <Route path="/phUsers" element={<PhUsersContainer/>}/>
                    <Route path="/watch" element={<WatchItems/>}/>
                    <Route path="/watch/movies/:movieId?" element={<Movies/>}/>
                    <Route path="/phUsers/posts/:postId?" element={<PostsContainer/>}/>
                    <Route path="/phUsers/posts/:postId?/comments" element={<Posts/>}/>
                    <Route path="/github" element={<Github/>}/>
                    <Route path="/githubLogin" element={<GithubLogin/>}/>
                    <Route path="*" element={<Navigate to={"/profile"}/>}/>
                </Routes>
            </div>
            <Footer/>
        </div>
    )
}


const mapState = (state: AppStateType) => ({
    initialized: state.app.initialized,

})

const AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapState, {initializeApp}))(App)

const EnemyApp = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}
export default EnemyApp;
