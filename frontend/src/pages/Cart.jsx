import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { updateCartItems, removeCartItems } from "../slices/cartSlice";
import Message from "../components/Message";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const updateCartHandler = async (product, qty) => {
    dispatch(updateCartItems({ ...product, qty }));
  };

  const removeCartItemsHandler = async (id) => {
    dispatch(removeCartItems(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <p className="text-2xl my-5 mx-6 md:mx-20">Shopping Cart</p>
      {cartItems.length === 0 ? (
        <Message variant="Info">
          Cart is empty. Please add some items <Link to="/">Go Back</Link>
        </Message>
      ) : (
        <>
          <table className="w-full md:w-[90%] mx-6 md:mx-10 text-center text-sm font-light text-surface mb-10">
            <thead className="border-b border-gray-400 font-medium ">
              <tr>
                <th className="px-6 py-4"></th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="text-center">
              {cartItems.map((item) => (
                <tr key={item._id} className="py-4 odd:bg-slate-300">
                  <td className="py-4">
                    <img
                      src={item.image}
                      alt="product image"
                      className="h-32 w-32 ml-4"
                    />
                  </td>

                  <td className="py-4">{item.name}</td>
                  <td className="py-4">{item.price}</td>
                  <td className="py-4">
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        updateCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="py-4">
                    <FaTrash onClick={() => removeCartItemsHandler(item._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mx-4 md:mx-20 w-full md:w-1/4">
            <h1 className="text-2xl my-5">Cart Totals</h1>

            <p className="flex mr-20 md:mr-0 justify-between md:justify-between">
              <span>Subtotal</span> ₹
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </p>
            <button
              type="button"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
              className="bg-[#024E82] text-white rounded-md px-8 py-1 mb-2 mt-6 hover:bg-gray-400"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
