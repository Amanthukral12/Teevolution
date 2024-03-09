import { useState, useEffect } from "react";

import FormContainer from "../components/FormContainer";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <FormContainer>
      <h1 className="text-2xl my-5">My Account</h1>
      <form onSubmit={submitHandler} className="flex flex-col w-3/5">
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Enter your Email"
          className=" border-gray-400 border-b-2 py-2 pl-2 mb-2 focus:outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          name="password"
          value={password}
          placeholder="Enter your password"
          className=" border-gray-400 border-b-2 py-2 pl-2 mb-4 focus:outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-[#1c274e] text-white rounded-md py-1 mb-2 mt-10 hover:bg-gray-400"
          disabled={isLoading}
        >
          Sign In
        </button>
        {isLoading && <Loader />}
        <div className="mb-20">
          <p>
            New Customer?{" "}
            <Link
              to={redirect ? `/signup?redirect=${redirect}` : "/signup"}
              className=" text-blue-800"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </FormContainer>
  );
};

export default Login;
