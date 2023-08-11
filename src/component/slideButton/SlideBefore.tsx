import React from "react";
import { AiOutlineLeft } from "react-icons/ai";

interface NextBeforeType {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
const slideBefore = ({ onClick }: NextBeforeType): JSX.Element => {
  return (
    <div
      style={{
        position: "absolute",
        top: "30%",
        width: "50px",
        height: "50px",
        left: "15rem",
        transform: "translateY(-30%)",
        zIndex: 99,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <AiOutlineLeft fontSize={50} color='#fff' />
    </div>
  );
};

export default slideBefore;
