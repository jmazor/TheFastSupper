import React from "react";
import '../custom.css';
import logo from './../assets/fastSupperLogo.png';
const Logo = (fullscreen) => {
  return (
    <div>
      {fullscreen ? 
      (
        <img src={logo} className="logo-full" />
      ) : 
      (
        <img src={logo} className="logo-small" />
      )
      }
    </div>
  );
};

export default Logo;