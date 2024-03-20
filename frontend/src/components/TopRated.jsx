import Loader from "./Loader";
import Message from "./Message";
import Product from "./Product";
import { useGetTopProductsQuery } from "../slices/productApiSlice";

const TopRated = () => {
  const { data: topProducts, isLoading, error } = useGetTopProductsQuery();
  return (
    <div className="text-center mt-8 mb-10">
      <h1 className="text-2xl font-semibold mb-4">Best Rated</h1>
      <h4 className=" text-gray-600 mb-10">Browse our best rated products</h4>
      <div className="mx-auto w-[95%]">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="Danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <div className="flex flex-col justify-center items-center md:flex md:flex-row md:flex-wrap">
            {topProducts.map((product) => (
              <Product product={product} key={product._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopRated;
