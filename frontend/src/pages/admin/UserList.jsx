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
      <h1>Users</h1>
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="Danger">
          {" "}
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-center">
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>

                <td>
                  {user.isAdmin ? (
                    <FaCheck className="text-green-500 mx-auto" />
                  ) : (
                    <FaTimes className="text-red-500 mx-auto" />
                  )}
                </td>

                <td>
                  <Link to={`/admin/user/${user._id}/edit`}>
                    <button>
                      <FaEdit />
                    </button>
                  </Link>
                  <button
                    className="ml-2"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <FaTrash />
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
