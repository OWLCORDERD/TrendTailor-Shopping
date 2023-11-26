import React from "react";
import { AiOutlineRight } from "react-icons/ai";

interface NextArrowProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const slideNext = ({ onClick }: NextArrowProps): JSX.Element => {
  return (
    <div
      style={{
        position: "absolute",
        top: "30%",
        width: "50px",
        height: "50px",
        right: "15%",
        transform: "translateY(-30%)",
        zIndex: 99,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <AiOutlineRight fontSize={50} color='#fff' />
    </div>
  );
};

export default slideNext;
