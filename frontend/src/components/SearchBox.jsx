import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
const SearchBox = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { keyword: urlKeyWord } = useParams();
  const [keyword, setKeyword] = useState(urlKeyWord || "");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword && location.pathname.includes("/admin/productslist")) {
      navigate(`/admin/productslist/${keyword}`);
    } else if (keyword) {
      navigate(`/shop/search/${keyword}`);
    } else {
      navigate("/");
    }
    setKeyword("");
  };

  return (
    <form onSubmit={submitHandler} className="flex">
      <input
        type="text"
        name="searchbox"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products"
      />
      <button type="submit">
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBox;
