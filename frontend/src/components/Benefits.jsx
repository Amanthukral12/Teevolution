import { FaTruckFast } from "react-icons/fa6";
import { HiSupport } from "react-icons/hi";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { FaFingerprint } from "react-icons/fa";
const Benefits = () => {
  return (
    <div className=" mt-10 mb-10 w-full md:w-[90%] mx-auto flex flex-col justify-center items-center md:flex md:flex-row md:justify-evenly">
      <div className="flex w-[90%] my-2 md:w-1/5 ">
        <FaTruckFast className="text-2xl mr-2" />
        <div className="ml-2 mr-6">
          <p className=" font-bold text-sm mb-2">FREE SHIPPING</p>
          <p className=" text-gray-600 text-sm">
            Enjoy free shipping on all orders above $100
          </p>
        </div>
      </div>
      <div className="flex w-[90%] my-2 md:w-1/5 ">
        <HiSupport className="text-2xl mr-2" />
        <div className="ml-2 mr-6">
          <p className=" font-bold text-sm mb-2">SUPPORT 24/7</p>
          <p className=" text-gray-600 text-sm">
            Our support team is there to help you for queries
          </p>
        </div>
      </div>
      <div className="flex w-[90%] my-2 md:w-1/5 ">
        <FaArrowRotateLeft className="text-2xl mr-2" />
        <div className="ml-2 mr-6">
          <p className=" font-bold text-sm mb-2">30 DAYS RETURN</p>
          <p className=" text-gray-600 text-sm">
            Simply return it within 30 days for an exchange
          </p>
        </div>
      </div>
      <div className="flex w-[90%] my-2 md:w-1/5 ">
        <FaFingerprint className="text-2xl mr-2" />
        <div className="ml-2 mr-6">
          <p className=" font-bold text-sm mb-2">100% PAYMENT SECURE</p>
          <p className=" text-gray-600 text-sm">Our payments are secured</p>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
