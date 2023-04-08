import React from "react";
import '../custom.css';
import logo from './../assets/fastSupperLogo.png';
const Logo = ({fullscreen}) => {
  return (
    <div>
      {fullscreen ? <img src={logo} id="logo-full" className="img-fluid"/> : <img src={logo} id="logo-small" className="img-fluid"/>}
    </div>
  );
};

export default Logo;