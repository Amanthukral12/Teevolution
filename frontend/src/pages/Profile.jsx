import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useProfileMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import { FaTimes } from "react-icons/fa";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo.name, userInfo.email, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated Successfully");
      } catch (err) {
        toast.error(err?.data?.message || err?.message);
      }
    }
  };

  return (
    <div className="flex ml-10">
      <div className="w-1/4">
        <h2 className="text-2xl my-5">User Profile</h2>
        <form onSubmit={submitHandler} className="flex flex-col">
          <label htmlFor="name">Name </label>
          <input
            type="text"
            name="name"
            className=" border-gray-400 border-b-2 py-2 pl-2 mb-2 focus:outline-none"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email">Email Address </label>
          <input
            type="text"
            name="email"
            className=" border-gray-400 border-b-2 py-2 pl-2 mb-2 focus:outline-none"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password </label>
          <input
            type="password"
            name="password"
            className=" border-gray-400 border-b-2 py-2 pl-2 mb-2 focus:outline-none"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="email">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            className=" border-gray-400 border-b-2 py-2 pl-2 mb-2 focus:outline-none"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#1c274e] text-white rounded-md py-1 mb-2 mt-10 hover:bg-gray-400"
          >
            Update
          </button>
          {loadingUpdateProfile && <Loader />}
        </form>
      </div>
      <div className="w-3/4 ml-10 mr-10">
        <h2>My Orders</h2>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="Danger">
            {error?.data?.message || error?.message}
          </Message>
        ) : (
          <table className="min-w-full text-center text-sm font-light text-surface mb-10">
            <thead className="border-b border-gray-400 font-medium ">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">DATE</th>
                <th className="px-6 py-4">TOTAL</th>
                <th className="px-6 py-4">PAID</th>
                <th className="px-6 py-4">DELIVERED</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="text-center">
              {orders.map((order) => (
                <tr key={order._id} className="py-4 odd:bg-slate-300">
                  <td className="py-4">{order._id}</td>
                  <td className="py-4">{order.createdAt.substring(0, 10)}</td>
                  <td className="py-4">{order.totalPrice}</td>
                  <td className="py-4">
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes className="text-red-500 mx-auto" />
                    )}
                  </td>
                  <td className="py-4">
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes className="text-red-500 mx-auto" />
                    )}
                  </td>
                  <td className="py-4">
                    <Link to={`/order/${order._id}`}>
                      <button>Details</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Profile;
