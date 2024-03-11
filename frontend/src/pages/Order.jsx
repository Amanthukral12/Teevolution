import { Link, useParams } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useDeliverOrderMutation,
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

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

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

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details }).unwrap();
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

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order Delivered");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="Danger"> {error?.data?.message || error.error}</Message>
  ) : (
    <>
      <h1 className="ml-10 text-xl font-medium">
        Order <span className="text-base font-normal">{order._id}</span>
      </h1>
      <div className="flex">
        <div className="w-2/3 ml-10 mr-10">
          <h2 className="text-2xl mt-5">Shipping</h2>
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
          <p>
            <strong>Created At: </strong> {order.createdAt.substring(0, 10)}
          </p>
          {order.isDelivered ? (
            <Message variant="Success">
              Delivered on {order.deliveredAt.substring(0, 10)}
            </Message>
          ) : (
            <Message variant="Danger">Not Delivered</Message>
          )}
          <p>
            <strong>Method: </strong> {order.paymentMethod}
          </p>
          {order.isPaid ? (
            <Message variant="Success">
              Paid on {order.paidAt.substring(0, 10)}
            </Message>
          ) : (
            <Message variant="Danger">Not Paid</Message>
          )}

          <h2 className="text-2xl my-5 font-medium">Order Items</h2>
          <table className="min-w-full text-center text-base font-light text-surface mb-10">
            <thead className="border-b border-gray-400 font-medium ">
              <tr>
                <th className="px-6 py-4"></th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Price</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {order.orderItems.map((item) => (
                <tr key={item._id} className="py-4 odd:bg-slate-300">
                  <td className="py-4">
                    <img
                      src={item.image}
                      name={item.image}
                      className=" w-32 h-32 ml-4"
                    />
                  </td>
                  <td className="py-4">
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </td>
                  <td className="py-4">
                    {item.qty} x ${item.price} = ${item.qty * item.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-1/3 mr-10">
          <h2 className="text-2xl my-5">Order Summary</h2>
          <div className="flex">
            <p className="w-1/2">Items:</p>
            <p>${order.itemsPrice}</p>
          </div>
          <div className="flex">
            <p className="w-1/2">Shipping Price:</p>
            <p>${order.shippingPrice}</p>
          </div>
          <div className="flex">
            <p className="w-1/2">Tax:</p>
            <p>${order.taxPrice}</p>
          </div>
          <div className="flex mb-6">
            <p className="w-1/2">Total:</p>
            <p>${order.totalPrice}</p>
          </div>
          {!order.isPaid && (
            <div>
              {loadingPay && <Loader />}
              {isPending ? (
                <Loader />
              ) : (
                <div>
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
          {loadingDeliver && <Loader />}
          {userInfo &&
            userInfo.isAdmin &&
            order.isPaid &&
            !order.isDelivered && (
              <div>
                <button
                  type="button"
                  onClick={deliverOrderHandler}
                  className="bg-[#024E82] text-white rounded-md py-1 px-8 mb-2 mt-4 hover:bg-gray-400"
                >
                  Mark as Delivered
                </button>
              </div>
            )}
        </div>
      </div>
    </>
  );
};

export default Order;
