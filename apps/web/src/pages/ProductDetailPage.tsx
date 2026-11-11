import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  return <div className="text-black">Product {productId}</div>;
};

export default ProductDetailPage;
