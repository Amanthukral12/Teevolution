import React from "react";
import propTypes from "prop-types";

const FormContainer = ({ children }) => {
  return (
    <div className="mt-4 w-1/2 mx-auto">
      <div className="flex justify-center w-full">
        <div className="flex flex-col items-center w-full border-2 border-black-2">
          {children}
        </div>
      </div>
    </div>
  );
};

FormContainer.propTypes = {
  children: propTypes.node,
};

export default FormContainer;
