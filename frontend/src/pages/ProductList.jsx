import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productApiSlice";
import Paginate from "../components/Paginate";

const ProductList = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

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
          <div className="flex flex-wrap justify-evenly pt-10">
            {data.products.map((product) => (
              <Product product={product} key={product._id} />
            ))}
          </div>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </section>
  );
};

export default ProductList;
