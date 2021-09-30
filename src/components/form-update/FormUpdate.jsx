import React, { Component } from 'react';
import '../form-register/FormRegister.css';

class FormUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.userToUpdate,
            ApiRouteLocal: 'http://localhost:3001/api/users',
            ApiRouteOnline: 'https://crudcrud.com/api/37bc46b73e1c4b709280b5ce9938bd20/nutemployee/',
        }
    }

    updateUser(event) {
        event.preventDefault();
        this.doUpdate(this.state.user);
    }

    handleChange({ target }) {
        const newState = this.state;
        newState.user[target.name] = target.value;
        this.setState(newState);
    }    

    doUpdate(user) {        
        fetch(`${this.state.ApiRouteLocal}/update`, {
            method: "PUT",
            headers: {
                Accept: "application/form-data",
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((result) => {
                this.props.afterUpdate(result);
                this.props.closeDialog();
            })
            .catch(error => console.log('Error while trying to update user: ', error));
    }

    render() { 
        return <form onSubmit={this.updateUser.bind(this)}>
            <section>
                <label htmlFor="name" className="label">Name: </label>
                <input type="text" name="name" className="input" onChange={this.handleChange.bind(this)} value={this.state.user.name} />
            </section>
            <section>
                <label htmlFor="birth" className="label">Birth date: </label>
                <input type="date" name="birth" className="input" onChange={this.handleChange.bind(this)} value={this.state.user.birth} />
            </section>
            <section>
                <label htmlFor="gender" className="label">Gender: </label>
                <select name="gender" id="gender" className="input" onChange={this.handleChange.bind(this)} value={this.state.user.gender}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </section>
            <section>
                <label htmlFor="email" className="label">E-mail: </label>
                <input type="email" name="email" className="input" onChange={this.handleChange.bind(this)} value={this.state.user.email} />
            </section>
            <section>
                <label htmlFor="cpf" className="label">Cpf: </label>
                <input type="text" name="cpf" className="input" onChange={this.handleChange.bind(this)} value={this.state.user.cpf} />
            </section>
            <section>
                <label htmlFor="start" className="label">Start date: </label>
                <input type="date" name="start" className="input" onChange={this.handleChange.bind(this)} value={this.state.user.start} />
            </section>
            <section>
                <label htmlFor="team" className="label">Team: </label>
                <select name="team" id="team" className="input" onChange={this.handleChange.bind(this)} value={this.state.user.team}>
                    <option value="back-end">back-end</option>
                    <option value="front-end">front-end</option>
                    <option value="mobile">mobile</option>
                </select>
            </section>
            <input type="submit" value="Update user" className="btn-submit" />
        </form>;
    }
}
 
export default FormUpdate;