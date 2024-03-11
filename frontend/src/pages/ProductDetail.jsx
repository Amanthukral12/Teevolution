import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../slices/productApiSlice";
import Loader from "../components/Loader";
import { addToCart } from "../slices/cartSlice";
import { useState } from "react";
import Message from "../components/Message";
import { toast } from "react-toastify";
const ProductDetail = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingReview }] =
    useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ productId, rating, comment }).unwrap();
      refetch();
      toast.success("Review Submitted");
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <section className=" px-[3rem] mt-12">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="Danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <>
            <div className="flex flex-col md:flex-row">
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
                <p>$ {product.price}</p>
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
            </div>
            <div className="mb-10">
              <h2>Reviews</h2>
              {product.reviews.length === 0 && (
                <Message variant="Info">No reviews</Message>
              )}

              <div>
                <h2>Write a Customer Review</h2>
                {loadingReview && <Loader />}
                {userInfo ? (
                  <form className="flex flex-col" onSubmit={submitHandler}>
                    <select
                      name="rating"
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                    >
                      <option value="">Select</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </select>
                    <label htmlFor="comment">Comment</label>
                    <textarea
                      name="comment"
                      cols="30"
                      rows="3"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <button type="submit">Submit</button>
                  </form>
                ) : (
                  <Message variant="Info">
                    Please <Link to="/login">Sign in</Link> to write a review
                  </Message>
                )}
              </div>
              {product.reviews.map((review) => (
                <div key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default ProductDetail;
