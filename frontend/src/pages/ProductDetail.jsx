import Rating from "../components/Rating";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useGetProductDetailsQuery } from "../slices/productApiSlice";
import Loader from "../components/Loader";
import { addToCart } from "../slices/cartSlice";
import { useState } from "react";
import Message from "../components/Message";

const ProductDetail = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <>
      <section className="flex flex-col md:flex-row px-[3rem] mt-12">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="Danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <>
            <img
              src={product.image}
              alt="product image"
              className="flex-1 w-64 mr-10"
            />
            <div className="">
              <h3>{product.name}</h3>
              <span>
                <Rating
                  value={product.rating}
                  text={
                    `${product.numReviews}` +
                    `${product.numReviews > 0 ? " reviews" : " review"}`
                  }
                />
              </span>
              <p>₹ {product.price}</p>
              <p className="  text-sm">{product.description}</p>
              <p>
                {product.countInStock > 0
                  ? `In Stock ${product.countInStock}`
                  : "Out of Stock"}
              </p>

              {product.countInStock > 0 && (
                <div>
                  <p>Quantity</p>
                  <select
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                disabled={product.countInStock === 0}
                onClick={addToCartHandler}
                className="bg-black text-white py-4 px-40"
              >
                Add to Cart
              </button>
              <p>🤍 Add to Wishlist</p>
              <p>Categories: {product.category}</p>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default ProductDetail;
