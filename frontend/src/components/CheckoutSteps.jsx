import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="w-full flex  justify-evenly mb-4">
      <span>
        {step1 ? (
          <Link to="/login">Sign In</Link>
        ) : (
          <button disabled>Sign In</button>
        )}
      </span>
      <span>
        {step2 ? (
          <Link to="/shipping">Shipping</Link>
        ) : (
          <button disabled>Shipping</button>
        )}
      </span>
      <span>
        {step3 ? (
          <Link to="/payment">Payment</Link>
        ) : (
          <button disabled>Payment</button>
        )}
      </span>
      <span>
        {step4 ? (
          <Link to="/placeorder">Place Order</Link>
        ) : (
          <button disabled>Place Order</button>
        )}
      </span>
    </div>
  );
};

CheckoutSteps.propTypes = {};

export default CheckoutSteps;
