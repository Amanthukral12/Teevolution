import propTypes from "prop-types";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div className=" flex flex-col mb-3">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-80 h-80 rounded object-cover"
        />
        <p>{product.name}</p>
        <p>{product.price}</p>
      </Link>
    </div>
  );
};

Product.propTypes = {
  product: propTypes.object,
};

export default Product;
