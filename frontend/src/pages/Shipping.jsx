import { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";
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
      <h1>Shipping</h1>
      <form className="flex flex-col" onSubmit={submitHandler}>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          value={address}
          placeholder="Enter your Address"
          onChange={(e) => setAddress(e.target.value)}
        />
        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          value={city}
          placeholder="Enter your city"
          onChange={(e) => setCity(e.target.value)}
        />
        <label htmlFor="postalcode">Postal Code</label>
        <input
          type="text"
          name="postalCode"
          value={postalCode}
          placeholder="Enter your Postal Code"
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <label htmlFor="country">Country</label>
        <input
          type="text"
          name="country"
          value={country}
          placeholder="Enter your country"
          onChange={(e) => setCountry(e.target.value)}
        />
        <button type="submit">Continue</button>
      </form>
    </FormContainer>
  );
};

export default Shipping;
