import React, {Component} from 'react';
import "./Navbar.css";
import Google from "../Google/Google";

class Navbar extends Component{
    constructor(){
        super();
        this.state = {
            click: false,
            userid: 0,
        }
        this._clicked = this._clicked.bind(this);
    }

    _clicked(){
        this.setState(
            this.click = !this.click
        )
    }
    
    render(){
    return(
        <header className="top-bar">
            <div className="top-bar-row ">
                <section className="heading">
                    <div className="title">Animal Crossing Real Estate</div>
                 </section>
                <section className="tool-bar" role="toolbar">
                    <button className="custom-btn-nav" onClick={() => {window.location.href = "/"}}>Home</button>
                    <button className="custom-btn-nav" onClick={() => {window.location.href = "/search"}}>Search</button>
                    <button className="custom-btn-nav" onClick={() => {window.location.href = `/user`}}>User</button>
                    <Google />
                </section>
  </div>
</header>


/* 
            <nav className='navbar'>
                <Link to="/category/personality" className='navbar-logo'>
                    Personality
                </Link>
                <Link to="/category/theme">
                    Theme
                </Link>
                <Link to="/category/species">
                    Species
                </Link>

                <div className='menu-icon' onClick={this._clicked}>
                    <i className={this.click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className = {this.click ? 'nav-menu active' : 'nav-menu'}>
                    <li class>

                    </li>
                </ul>
            </nav> */
    )
    }
}

export default Navbar;
