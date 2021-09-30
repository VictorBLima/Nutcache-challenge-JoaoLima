import React, { Component } from 'react';
import DialogConfirmAction from '../dialog-confirm-action/DialogConfirmAction';
import './UserList.css'

class UserList extends Component {

    constructor(props) {
        super(props);
        this.ApiRouteLocal = 'http://localhost:3001/api/users';
        this.ApiRouteOnline = 'https://crudcrud.com/api/37bc46b73e1c4b709280b5ce9938bd20/nutemployee/';
        this.state = {
            shouldDoConfirmation: false,
            canDeleteUser: false,
            userToDelete: null
        }
    }    

    deleteUser(user) {     
        if (this.state.canDeleteUser) {
            fetch(`${this.ApiRouteLocal}/delete/${user._id}`,
                {
                    method: "DELETE",
                    headers: {
                        Accept: "application/form-data",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ _id: user._id }),
                }
            ).then(() => {
                const newState = this.state;            
                newState.canDeleteUser = false;
                newState.userToDelete = null;
                this.setState(newState);
                this.props.updateUserList();
            });
        }        
    }

    updateUser(user) {
        this.props.updateUser(user);
    }

    handleConfirmation(actionResult) {
        const newState = this.state;
        newState.shouldDoConfirmation = false;
        newState.canDeleteUser = true;
        this.setState(newState);
        console.log('action result: ', actionResult);
        if (actionResult === true) {                
            this.deleteUser(this.state.userToDelete);        
        }      
    }

    verifyAction(user) {
        const newState = this.state;
        newState.shouldDoConfirmation = true;
        newState.userToDelete = user;
        this.setState(newState);
    }

    render() { 
        return (
            <div>
                <table className="table-users">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>E-mail</th>
                            <th>Start</th>
                            <th>Team</th>
                            <th colSpan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.users.map((user, index) => <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.start}</td>
                            <td>{user.team}</td>
                            <td>
                                <button className="button-action update" onClick={this.updateUser.bind(this, user)}>
                                    Update
                                </button>
                            </td>
                            <td>
                                <button className="button-action delete" onClick={this.verifyAction.bind(this, user)}>
                                    Delete
                                </button>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
                <DialogConfirmAction onConfirmation={this.handleConfirmation.bind(this)} showDialog={this.state.shouldDoConfirmation} />
            </div>
        );
    }
}
 
export default UserList;