import * as React from "react";
import {Suspense} from "react";
import {AppStateType} from "../redux/redux-store";
import {connect} from "react-redux";
import LoadingBlock from "../Components/Preloader/Preloader";

type MapStatePropsType = {
    isFetching: boolean
}
type MapDispatchPropsType = {}
const mapState = (state: AppStateType) => ({
    isFetching: state.usersPage.isFetching
})

export function withSuspense<WCP>(Component: React.ComponentType<WCP>) {
    const SuspendedComponent: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
        return <Suspense fallback={<LoadingBlock/>}>
            <Component {...props as WCP & MapStatePropsType & MapDispatchPropsType}/>
        </Suspense>
    }
    return connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapState, {})(SuspendedComponent);
}


