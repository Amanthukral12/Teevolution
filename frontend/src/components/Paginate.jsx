import propTypes from "prop-types";
import { Link } from "react-router-dom";
const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <div className="flex justify-center mb-10">
        {page > 1 && (
          <button className="mr-2 px-6 rounded-md bg-[#024E82] py-1 text-white hover:bg-gray-400">
            <Link
              to={
                !isAdmin
                  ? keyword
                    ? `/shop/search/${keyword}/page/${page - 1}`
                    : `/shop/page/${page - 1}`
                  : keyword
                  ? `/admin/productslist/${keyword}/page/${page - 1}`
                  : `/admin/productslist/${page - 1}`
              }
            >
              Prev
            </Link>
          </button>
        )}

        <p className=" border border-[#024E82] text-[#024E82] px-2 rounded-md mr-4 hover:bg-[#024E82] hover:text-white hover:border-white">
          {page}
        </p>
        {page < pages && (
          <button className="mr-2 px-6 rounded-md bg-[#024E82] py-1 text-white hover:bg-gray-400">
            <Link
              to={
                !isAdmin
                  ? keyword
                    ? `/shop/search/${keyword}/page/${page + 1}`
                    : `/shop/page/${page + 1}`
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
