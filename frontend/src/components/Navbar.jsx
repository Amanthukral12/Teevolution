import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
const Headers = () => {
  return (
    <header className="px-[3rem] py-4">
      <div className="flex justify-between items-center pb-2">
        <Link to={"/"}>
          <h1>TeeVolution</h1>
        </Link>
        <div className="flex items-center">
          <Link to={"/cart"}>
            <FaShoppingCart className="text-lg mr-3 " />
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
