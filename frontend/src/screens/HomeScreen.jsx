import { useGetProductsQuery } from "../slices/productsApiSlice";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductsCaroussel from "../components/ProductsCaroussel";
import Paginate from "../components/Paginate";
import Meta from "../components/Meta";

function HomeScreen() {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {!keyword ? (
        <ProductsCaroussel />
      ) : (
        <Link to="/" className="btn btn-light mb-4">
          GoBack
        </Link>
      )}
      {isLoading ? (
        <>
          <br />
          <Loader />
        </>
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          {!keyword ? <h1>Latest Products</h1> : <h1>{keyword}</h1>}
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
}
export default HomeScreen;
