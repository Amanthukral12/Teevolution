import { useState } from "react";
import propTypes from "prop-types";
import FormContainer from "../components/FormContainer";
import { Link } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit");
  };
  return (
    <FormContainer>
      <h1>My Account</h1>
      <form onSubmit={submitHandler} className="flex flex-col">
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
        <button type="submit">Sign In</button>
        <div>
          <p>
            New Customer? <Link to="/register">Register</Link>
          </p>
        </div>
      </form>
    </FormContainer>
  );
};

Login.propTypes = {};

export default Login;
