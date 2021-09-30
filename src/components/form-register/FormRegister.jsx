import React, { Component } from 'react';

import './FormRegister.css';

class FormRegister extends Component {

    constructor(props) {
        super(props);  
        this.state = {
            user: {
                name: '',
                birth: '',
                gender: 'male',
                email: '',
                start: '',
                cpf: '',
                team: 'back-end'
            },
            shouldDoConfirmation: false,
            ApiRouteLocal: 'http://localhost:3001/api/users',
            ApiRouteOnline: 'https://crudcrud.com/api/37bc46b73e1c4b709280b5ce9938bd20/nutemployee/',
        };    
    }

    registerUser(event) {
        // prevent form from reload the page
        event.preventDefault();      
        // call api to register new user
        this.doRegister(this.state.user);
        // reset the form for a new user registration
        event.target.reset();
    }

    doRegister(user) {
        fetch(`${this.state.ApiRouteLocal}/create`, {
            method: "POST",
            headers: {
                Accept: "application/form-data",
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((result) => {
                this.props.createUser(result);
                this.props.closeDialog();
            })
            .catch(error => console.log('Error while trying to register user: ', error));
    }

    handleChange({ target }) {
        const newState = this.state;
        newState.user[target.name] = target.value;
        this.setState(newState);
    }

    render() { 
        return <form onSubmit={this.registerUser.bind(this)}>
            <section>
                <label htmlFor="name" className="label">Name:* </label>
                <input type="text" name="name" className="input" required onChange={this.handleChange.bind(this)} />
            </section>
            <section>
                <label htmlFor="birth" className="label">Birth date:* </label>
                <input type="date" name="birth" className="input" required onChange={this.handleChange.bind(this)} />
            </section>
            <section>
                <label htmlFor="gender" className="label">Gender:* </label>
                <select name="gender" id="gender" value={this.state.user.gender} className="input" required onChange={this.handleChange.bind(this)}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </section>
            <section>
                <label htmlFor="email" className="label">E-mail:* </label>
                <input type="email" name="email" className="input" required onChange={this.handleChange.bind(this)} />
            </section>
            <section>
                <label htmlFor="cpf" className="label">Cpf:* </label>
                <input type="text" name="cpf" className="input" required onChange={this.handleChange.bind(this)} />
            </section>
            <section>
                <label htmlFor="start" className="label">Start date:* </label>
                <input type="date" name="start" className="input" required onChange={this.handleChange.bind(this)} />
            </section>
            <section>
                <label htmlFor="team" className="label">Team: </label>
                <select name="team" id="team"value={this.state.user.team} className="input" required onChange={this.handleChange.bind(this)}>
                    <option value="back-end">back-end</option>
                    <option value="front-end">front-end</option>
                    <option value="mobile">mobile</option>
                </select>
            </section>
            <input type="submit" value="Register user" className="btn-submit" />
        </form>;
    }
}
 
export default FormRegister;