import { Link, useParams } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} from "../slices/ordersApiSlice";
import { toast } from "react-toastify";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const Order = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({
          type: "setLoadingStatus",
          value: "pending",
        });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  const onApproveTest = async () => {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success("Payment successful");
  };
  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Payment successful");
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    });
  };
  const onError = (err) => {
    console.log(err.message);
    toast.error(err?.data?.message || err.message);
  };
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  };

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
        <div className="w-1/3 mr-10">
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
            {!order.isPaid && (
              <div>
                {loadingPay && <Loader />}
                {isPending ? (
                  <Loader />
                ) : (
                  <div>
                    {/* <button onClick={onApproveTest} className="mb-3">
                      Test Pay Order
                    </button> */}
                    <div>
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      ></PayPalButtons>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
