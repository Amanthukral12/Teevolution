import { useState } from "react";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1 className="text-2xl my-5">Shipping</h1>
      <form className="flex flex-col w-3/5" onSubmit={submitHandler}>
        <input
          type="text"
          name="address"
          value={address}
          placeholder="Enter your Address"
          required={true}
          onChange={(e) => setAddress(e.target.value)}
          className=" border-gray-400 border-b-2 py-2 pl-2 mb-2"
        />

        <input
          type="text"
          name="city"
          value={city}
          placeholder="Enter your city"
          required={true}
          onChange={(e) => setCity(e.target.value)}
          className=" border-gray-400 border-b-2 py-2 pl-2 mb-2"
        />

        <input
          type="text"
          name="postalCode"
          value={postalCode}
          placeholder="Enter your Postal Code"
          required={true}
          onChange={(e) => setPostalCode(e.target.value)}
          className=" border-gray-400 border-b-2 py-2 pl-2 mb-2"
        />

        <input
          type="text"
          name="country"
          value={country}
          placeholder="Enter your country"
          required={true}
          onChange={(e) => setCountry(e.target.value)}
          className=" border-gray-400 border-b-2 py-2 pl-2 mb-2"
        />
        <button
          type="submit"
          className="bg-[#024E82] text-white rounded-md py-1 mt-10 hover:bg-gray-400 mb-8"
        >
          Continue
        </button>
      </form>
    </FormContainer>
  );
};

export default Shipping;
