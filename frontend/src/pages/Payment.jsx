import { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../slices/cartSlice";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1 className="text-2xl my-5">Payment Method</h1>
      <form className="flex flex-col w-3/5" onSubmit={submitHandler}>
        <p className="text-lg">Select Method</p>
        <div>
          <input
            type="radio"
            name="paymentMethod"
            id="PayPal"
            value="Paypal"
            className="my-2 mr-2"
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="PayPal" className=" font-medium text-lg">
            PayPal
          </label>
        </div>

        <button
          type="submit"
          className="bg-[#024E82] text-white rounded-md py-1 mb-2 mt-10 hover:bg-gray-400"
        >
          Continue
        </button>
      </form>
    </FormContainer>
  );
};

export default Payment;
