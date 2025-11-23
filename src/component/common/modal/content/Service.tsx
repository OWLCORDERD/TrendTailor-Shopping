import React, { useContext } from "react";
import { ModalContext } from "../../../../../context/ModalContext";
import { MdConstruction } from "react-icons/md";

const Service = () => {
  const { title } = useContext(ModalContext);

  return (
    <div className='cont-wrapper'>
      <div className='title-box'>
        <MdConstruction className='title-icon' />
        <h2 className='title'>{title}</h2>
      </div>

      <div className='content-box'>
        <p className='desc'>
          현재 개발중인 기능이므로, <br /> 추후에 이용 가능합니다.
        </p>
      </div>
    </div>
  );
};

export default Service;
