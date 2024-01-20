import { FaShoppingCart, FaUser } from "react-icons/fa";
const Headers = () => {
  return (
    <header className="px-[3rem] py-4">
      <div className="flex justify-between items-center pb-2">
        <h1>TeeVolution</h1>
        <div className="flex items-center">
          <FaShoppingCart className="text-lg mr-3 " />
          <span className="flex items-center">
            <FaUser className="text-md mr-1" /> <p>My Account</p>
          </span>
        </div>
      </div>
      <div className="flex justify-center pt-2">
        <span className="px-2">Home</span>
        <span className="px-2">Shop</span>
        <span className="px-2">About Us</span>
        <span className="px-2">Contact Us</span>
      </div>
    </header>
  );
};

export default Headers;
