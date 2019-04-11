import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import validator from 'validator'
import './Form.css';



function validate(name, email, website, user, pass, confirm) {
    const errors = [];

    if (validator.isEmpty(name)) {
        errors.push("Name may not be empty");
    }

    if (validator.isEmail(email)) {
        return true
    } else {
        errors.push("Email is invalid")
    }

    if (validator.isURL(website)) {
        return true
    } else {
        errors.push("Website is invalid");
    }

    if (validator.isEmpty(user)) {
        errors.push("Username may not be empty");
    }

    if (validator.isEmpty(pass)) {
        errors.push("Password may not be empty");
    }

    if (pass.length < 5 || pass.length > 20) {
        errors.push("Password must be at 5 to 20 characters");
    }

    if (pass !== confirm) {
        errors.push("Confirmation must match the password");
    }

    return errors;
}

class Form extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            website: '',
            user: '',
            pass: '',
            confirm: '',

            errors: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { name, email, website, user, pass, confirm } = this.state;

        const errors = validate(name, email, website, user, pass, confirm);
        if (errors.length > 0) {
            this.setState({ errors });
            return;
        }
        this.props.history.push('/submit')
    };

    render() {
        const { errors } = this.state;
        return (
            <Router>
                <form onSubmit={this.handleSubmit} className="error">
                    {errors.map(error => (
                        <p key={error}>Error: {error}</p>
                    ))}
                    <div className="page">
                        <h1>TARDIS Entry Form</h1>
                        <h4>Please fully complete this form.</h4>
                        <div className="form">
                            <div className="formSplit">
                                <div>
                                    <label htmlFor="name">What is your name?</label><br></br>
                                    <input type="text" placeholder="John Smith" name="name" id="name" value={this.state.name} onChange={evt => this.setState({ name: evt.target.value })}></input>
                                </div>
                                <div>
                                    <label htmlFor="email">What is your email?</label><br></br>
                                    <input type="email" placeholder="TheDoctor@gallifrey.com" name="email" id="email" value={this.state.email} onChange={evt => this.setState({ email: evt.target.value })}></input>
                                </div>
                                <div>
                                    <label htmlFor="website">What is your website?</label><br></br>
                                    <input type="text" placeholder="http://UNIT.gov" name="website" id="website" value={this.state.website} onChange={evt => this.setState({ website: evt.target.value })}></input>
                                </div>
                            </div>
                            <div className="formSplit">
                                <div>
                                    <label htmlFor="user">Create a username.</label><br></br>
                                    <input type="text" placeholder="JustTheDoctor" name="user" id="user" value={this.state.user} onChange={evt => this.setState({ user: evt.target.value })}></input>
                                </div>
                                <div>
                                    <label htmlFor="pass">Create a password. (5 - 20 characters)</label><br></br>
                                    <input type="text" placeholder="Buffalo" name="pass" id="pass" value={this.state.pass} onChange={evt => this.setState({ pass: evt.target.value })}></input>
                                </div>
                                <div>
                                    <label htmlFor="confirm">Please confirm your password.</label><br></br>
                                    <input type="text" placeholder="Buffalo" name="confirm" id="confirm" value={this.state.confirm} onChange={evt => this.setState({ confirm: evt.target.value })}></input>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="species" id="species">Are you a ...?</label><br></br>
                                <input type="radio" name="species" id="dalek"></input>Dalek<br></br>
                                <input type="radio" name="species" id="cyber"></input>Cyberman<br></br>
                                <input type="radio" name="species" id="human"></input>Human
                            </div>
                            <button type="submit"><Link to="./submit"></Link>Scan Me</button>
                        </div>
                    </div>
                </form>
            </Router>
        );
    }
}

export default Form