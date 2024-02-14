import React from "react";
import propTypes from "prop-types";

const FormContainer = ({ children }) => {
  return (
    <div className="mt-4 ">
      <div className="flex justify-center">
        <div className="flex flex-col border-2 border-black-2">{children}</div>
      </div>
    </div>
  );
};

FormContainer.propTypes = {
  children: propTypes.node,
};

export default FormContainer;
