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
      <div className="flex">
        <div className="w-2/3">
          <div>
            <div>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>
            <div>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </div>
            <div>
              <h2>Order Items</h2>

              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <div>
                  {cart.cartItems.map((item, index) => (
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
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div className="w-1/3 text-end">
                          {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-1/3">
          <div>
            <div>
              <h2>Order Summary</h2>
              <div className="flex">
                <p className="w-1/2">Items:</p>
                <p>₹{cart.itemsPrice}</p>
              </div>
              <div className="flex">
                <p className="w-1/2">Shipping Price:</p>
                <p>₹{cart.shippingPrice}</p>
              </div>
              <div className="flex">
                <p className="w-1/2">Tax:</p>
                <p>₹{cart.taxPrice}</p>
              </div>
              <div className="flex">
                <p className="w-1/2">Total:</p>
                <p>₹{cart.totalPrice}</p>
              </div>
              {error && <Message variant="Danger">{error}</Message>}
              <button
                disabled={cart.cartItems.length === 0}
                onClick={placeOrderHandler}
              >
                PLace Order
              </button>
              {isLoading && <Loader />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
