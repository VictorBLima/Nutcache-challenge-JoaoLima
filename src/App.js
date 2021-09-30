import React, { Component } from 'react';
import './assets/App.css';
import DialogRegister from './components/dialog-register/DialogRegister';
import UserList from './components/user-list/UserList';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      ApiRouteLocal: 'http://localhost:3001/api/users',
      ApiRouteOnline: 'https://crudcrud.com/api/37bc46b73e1c4b709280b5ce9938bd20/nutemployee/',
      dialogVisible: false,
      users: [],
      isUpdate: false,
      userToUpdate: {
        _id: '',
        name: '',
        birth: '',
        email: '',
        start: '',
        cpf: '',
        team: ''
      }
    };
  }

  getUsers() {
    fetch(`${this.state.ApiRouteLocal}/list`, {
        method: "GET",
        headers: {
          Accept: "application/form-data",
          "Content-Type": "application/json; charset=utf-8",
        }
    })
      .then((res) => res.json())
      .then((result) => {
          console.log('users: ', result);
          const currentState = this.state;
          currentState.users = result;
          this.setState(currentState);
      });
  }

  componentDidMount() {
    this.getUsers();
  }

  showDialog() {
    const newState = this.state;
    newState.dialogVisible = newState.dialogVisible === true ? false : true;
    this.setState(newState);
  }

  updateUser(user) {
    // get current state
    const currentState = this.state;
    // set user to update its data
    currentState.userToUpdate = user;
    // open the dialog to update the user    
    currentState.dialogVisible = true;
    // set the user to be updated
    currentState.isUpdate = !currentState.isUpdate;
    // update the state
    this.setState(currentState);
  }
  
  afterUpdate() {
    // get current state    
    const currentState = this.state;
    // close the dialog
    currentState.dialogVisible = false;
    // set false to user update
    currentState.isUpdate = false;
    // update state with new data
    this.setState(currentState);
  }

  render() { 
    return (
      <div className="app-container">    
        <button className="btn-create_user" onClick={this.showDialog.bind(this)}>
          Create user
        </button>  
        <UserList 
          users={this.state.users} 
          updateUserList={this.getUsers.bind(this)} 
          updateUser={this.updateUser.bind(this)} 
        />
        <DialogRegister 
          visible={this.state.dialogVisible} 
          controlVisibility={this.showDialog.bind(this)}
          createUser={this.getUsers.bind(this)}
          userToUpdate={this.state.userToUpdate}
          update={this.state.isUpdate}
          afterUpdate={this.afterUpdate.bind(this)}
        />        
      </div>
    );
  }

}
 
export default App;
