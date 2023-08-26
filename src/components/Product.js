import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";
import { getProducts } from "../store/productSlice";
import statusCode from "../utils/statusCode";

const Product = () => {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.products);
  // const [products, getProducts] = useState([]);
  useEffect(() => {
    // dispatch an action to fetch products
    dispatch(getProducts());
    // fetch("https://fakestoreapi.com/products")
    //   .then((data) => data.json())
    //   .then((result) => getProducts(result));
  }, []);

  if (status === statusCode.LOADING) {
    return <p> Loading... </p>;
  }

  if (status === statusCode.ERROR) {
    return (
      <Alert key="danger" variant="danger">
        Something went wrong! Try again later...
      </Alert>
    );
  }

  const addToCart = (product) => {
    //dispatch an action
    dispatch(add(product));
  };

  const cards = products.map((product) => (
    <div className="col-md-3">
      <Card key={product.id} className="h-100">
        <div className="text-center">
          <Card.Img
            variant="top"
            src={product.image}
            style={{ width: "100px", height: "130px" }}
          />
        </div>
        <Card.Body>
          <Card.Title> {product.title} </Card.Title>
          <Card.Text>INR: {product.price}</Card.Text>
        </Card.Body>
        <Card.Footer style={{ background: "white" }}>
          <Button variant="primary" onClick={() => addToCart(product)}>
            Add To Cart
          </Button>
        </Card.Footer>
      </Card>
    </div>
  ));

  return (
    <div>
      <h1> Product Dashboard </h1>
      <div className="row">{cards}</div>
    </div>
  );
};

export default Product;
