import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productApiSlice";

const ProductList = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ pageNumber });

  return (
    <section className="px-[3rem] pb-[2rem]">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="Danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1 className="text-center py-20">New Arrivals</h1>
          <div className="flex flex-wrap justify-evenly">
            {data.products.map((product) => (
              <Product product={product} key={product._id} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default ProductList;
