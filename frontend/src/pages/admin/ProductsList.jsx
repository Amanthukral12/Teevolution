import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../slices/productApiSlice";
const ProductsList = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  const deleteHandler = (id) => {
    console.log("delete", id);
  };

  return (
    <>
      <div className="flex mx-20 justify-between items-center">
        <h1>Products</h1>
        <div>
          <button className="flex items-center">
            <FaEdit /> Create Product
          </button>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="Danger">{error}</Message>
      ) : (
        <>
          <table className="mt-4 w-[90%] mx-20">
            <thead>
              <tr className="text-left">
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="text-left">
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td className="flex">
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <FaEdit className="mx-2" />
                    </Link>
                    <button onClick={() => deleteHandler(product._id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default ProductsList;
