import React, { Component } from 'react';
import FormRegister from '../form-register/FormRegister';
import FormUpdate from '../form-update/FormUpdate';
import './DialogRegister.css';

class DialogRegister extends Component {

    hideDialog() {
        this.props.controlVisibility();
        this.props.afterUpdate();
    }

    render() { 
        if (this.props.update) {
            return <div 
                className="dialog-register" 
                style={{display: this.props.visible ? 'block' : 'none'}}
            >          
                <FormUpdate
                    afterUpdate={this.props.createUser} 
                    userToUpdate={this.props.userToUpdate} 
                    closeDialog={this.hideDialog.bind(this)}
                />
                <button className="btn-cancel" onClick={this.hideDialog.bind(this)}>
                    Cancel
                </button>
            </div>;
        } else {
            return <div 
                className="dialog-register" 
                style={{display: this.props.visible ? 'block' : 'none'}}
            >            
                <FormRegister 
                    createUser={this.props.createUser} 
                    closeDialog={this.hideDialog.bind(this)}
                />
                <button className="btn-cancel" onClick={this.hideDialog.bind(this)}>
                    Cancel
                </button>
            </div>;
        }        
    }
}
 
export default DialogRegister;