import { productIdSchema } from "@shop/shared";
import { useParams } from "react-router-dom";
import { paths } from "../app/paths";
import Container from "../components/layout/Container";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import { ApiRequestError } from "../lib/api-client";
import { useApi } from "../lib/useApi";
import { fetchProduct } from "../features/products/api";
import Gallery from "../features/product-detail/components/Gallery";
import ProductInfo from "../features/product-detail/components/ProductInfo";
import ProductTabs from "../features/product-detail/components/ProductTabs";
import RelatedProducts from "../features/product-detail/components/RelatedProducts";
import NotFoundPage from "./NotFoundPage";

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const ProductDetailPage = () => {
  const { productId = "" } = useParams<{ productId: string }>();
  const parsed = productIdSchema.safeParse(productId);
  const id = parsed.success ? parsed.data : null;

  // key includes the raw param so invalid ids don't hit the API; fetcher rejects as a 404.
  const { data: product, loading, error } = useApi(
    (signal) => (id === null ? Promise.reject(new ApiRequestError("Invalid id", 404)) : fetchProduct(id, signal)),
    productId,
  );

  if (id === null || (error instanceof ApiRequestError && error.status === 404)) return <NotFoundPage />;

  if (error && !product) {
    return <p className="py-32 text-center">Couldn&apos;t load this product. Please try again in a moment.</p>;
  }

  if (!product || loading) {
    return (
      <Container>
        <div className="py-10 lg:grid lg:grid-cols-2 lg:gap-10" aria-busy="true" aria-label="Loading product">
          <div className="aspect-square animate-pulse rounded-[20px] bg-card" />
          <div className="mt-6 space-y-4 lg:mt-0">
            <div className="h-10 w-3/4 animate-pulse rounded bg-card" />
            <div className="h-6 w-1/3 animate-pulse rounded bg-card" />
            <div className="h-24 animate-pulse rounded bg-card" />
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="border-t border-line">
        <Breadcrumbs
          items={[
            { label: "Home", to: paths.home },
            { label: "Shop", to: paths.shop },
            { label: cap(product.type), to: `${paths.shop}?type=${product.type}` },
            { label: product.name },
          ]}
        />
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:gap-10">
        <Gallery key={product.product_id} images={product.images.length ? product.images : [product.image_url]} alt={product.name} />
        <div className="mt-6 lg:mt-0">
          <ProductInfo key={product.product_id} product={product} />
        </div>
      </div>

      <ProductTabs key={product.product_id} product={product} />
      <RelatedProducts productId={product.product_id} />
    </Container>
  );
};

export default ProductDetailPage;
