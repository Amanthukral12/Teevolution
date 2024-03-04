import propTypes from "prop-types";
import { Link } from "react-router-dom";
const Paginate = ({ pages, page, isAdmin = false, keyword }) => {
  return (
    pages > 1 && (
      <div className="flex justify-center">
        {page > 1 && (
          <button className="px-2">
            <Link
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${page - 1}`
                    : `/page/${page - 1}`
                  : keyword
                  ? `/admin/productslist/${keyword}/page/${page - 1}`
                  : `/admin/productslist/${page - 1}`
              }
            >
              Prev
            </Link>
          </button>
        )}

        <p>{page}</p>
        {page < pages && (
          <button className="px-2">
            <Link
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${page + 1}`
                    : `/page/${page + 1}`
                  : keyword
                  ? `/admin/productslist/${keyword}/page/${page + 1}`
                  : `/admin/productslist/${page + 1}`
              }
            >
              Next
            </Link>
          </button>
        )}
      </div>
    )
  );
};

Paginate.propTypes = {
  pages: propTypes.number,
  page: propTypes.number,
  isAdmin: propTypes.bool,
  keyword: propTypes.string,
};

export default Paginate;
