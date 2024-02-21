import { Link, useParams } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice";

const Order = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="Danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <div className="flex">
        <div className="w-2/3 ml-5 mr-10">
          <h2>Shipping</h2>
          <p>
            <strong>Name: </strong> {order.user.name}
          </p>
          <p>
            <strong>Email: </strong> {order.user.email}
          </p>
          <p>
            <strong>Address: </strong>
            {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </p>
          {order.isDelivered ? (
            <Message variant="Success">
              Delivered on {order.deliveredAt}
            </Message>
          ) : (
            <Message variant="Danger">Not Delivered</Message>
          )}
          <p>
            <strong>Method: </strong> {order.paymentMethod}
          </p>
          {order.isPaid ? (
            <Message variant="Success">Paid on {order.paidAt}</Message>
          ) : (
            <Message variant="Danger">Not Paid</Message>
          )}
          <div>
            <h2>Order Items</h2>
            {order.orderItems.map((item, index) => (
              <div key={index}>
                <div className="flex w-full">
                  <div className="">
                    <img
                      src={item.image}
                      name={item.image}
                      className=" w-20 h-20"
                    />
                  </div>
                  <div className=" w-1/4">
                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                  </div>
                  <div className="w-1/3 text-end">
                    {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/3">
          <div>
            <h2>Order Summary</h2>
            <div className="flex">
              <p className="w-1/2">Items:</p>
              <p>₹{order.itemsPrice}</p>
            </div>
            <div className="flex">
              <p className="w-1/2">Shipping Price:</p>
              <p>₹{order.shippingPrice}</p>
            </div>
            <div className="flex">
              <p className="w-1/2">Tax:</p>
              <p>₹{order.taxPrice}</p>
            </div>
            <div className="flex">
              <p className="w-1/2">Total:</p>
              <p>₹{order.totalPrice}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
