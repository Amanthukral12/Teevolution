import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetUsersQuery } from "../../slices/userApiSlice";
import { useDeleteUserMutation } from "../../slices/userApiSlice";
import { toast } from "react-toastify";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure to delete the User?")) {
      try {
        await deleteUser(id).unwrap();
        toast.success("User Deleted!");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <h1 className="text-2xl my-5 mx-20">Users</h1>
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="Danger">
          {" "}
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <table className=" w-[90%] mx-10 text-center text-sm font-light text-surface mb-10">
          <thead className="border-b border-gray-400 font-medium ">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">NAME</th>
              <th className="px-6 py-4">EMAIL</th>
              <th className="px-6 py-4">ADMIN</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="text-center">
            {users.map((user) => (
              <tr key={user._id} className="py-4 odd:bg-slate-300">
                <td className="py-4">{user._id}</td>
                <td className="py-4">{user.name}</td>
                <td className="py-4">
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>

                <td className="py-4">
                  {user.isAdmin ? (
                    <FaCheck className="text-green-500 mx-auto" />
                  ) : (
                    <FaTimes className="text-red-500 mx-auto" />
                  )}
                </td>

                <td className="flex py-4">
                  <Link to={`/admin/user/${user._id}/edit`}>
                    <FaEdit className="mx-2 text-lg" />
                  </Link>
                  <button onClick={() => deleteHandler(user._id)}>
                    <FaTrash className="text-lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default UserList;
