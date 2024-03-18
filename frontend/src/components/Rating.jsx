import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import propTypes from "prop-types";
const Rating = ({ value, text, size = "text-xl" }) => {
  return (
    <div className="flex items-center">
      <span className={`${size}`}>{value}</span>
      <span className="m-1">
        {value >= 1 ? (
          <FaStar className={`text-yellow-600 ${size}`} />
        ) : value >= 0.5 ? (
          <FaStarHalfAlt className={`text-yellow-600 ${size}`} />
        ) : (
          <FaRegStar className={`text-yellow-600 ${size}`} />
        )}
      </span>
      <span className="m-1">
        {value >= 2 ? (
          <FaStar className={`text-yellow-600 ${size}`} />
        ) : value >= 1.5 ? (
          <FaStarHalfAlt className={`text-yellow-600 ${size}`} />
        ) : (
          <FaRegStar className={`text-yellow-600 ${size}`} />
        )}
      </span>
      <span className="m-1">
        {value >= 3 ? (
          <FaStar className={`text-yellow-600 ${size}`} />
        ) : value >= 2.5 ? (
          <FaStarHalfAlt className={`text-yellow-600 ${size}`} />
        ) : (
          <FaRegStar className={`text-yellow-600 ${size}`} />
        )}
      </span>
      <span className="m-1">
        {value >= 4 ? (
          <FaStar className={`text-yellow-600 ${size}`} />
        ) : value >= 3.5 ? (
          <FaStarHalfAlt className={`text-yellow-600 ${size}`} />
        ) : (
          <FaRegStar className={`text-yellow-600 ${size}`} />
        )}
      </span>
      <span className="m-1">
        {value >= 5 ? (
          <FaStar className={`text-yellow-600 ${size}`} />
        ) : value >= 4.5 ? (
          <FaStarHalfAlt className={`text-yellow-600 ${size}`} />
        ) : (
          <FaRegStar className={`text-yellow-600 ${size}`} />
        )}
      </span>

      <span className="text-xs font-semibold pl-2">{text && text}</span>
    </div>
  );
};

export default Rating;

Rating.propTypes = {
  value: propTypes.number,
  text: propTypes.string,
  size: propTypes.string,
};
