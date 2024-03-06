import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetLatestProductsQuery } from "../slices/productApiSlice";
import Product from "../components/Product";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
const Home = () => {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
  };

  const {
    data: latestProducts,
    isLoading,
    error,
  } = useGetLatestProductsQuery();

  return (
    <>
      <Slider {...settings}>
        <img
          src="/images/Banner.jpg"
          alt=""
          className="w-full h-[30vh] lg:h-[75vh]"
        />
        <img
          src="/images/Banner2.jpg"
          alt=""
          className="w-full h-[30vh] lg:h-[75vh]"
        />
        <img
          src="/images/Banner1.jpg"
          alt=""
          className="w-full h-[30vh] lg:h-[75vh]"
        />
      </Slider>

      <div className="text-center mt-8">
        <h1 className="text-2xl font-semibold mb-4">Discover NEW Arrivals</h1>
        <h4 className=" text-gray-600 mb-10">Recently added tshirts!</h4>
        <div className="mx-auto w-[90%]">
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="Danger">{error}</Message>
          ) : (
            <div className="flex flex-wrap">
              {latestProducts.map((product) => (
                <Product product={product} key={product._id} />
              ))}
            </div>
          )}
        </div>
      </div>
      {/* <ProductList /> */}
    </>
  );
};

export default Home;
