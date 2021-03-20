// React
import React from "react";

// Third party
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

// Local
import "../../static/scss/header.scss";
import Logo from "../../static/images/logo.svg";

interface BackHome {
  CallBack?: boolean;
}

const HeaderScreen: React.FC<BackHome> = ({ CallBack }) => {
  return (
    <div className="container-header">
      <img src={Logo} alt="Logo" />
      {CallBack && (
        <Link to="/" className="content-back-home">
          <BsArrowLeft size={25} color="#34CB79" />
          <span>Voltar para home</span>
        </Link>
      )}
    </div>
  );
};

export default HeaderScreen;
