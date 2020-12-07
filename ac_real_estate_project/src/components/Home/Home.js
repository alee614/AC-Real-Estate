import React, { Component } from "react";
import './Home.css';
import {withRouter} from "react-router";

import real_estate from "../../assets/images/real_estate.png";


class Home extends Component{
    constructor(){
        super();
        this._handleClick = this._handleClick.bind(this);  
    }

    
    _handleClick(event){
        event.preventDefault();
        window.location.href = `/search`;
    }

    render(){
        return(
            <div>
                <h1>WELCOME TO THE FUTURE</h1>
                <h2>Start planning for your island today</h2>
                <div className="advertising">
                    <img src={real_estate} alt="girl on her island with a plot of land"/>
                </div>
                <div className="search">
                    <button className="custom-btn-home" onClick={this._handleClick}>Start looking now!</button>
                </div>
                
            </div>

        );
    }
}
export default withRouter(Home);