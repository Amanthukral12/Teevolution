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
            <div className="flex flex-col items-center xl:flex-row xl:items-start mx-4 xl:mx-64">
              <div className="w-full md:w-1/2">
                <img
                  src={product.image}
                  alt="product image"
                  className="w-[30rem] h-[30rem] ml-0 xl:ml-10 rounded-md"
                />
              </div>

              <div className=" w-full md:w-1/2">
                <h3 className="text-lg font-medium mb-4">
                  TeeVolution Clothing
                </h3>
                <h3 className="text-2xl font-medium">{product.name}</h3>
                <div className="mb-6">
                  <Rating
                    value={product.rating}
                    text={
                      `${product.numReviews}` +
                      `${product.numReviews > 0 ? " reviews" : " review"}`
                    }
                  />
                </div>
                <p className="text-2xl">$ {product.price}</p>

                <p>{product.countInStock > 0 ? `In Stock ` : "Out of Stock"}</p>

                {product.countInStock > 0 && (
                  <div className="flex my-4">
                    <p className="mr-2 text-lg">Quantity: </p>
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
                  className="bg-black text-white  py-4 px-4 md:px-40 rounded-md"
                >
                  Add to Cart
                </button>
                <p>Categories: {product.category}</p>
              </div>
            </div>
            <div className=" mt-8 mb-32 mx-4 lg:mx-72">
              <h2 className=" font-semibold text-2xl mb-1">Reviews</h2>
              {product.reviews.length === 0 && (
                <Message variant="Info">No reviews</Message>
              )}

              <div className="rounded-sm">
                <h2 className="font-medium">Write a Customer Review</h2>
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
                    <label htmlFor="comment" className="font-medium">
                      Comment:
                    </label>
                    <textarea
                      name="comment"
                      cols="30"
                      rows="3"
                      value={comment}
                      className=" focus:outline-none border border-black-4 mb-2 p-2"
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <button
                      type="submit"
                      className="bg-black text-white py-1 rounded-md w-full md:w-24"
                    >
                      Submit
                    </button>
                  </form>
                ) : (
                  <Message variant="Info">
                    Please <Link to="/login">Sign in</Link> to write a review
                  </Message>
                )}
              </div>
              {product.reviews.map((review) => (
                <div key={review._id} className="mt-4">
                  <p>{review.name}</p>
                  <div className="flex items-center my-2">
                    <Rating value={review.rating} size="text-sm" />
                  </div>

                  <p className=" text-xs text-slate-600 mb-1">
                    Reviewed on {review.createdAt.substring(0, 10)}
                  </p>
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
