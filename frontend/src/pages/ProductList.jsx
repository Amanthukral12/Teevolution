import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productApiSlice";

const ProductList = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <section className="px-[3rem] pb-[2rem]">
      {isLoading ? (
        <h2>Loading</h2>
      ) : error ? (
        error?.data?.message || error.error
      ) : (
        <>
          <h1 className="text-center py-20">New Arrivals</h1>
          <div className="flex flex-wrap justify-evenly">
            {products.map((product) => (
              <Product product={product} key={product._id} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default ProductList;
