"use client";

import React from "react";
import { motion } from "framer-motion";
import { IoWarning } from "react-icons/io5";
import "styles/errorModal.scss";

interface errorProps {
  errorMessage: string | "";
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const ErrorModal = ({ errorMessage, setError }: errorProps) => {
  return (
    <motion.div
      className='error-modal'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='modal-inner'>
        <div className='error-icon'>
          <IoWarning />
        </div>

        <div className='modal-cont'>
          <div className='message'>
            <h1>{errorMessage}</h1>
          </div>
          <button type='button' onClick={() => setError("")}>
            돌아가기
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ErrorModal;
