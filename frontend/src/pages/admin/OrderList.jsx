import { useGetAllOrdersQuery } from "../../slices/ordersApiSlice";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetAllOrdersQuery();

  return (
    <>
      <h1 className="text-2xl my-5 mx-20">Orders</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="Danger">
          {" "}
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <table className=" w-[90%] mx-10 text-center text-sm font-light text-surface mb-10">
          <thead className="border-b border-gray-400 font-medium ">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">USER</th>
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
                <td className="py-4">{order.user && order.user.name}</td>
                <td className="py-4">{order.createdAt.substring(0, 10)}</td>
                <td className="py-4">${order.totalPrice}</td>
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
    </>
  );
};

export default OrderList;
