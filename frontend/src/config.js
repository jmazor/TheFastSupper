import React from "react";

const config = {
    url: process.env.NODE_ENV ==='production' ?
    'https://fastsupper.herokuapp.com' : 'http://localhost:5000'
}
export default config;