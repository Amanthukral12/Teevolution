import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { updateCartItems } from "../slices/cartSlice";
const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(updateCartItems({ ...product, qty }));
  };

  return (
    <>
      <p>Shopping Cart</p>
      <section className="flex flex-col md:flex-row">
        {cartItems.map((item) => (
          <div key={item._id} className="flex">
            <img src={item.image} alt="product image" className="h-20 w-20" />
            <p>{item.name}</p>
            <p>{item.price}</p>
            <select
              value={item.qty}
              onChange={(e) => addToCartHandler(item, Number(e.target.value))}
            >
              {[...Array(item.countInStock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
            <FaTrash />
          </div>
        ))}

        <div>
          <p>{cartItems.reduce((acc, item) => acc + item.qty, 0)}items</p>
          <p>
            Subtotal ₹{" "}
            {cartItems
              .reduce((acc, item) => acc + item.qty * item.price, 0)
              .toFixed(2)}
          </p>
          <button type="button" disabled={cartItems.length === 0}>
            Proceed to Checkout
          </button>
        </div>
      </section>
    </>
  );
};

export default Cart;
