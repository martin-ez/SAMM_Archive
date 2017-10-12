import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './css/MainPage.css';
import {Accounts} from 'meteor/accounts-base'
import {Meteor} from 'meteor/meteor';
import './css/MainPage.css';


class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            texto: "",
            userName: "",
            email: "",
            password: "",
            passwordAgain: "",
            profile: {name: ""},
            mensajeError: null,
            mensajeErrorSI: null
        }
    }

    onEnterLogIn() {

        Meteor.loginWithPassword(this.state.userName, this.state.password, (error) => {
            if (error) {
                console.log(error);
                this.setState({mensajeErrorSI: "Username or password incorrect"})
            }
            else {
                console.log('Bien :D')
                this.cambiarEstadoApp();
            }
        })
        // console.log(this.state.userName, this.state.email, this.state.password, this.state.profile)
    }

    onEnterSignUp() {
        if (this.state.userName.length >= 3) {
            if (this.state.password.length >= 5) {
                if (this.state.password == this.state.passwordAgain) {
                    Accounts.createUser({
                        username: this.state.userName,
                        email: this.state.email,
                        password: this.state.password,
                        profile: this.state.profile
                    }, (error) => {
                        if (error)
                            console.log(error);
                        else
                            console.log('Bien :D')
                    })
                    this.onEnterLogIn();
                    this.cambiarEstadoApp();
                }
                else {
                    this.setState({mensajeError: "Password incorrect"})
                }
            }
            else {
                this.setState({mensajeError: "Password must have at least 5 characters"})
            }
        }
        else {
            this.setState({mensajeError: "Username must have at least 3 characters"})
        }
    }


    cambiarEstadoApp() {

        this.props.updateV('selectionView');
    }

    renderErroresDeSignUp() {
        if (this.state.mensajeError !== null) {

            return <h5 className="error">{this.state.mensajeError}</h5>
        }
        else {
            return ""
        }
    }

    renderErroresDeSignIn() {
        if (this.state.mensajeErrorSI !== null) {

            return <h5 className="error">{this.state.mensajeError}</h5>
        }
        else {
            return ""
        }
    }

    render() {
        return (
            <div className="MainPage">
                <div className="container">
                    <form className="signUp">
                        <img src="images/logo.png" alt="Logo SAMM" height="90" width="270"/>
                        <br/>
                        <p>Create your account
                        </p>
                        <input className="w100" type="userName" placeholder="Insert user name" onChange={ (event) => {
                            this.setState({userName: event.target.value, profile: {name: event.target.value}})
                        }}/>
                        <input className="w100" type="email" placeholder="Insert eMail" onChange={ (event) => {
                            this.setState({email: event.target.value})
                        }}/>
                        <input type="password" placeholder="Insert Password" onChange={ (event) => {
                            this.setState({password: event.target.value})
                        }}/>
                        <input type="password" placeholder="Verify Password" onChange={ (event) => {
                            this.setState({passwordAgain: event.target.value})
                        }}/>
                        {this.renderErroresDeSignUp()}
                        <button className="form-btn sx log-in" type="button" onClick={ (event) => {
                            event.preventDefault();
                        }}>Sign In
                        </button>
                        <button className="form-btn dx" type="submit" onClick={ (event) => {
                            event.preventDefault();
                            this.onEnterSignUp();
                        }}>Sign Up
                        </button>
                    </form>
                    <form className="signIn">
                        <img src="images/logo.png" alt="Logo SAMM" height="90" width="270"/>

                        <input type="email" placeholder="Insert eMail"/>
                        <input type="password" placeholder="Insert Password"/>
                        {this.renderErroresDeSignIn()}
                        <button className="form-btn sx back" type="button">Back</button>
                        <button className="form-btn dx" type="submit" onClick={ (event) => {
                            event.preventDefault();
                            this.onEnterLogIn()

                        }}>Sign In
                        </button>
                    </form>
                </div>
                <div className="button-container-1 demo">
                    <span className="mas demo">App for creating awesome music between people</span><a
                    href="https://www.youtube.com/watch?v=izSoM3-0JgU&list=RDizSoM3-0JgU">
                    <button id='work' type="button" name="Hover">DEMO</button>
                </a>
                </div>

            </div>
        );
    }
}


export default MainPage;
