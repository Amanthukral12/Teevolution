import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productApiSlice";

const EditProduct = () => {
  const { id: productId } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
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
  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

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
    try {
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
      await updateProduct(updatedProduct).unwrap();
      toast.success("Product Updated");
      refetch();
      navigate("/admin/productslist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const result = await uploadProductImage(formData).unwrap();
      toast.success(result.message);
      setImage(result.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
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
          <Message variant="Danger">
            {" "}
            {error?.data?.message || error.error}
          </Message>
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
              type="text"
              name="image"
              className="my-2 border border-black"
              placeholder="Enter image url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            {loadingUpload && <Loader />}
            <input
              type="file"
              name="image"
              className="my-2 border border-black"
              onChange={uploadFileHandler}
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
