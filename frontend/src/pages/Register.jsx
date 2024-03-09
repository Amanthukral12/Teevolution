import { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useRegisterMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
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
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <FormContainer>
      <h1 className="text-2xl my-5">My Account</h1>
      <form onSubmit={submitHandler} className="flex flex-col w-3/5">
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Enter your Name"
          className=" border-gray-400 border-b-2 py-2 pl-2 mb-2"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          name="email"
          value={email}
          placeholder="Enter your Email"
          className=" border-gray-400 border-b-2 py-2 pl-2 mb-2"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          name="password"
          value={password}
          placeholder="Enter your password"
          className=" border-gray-400 border-b-2 py-2 pl-2 mb-2"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          placeholder="Enter your password again"
          className=" border-gray-400 border-b-2 py-2 pl-2 mb-2"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-[#1c274e] text-white rounded-md py-1 mb-2 mt-10 hover:bg-gray-400"
          disabled={isLoading}
        >
          Sign Up
        </button>
        {isLoading && <Loader />}
        <div className="mb-20">
          <p>
            Existing Customer?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-blue-800"
            >
              SignIn
            </Link>
          </p>
        </div>
      </form>
    </FormContainer>
  );
};

Register.propTypes = {};

export default Register;
