// React
import React from "react";

// Third party
import { FiLogIn } from "react-icons/fi";
import { Link } from 'react-router-dom'

// Component
import Header from "../../components/Header";

// Local
import "../../static/scss/home.scss";


function HomeScreen()  {

  return (
    <div className="container-home">
      <Header />

      <div className="content-create-collection">
        <div>
          <h1 className='title'>
            Seu marketplace <br /> de coleta de resíduos.
          </h1>
          <p className='descrition'>
            Ajudamos pessoas a encontrarem pontos <br /> de coleta de forma
            eficiente.
          </p>

          <Link to='/create-point'>
            <span>
              <FiLogIn size={30} color="#fff" />
            </span>

            <strong>Cadastrar um ponto de coleta</strong>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen
