/*
import * as React from "react";

class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: ""
    }

    toSetStatus = () => {
        this.setState({
            editMode: true
        })
    }
    toSaveStatus = () => {
        this.setState({
            editMode: false
        })
        this.props.updateUserStatus(this.state.status)
    }


    statusChanging = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <span onDoubleClick={this.toSetStatus}>{this.props.statusText}</span>}

                {this.state.editMode && <div>
                    <input onBlur={this.toSaveStatus} placeholder="type ur status" value={this.state.status}
                           onChange={this.statusChanging}/>
                </div>}
            </div>
        )
    }
}

export default ProfileStatus;*/
