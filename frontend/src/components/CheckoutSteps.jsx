import { Link } from "react-router-dom";
const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="w-full flex  justify-evenly my-4">
      <span>
        {step1 ? (
          <Link
            to="/login"
            className="bg-[#024E82] text-white px-4 py-1 rounded-md"
          >
            Sign In
          </Link>
        ) : (
          <button disabled>Sign In</button>
        )}
      </span>
      <span>
        {step2 ? (
          <Link
            to="/shipping"
            className="bg-[#024E82] text-white px-4 py-1 rounded-md"
          >
            Shipping
          </Link>
        ) : (
          <button disabled>Shipping</button>
        )}
      </span>
      <span>
        {step3 ? (
          <Link
            to="/payment"
            className="bg-[#024E82] text-white px-4 py-1 rounded-md"
          >
            Payment
          </Link>
        ) : (
          <button disabled>Payment</button>
        )}
      </span>
      <span>
        {step4 ? (
          <Link
            to="/placeorder"
            className="bg-[#024E82] text-white px-4 py-1 rounded-md"
          >
            Place Order
          </Link>
        ) : (
          <button disabled>Place Order</button>
        )}
      </span>
    </div>
  );
};

CheckoutSteps.propTypes = {};

export default CheckoutSteps;
