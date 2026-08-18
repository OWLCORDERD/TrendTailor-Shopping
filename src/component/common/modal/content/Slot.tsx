import React, { useContext } from "react";
import { ModalContext } from "../../../../../context/ModalContext";
import { MdConstruction } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { AiOutlineCode } from "react-icons/ai";

const Service = () => {
  const { contents, type } = useContext(ModalContext);

  const dynamicTypeIcon = (type?: string) => {
    switch (type){
        case "construction":
            return <MdConstruction className='title-icon' />;
        case "login":
            return <FaCircleCheck className='title-icon' />;
        case "code":
            return <AiOutlineCode className='title-icon' />;
        default:
            return null;
    }
  }

  return (
    <div className='cont-wrapper'>
      <div className='title-box'>
        {/* 유형에 따른 동적 아이콘 렌더링 */}
        {dynamicTypeIcon(type)}
        <h2 className='title'>{contents?.title}</h2>
      </div>

      <div className='content-box'>
        <p className='desc' dangerouslySetInnerHTML={{ __html: contents?.description || "" }}/>
      </div>
    </div>
  );
};

export default Service;
