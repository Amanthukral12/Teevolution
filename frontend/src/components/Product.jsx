import propTypes from "prop-types";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <>
      <div className="mb-6 mx-4">
        <Link to={`/product/${product._id}`}>
          <img src={product.image} alt={product.name} className="w-64 h-72" />
          <p className="font-semibold">{product.name}</p>
          <p className=" text-blue-700">{product.price}</p>
        </Link>
      </div>
    </>
  );
};

Product.propTypes = {
  product: propTypes.object,
};

export default Product;
