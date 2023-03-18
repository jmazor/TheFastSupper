import React, { Component } from 'react';
import logo from './logo.svg';


const HomePage = () =>
{
    return(
        <div className="App">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>The Fast Supper</h2>
            </div>
            <p className="App-intro">
                Click here to log in :
            </p>
        </div>
    );
}
