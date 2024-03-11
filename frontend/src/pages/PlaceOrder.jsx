import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";
const PlaceOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="flex ml-10">
        <div className="w-3/5">
          <h2 className="text-2xl mt-5">Shipping</h2>
          <p className="my-3">
            <strong>Address: </strong>
            {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
            {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
          </p>

          <div className="my-3">
            <h2 className="text-2xl mb-3">Payment Method</h2>
            <strong>Method: </strong>
            {cart.paymentMethod}
          </div>
          <div>
            <h2 className="text-2xl my-5">Order Items</h2>

            {cart.cartItems.length === 0 ? (
              <Message>Your cart is empty</Message>
            ) : (
              <table className="min-w-full text-center text-base font-light text-surface mb-10">
                <thead className="border-b border-gray-400 font-medium ">
                  <tr>
                    <th className="px-6 py-4"></th>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Price</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {cart.cartItems.map((item) => (
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
            )}
          </div>
        </div>
        <div className="w-2/5 ml-10 text-lg">
          <h2 className="text-2xl my-5">Order Summary</h2>
          <div className="flex">
            <p className="w-1/2">Items:</p>
            <p>${cart.itemsPrice}</p>
          </div>
          <div className="flex">
            <p className="w-1/2">Shipping Price:</p>
            <p>${cart.shippingPrice}</p>
          </div>
          <div className="flex">
            <p className="w-1/2">Tax:</p>
            <p>${cart.taxPrice}</p>
          </div>
          <div className="flex">
            <p className="w-1/2">Total:</p>
            <p>${cart.totalPrice}</p>
          </div>
          {error && (
            <Message variant="Danger">
              {" "}
              {error?.data?.message || error.error}
            </Message>
          )}
          <button
            disabled={cart.cartItems.length === 0}
            onClick={placeOrderHandler}
            className="bg-[#024E82] text-white rounded-md py-1 px-8 mb-2 mt-4 hover:bg-gray-400"
          >
            Place Order
          </button>
          {isLoading && <Loader />}
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
