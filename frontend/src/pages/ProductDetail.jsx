import Rating from "../components/Rating";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const { id: productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${productId}`);
      setProduct(data);
    };
    fetchProduct();
  }, [productId]);

  return (
    <>
      <section className="flex flex-col md:flex-row px-[3rem] mt-12">
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

          <button
            disabled={product.countInStock === 0}
            className="bg-black text-white py-4 px-40"
          >
            Add to Cart
          </button>
          <p>🤍 Add to Wishlist</p>
          <p>Categories: {product.category}</p>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
