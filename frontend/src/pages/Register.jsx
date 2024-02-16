import { useState, useEffect } from "react";
import propTypes from "prop-types";
import FormContainer from "../components/FormContainer";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useRegisterMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const Register = (props) => {
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
      <h1>My Account</h1>
      <form onSubmit={submitHandler} className="flex flex-col">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Enter your Name"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          placeholder="Enter your password again"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          Sign Up
        </button>
        {isLoading && <Loader />}
        <div>
          <p>
            Existing Customer?{" "}
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
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
