import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../slices/productApiSlice";
import { toast } from "react-toastify";
import Paginate from "../../components/Paginate";
const ProductsList = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new Product?")) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete the product?")) {
      try {
        await deleteProduct(id);
        toast.success("Product Deleted");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <div className="flex mx-20 justify-between items-center">
        <h1>Products</h1>
        <div>
          <button className="flex items-center" onClick={createProductHandler}>
            <FaEdit /> Create Product
          </button>
        </div>
      </div>
      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
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
              {data.products.map((product) => (
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
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductsList;
