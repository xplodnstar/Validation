import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import validator from 'validator'
import './Form.css';



function validate(name, email, website, user, pass, confirm, species) {
    const errors = [];

    if (validator.isEmpty(name)) {
        errors.push("Name may not be empty");
        // create state of nameErr starting as blank and add to the label
        // setState "cannot be blank". plus create a setState to clear upon fix
        // create class for label and field with alternate color. Add the class upon error
    }

    if (!validator.isEmail(email)) {
        errors.push("Email is invalid")
    }

    if (!validator.isURL(website)) {
        errors.push("Website is invalid");
    }

    if (validator.isEmpty(user)) {
        errors.push("Username may not be empty");
    }

    if (validator.isEmpty(pass)) {
        errors.push("Password may not be empty");
    }

    if (pass.length < 5 || pass.length > 20) {
        errors.push("Password must be 5 to 20 characters");
    }

    if (pass !== confirm) {
        errors.push("Confirmation must match the password");
    }

    if (species !== 'human') {
        errors.push("You are a robot!");
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
            species: '',

            errors: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleOptionChange = (e) => {
        this.setState({
            species: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let valid = true

        const { name, email, website, user, pass, confirm, species } = this.state;

        const errors = validate(name, email, website, user, pass, confirm, species);
        if (errors.length > 0) {
            valid = false
            this.setState({ errors });
            return;
        }
        if (valid === true) {
            this.props.history.push('/submit')
        }
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
                                    {/* ^ onChange could also be separate and more generic for all fields */}
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
                                <input type="radio" name="species" id="dalek" value="dalek" checked={this.state.species === 'dalek'} onChange={this.handleOptionChange}></input>Dalek<br></br>
                                <input type="radio" name="species" id="cyber" value="cyber" checked={this.state.species === 'cyber'} onChange={this.handleOptionChange}></input>Cyberman<br></br>
                                <input type="radio" name="species" id="human" value="human" checked={this.state.species === 'human'} onChange={this.handleOptionChange}></input>Human
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
