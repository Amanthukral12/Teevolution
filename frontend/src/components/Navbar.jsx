import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";

const Headers = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header className="px-[3rem] py-4">
      <div className="flex justify-between items-center pb-2">
        <Link to={"/"}>
          <h1>TeeVolution</h1>
        </Link>
        <div className="flex items-center">
          <Link to={"/cart"} className="flex items-center mr-3">
            <FaShoppingCart className="text-lg mr-1 " />
            <p>Cart</p>
            {cartItems.length > 0 && (
              <div className="p-1 h-5 w-5 bg-red-500 text-white rounded-[50%] flex justify-center items-center">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </div>
            )}
          </Link>
          <div className="flex items-center mr-3">
            {userInfo ? (
              <ul className="w-full flex items-center">
                <FaUser className="text-lg mr-1 " />
                <li className="group  relative dropdown cursor-pointer text-base tracking-wide w-full">
                  <a>{userInfo.name}</a>
                  <div className="group-hover:block dropdown-menu absolute hidden h-auto">
                    <ul className="top-0 w-48 bg-white shadow px-2 py-8">
                      <li className="py-1">
                        <Link
                          className="block text-base  cursor-pointer"
                          to="/profile"
                        >
                          Profile
                        </Link>
                      </li>
                      <li className="py-1">
                        <p
                          className="block text-base cursor-pointer"
                          onClick={logoutHandler}
                        >
                          Logout
                        </p>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            ) : (
              <>
                <FaUser className="text-lg mr-1 " />
                <Link to="/login">Signin</Link>
              </>
            )}
          </div>
          <div className="flex items-center">
            {userInfo && userInfo.isAdmin && (
              <ul className="w-full flex items-center">
                <li className="group relative dropdown cursor-pointer text-base tracking-wide">
                  <a>Admin</a>
                  <div className="group-hover:block dropdown-menu absolute hidden h-auto">
                    <ul className="top-0 w-48 bg-white shadow px-2 py-8">
                      <li className="py-1">
                        <Link
                          className="block text-base  cursor-pointer"
                          to="/admin/orderlist"
                        >
                          Orders
                        </Link>
                      </li>

                      <li className="py-1">
                        <Link
                          className="block text-base  cursor-pointer"
                          to="/admin/userlist"
                        >
                          Users
                        </Link>
                      </li>
                      <li className="py-1">
                        <Link
                          className="block text-base  cursor-pointer"
                          to="/admin/productslist"
                        >
                          Products
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center pt-2">
        <Link to={"/"}>
          <span className="px-2">Home</span>
        </Link>
        <span className="px-2">Shop</span>
        <span className="px-2">About Us</span>
        <span className="px-2">Contact Us</span>
      </div>
    </header>
  );
};

export default Headers;
