import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import propTypes from "prop-types";
const Rating = ({ value, text }) => {
  return (
    <div className="flex items-center">
      <span className="m-1">
        {value >= 1 ? (
          <FaStar />
        ) : value >= 0.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span className="m-1">
        {value >= 2 ? (
          <FaStar />
        ) : value >= 1.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span className="m-1">
        {value >= 3 ? (
          <FaStar />
        ) : value >= 2.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span className="m-1">
        {value >= 4 ? (
          <FaStar />
        ) : value >= 3.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span className="m-1">
        {value >= 5 ? (
          <FaStar />
        ) : value >= 4.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
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
};
