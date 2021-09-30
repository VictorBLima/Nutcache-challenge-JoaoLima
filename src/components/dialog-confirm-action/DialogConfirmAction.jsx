import React, { Component } from 'react';
import './DialogConfirmAction.css';

class DialogConfirmAction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showDialog: this.props.showDialog
        };
    }

    closeDialog() {
        const newState = this.state;
        newState.showDialog = false;
        this.setState(newState);
    }

    doAction() {
        this.props.onConfirmation(true);
        this.closeDialog();
    }

    cancelAction() {
        this.props.onConfirmation(false);
        this.closeDialog();
    }

    render() { 
        return <div 
            className="dialog-confirm-action" 
            style={{display: this.props.showDialog ? 'block' : 'none'}}
        >          
            <p>Do you confirm this action ?</p>
            <button className="btn-confirm" onClick={this.doAction.bind(this)}>
                Confirm
            </button>
            <button className="btn-cancel-confirmation" onClick={this.cancelAction.bind(this)}>
                Cancel
            </button>
        </div>;
    }

}
 
export default DialogConfirmAction;