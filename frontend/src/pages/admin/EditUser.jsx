import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../slices/userApiSlice";
const EditUser = () => {
  const { id: userId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    refetch,
    error,
  } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const updateUserHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin }).unwrap();
      toast.success("User updated successfully");
      refetch();
      navigate("/admin/userlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to="/admin/userlist" className="text-lg ml-20 text-blue-800">
        Go Back
      </Link>
      <FormContainer>
        <h1 className="text-2xl my-5">Edit User</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="Danger">
            {" "}
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <form
            className="flex flex-col w-3/5"
            onSubmit={(e) => updateUserHandler(e)}
          >
            <input
              type="text"
              name="name"
              className=" border-gray-400 border-b-2 py-2 pl-2 mb-2"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              name="email"
              className=" border-gray-400 border-b-2 py-2 pl-2 mb-2"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex my-2">
              <input
                type="checkbox"
                name="isAdmin"
                checked={isAdmin}
                className=" mr-2"
                placeholder="Enter image url"
                onChange={() => setIsAdmin(!isAdmin)}
              />
              <label htmlFor="isAdmin">Is Admin </label>
            </div>

            <button
              type="submit"
              className="bg-[#1c274e] text-white rounded-md py-1 mb-2 mt-10 hover:bg-gray-400"
            >
              Update User
            </button>
          </form>
        )}
      </FormContainer>
    </>
  );
};

export default EditUser;
