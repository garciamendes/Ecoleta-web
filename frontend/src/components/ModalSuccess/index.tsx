// React
import React from "react"

// Third party
import { BsCheckCircle } from 'react-icons/bs'

// Local
import "../../static/scss/success-modal.scss"

const ModalSuccess: React.FC = () => {

  return (
    <div className="overlay">
      <div className="container-main">
        <div className='content-modal'>
          <BsCheckCircle size={50} color='#34CB79'/>
          <span>Cadastro concluído!</span>
        </div>
      </div>
    </div>
  );
};

export default ModalSuccess;
