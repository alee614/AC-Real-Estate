import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';

import User from "../User/User";

class Google extends Component{
    constructor(){
        super();
        this.state = {
            isSignedIn : false,
            accessToken : "",
            name : "",
            email : "",
        };
        this.login = this.login.bind(this);
        this.handleLoginFailure = this.handleLoginFailure.bind(this);
        this.logout = this.logout.bind(this);
        this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
        this.addUser = this.addUser.bind(this);
    }
 
    addUser = () =>{
        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type' : 'application/json'},
            body: JSON.stringify({ email : this.state.email})
        };
        fetch("http://localhost:80/newuser", requestOptions)
        .then( response => {
            if (!response.ok){
                throw new Error("there is an error")
            }
            return response.json()
        })
        .then(result =>{
            console.log(result);
        })
        .catch(error => {
            console.log("There has been a problem with fetch operation:", error);
    })
    }

    login(response) {
        console.log(response.profileObj);
        this.setState(state => ({
            isSignedIn: true,
            accessToken: response.accessToken,
            name : response.profileObj.name,
            email : response.profileObj.email,

        }))
        console.log(this.state);
        this.addUser();
    };

    logout (response) {
        console.log(response);
        this.setState({
            isSignedIn: false,
            accessToken : "",
            name : "",
            email : "",
        });
        console.log(this.state);
    }

    handleLoginFailure(response){
        alert('Cannot login!')
    }

    handleLogoutFailure (response){
        alert('Failed to log out!')
    };

    render() {
        const clientId = '485697686917-su1ktpug9bices7te807k3g8tc16nbnb.apps.googleusercontent.com';
        <User name={this.state.name} />   

        return(
            <div>
                {this.state.isSignedIn ? 
                <GoogleLogout
                    clientId = {clientId}
                    buttonText='Logout'
                    onLogoutSuccess= { this.logout }
                    onFailure = {this.handleLogoutFailure}>
                    </GoogleLogout> : <GoogleLogin
                    clientId = {clientId}
                    buttonText='Login'
                    onSuccess= { this.login }
                    onFailure= { this.handleLoginFailure }
                    cookiePolicy={'single_host_origin'}
                    responseType='code.token'>

                    </GoogleLogin>
                    }
                <div>{this.state.isSignedIn ? `welcome back ${this.state.name}` : null}</div>
            </div>
        )
    }; 
}
export default Google;