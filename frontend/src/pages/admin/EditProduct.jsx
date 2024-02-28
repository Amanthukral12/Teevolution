import { useState, useEffect } from "react";
import { Form, Link, useNavigate, useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "../../slices/productApiSlice";

const EditProduct = () => {
  const { id: productId } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const updateProductHandler = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      _id: productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    };
    const result = await updateProduct(updatedProduct);
    refetch();
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Product Updated");
      navigate("/admin/productslist");
    }
  };

  return (
    <>
      <Link to="/admin/productslist">Go Back</Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="Danger">{error}</Message>
        ) : (
          <form
            className="flex flex-col"
            onSubmit={(e) => updateProductHandler(e)}
          >
            <label htmlFor="name">Name </label>
            <input
              type="text"
              name="name"
              className="my-2 border border-black"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="price">Price </label>
            <input
              type="text"
              name="price"
              className="my-2 border border-black"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <label htmlFor="image">Image </label>
            <input
              type="file"
              name="image"
              className="my-2 border border-black"
              onChange={(e) => setImage(e.target.value)}
            />
            <label htmlFor="brand">Brand </label>
            <input
              type="text"
              name="brand"
              className="my-2 border border-black"
              placeholder="Enter Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
            <label htmlFor="category">Category </label>
            <input
              type="text"
              name="category"
              className="my-2 border border-black"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="countInStock">Count in Stock </label>
            <input
              type="number"
              name="countInStock"
              className="my-2 border border-black"
              placeholder="Enter count in stock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            />
            <label htmlFor="description">Description </label>
            <input
              type="text"
              name="description"
              className="my-2 border border-black"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Update Product</button>
          </form>
        )}
      </FormContainer>
    </>
  );
};

export default EditProduct;
