import * as React from "react";
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import UsersContainer from "./Components/Users/UsersContainer";
import Login from "./Components/Login/Login";
import HeaderContainer from "./Components/Header/HeaderContainer";
import Movies from "./Components/Movies/Movies";
import Footer from "./Footer/Footer";
import {compose} from "redux";
import {connect, Provider} from "react-redux";
import LoadingBlock from "./Components/Preloader/Preloader";
import {withRouter, WithRouterProps} from "./hocs/withRouter";
import PostsContainer from "./Components/Photos/PostsContainer";
import Posts from "./Components/Photos/Posts";
import {initializeApp} from "./redux/appReducer";
import MainUsersContainer from "./Components/Photos/MainUsersContainer";
import Conversations from "./Components/Dialogs/Convo";
import {AppStateType, store} from "./redux/redux-store";
import Github from "./Components/Github/Github";
import GithubLogin from "./Components/Github/GithubLogin";
import {lazy} from "react";
import {withSuspense} from "./hocs/withSuspense";
import WatchItems from "./Components/Movies/WatchItems";

type MapStatePropsType = {
    initialized: boolean

}
type MapDispatchPropsType = {
    initializeApp: () => void
}

const ProfileContainer = lazy(() => import("./Components/Profile/ProfileContainer"))
const DialogsContainer = lazy(() => import("./Components/Dialogs/DialogsContainer"))

const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedDialogs = withSuspense(DialogsContainer)

class App extends React.Component<MapStatePropsType & MapDispatchPropsType & WithRouterProps> {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <LoadingBlock/>
        }
        return (
            <div className="app">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-content">
                    <Routes>
                        <Route path="/profile/:userId?" element={<SuspendedProfile/>}/>
                        <Route path="/" element={<Navigate to={"/profile"}/>}/>
                        <Route path="/dialogs" element={<SuspendedDialogs/>}/>
                        <Route path="/dialogs/convo/:userId?" element={<Conversations/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/users" element={<UsersContainer/>}/>
                        <Route path="/phUsers" element={<MainUsersContainer/>}/>
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
