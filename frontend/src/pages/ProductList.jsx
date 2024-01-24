import React, { useEffect, useState } from "react";
import products from "../products";
import Product from "../components/Product";
import axios from "axios";
const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");

      setProducts(data);
    };
    fetchProducts();
  }, []);
  return (
    <section className="px-[3rem] pb-[2rem]">
      <h1 className="text-center py-20">New Arrivals</h1>
      <div className="flex flex-wrap justify-evenly">
        {products.map((product) => (
          <Product product={product} key={product._id} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
