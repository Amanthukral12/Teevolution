import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Headers = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <header className="px-[3rem] py-4">
      <div className="flex justify-between items-center pb-2">
        <Link to={"/"}>
          <h1>TeeVolution</h1>
        </Link>
        <div className="flex items-center">
          <Link to={"/cart"} className="flex items-center mr-3">
            <FaShoppingCart className="text-lg mr-1 " />
            <p>Cart</p>
            {cartItems.length > 0 && (
              <div className="p-1 h-5 w-5 bg-red-500 text-white rounded-[50%] flex justify-center items-center">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </div>
            )}
          </Link>
          <span className="flex items-center">
            <FaUser className="text-md mr-1" /> <p>My Account</p>
          </span>
        </div>
      </div>
      <div className="flex justify-center pt-2">
        <Link to={"/"}>
          <span className="px-2">Home</span>
        </Link>
        <span className="px-2">Shop</span>
        <span className="px-2">About Us</span>
        <span className="px-2">Contact Us</span>
      </div>
    </header>
  );
};

export default Headers;
