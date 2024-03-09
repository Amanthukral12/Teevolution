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
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    keyword,
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
        <h1 className="text-2xl my-5">Products</h1>
        <div>
          <button
            className="flex items-center text-lg"
            onClick={createProductHandler}
          >
            <FaEdit className="mr-2" /> Create Product
          </button>
        </div>
      </div>
      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="Danger">
          {" "}
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <table className="mt-4 w-[90%] mx-20 text-center text-sm font-light text-surface">
            <thead className="border-b border-gray-400 font-medium ">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">NAME</th>
                <th className="px-6 py-4">PRICE</th>
                <th className="px-6 py-4">CATEGORY</th>
                <th className="px-6 py-4">BRAND</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="text-center">
              {data.products.map((product) => (
                <tr key={product._id} className="py-4 odd:bg-slate-300">
                  <td className="py-4">{product._id}</td>
                  <td className="py-4">{product.name}</td>
                  <td className="py-4">{product.price}</td>
                  <td className="py-4">{product.category}</td>
                  <td className="py-4">{product.brand}</td>
                  <td className="flex py-4">
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <FaEdit className="mx-2 text-lg" />
                    </Link>
                    <button onClick={() => deleteHandler(product._id)}>
                      <FaTrash className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Paginate
            pages={data.pages}
            page={data.page}
            isAdmin={true}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default ProductsList;
