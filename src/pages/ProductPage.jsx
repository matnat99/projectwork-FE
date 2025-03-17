import axios from "../api/axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Heading from "../components/ui/Heading";
import Button from "../components/ui/Button";
import HorizontalPCCard from "../components/ui/Card";
import VerticalPCCard from "../components/ui/VerticalCard";
import { Grid, List } from "lucide-react";
import {
  addToWishlist,
  addToCart,
  isInWishlist,
  isInCart,
  removeFromWishlist,
  removeFromCart,
} from "../utils/storage";

export default function ProductPage() {
  const { title } = useParams();
  const [product, setProduct] = useState({});
  const [inWishlist, setInWishlist] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [correlatedProducts, setCorrelatedProducts] = useState([]);
  const [viewType, setViewType] = useState("horizontal");
  const navigate = useNavigate();
  let TotalDiscount = product.price;

  if (product.discount > 0) {
    TotalDiscount = product.price - (product.price / 100) * product.discount;
  }

  const fetchProduct = () => {
    axios
      .get(`/yuno/${title}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          navigate("/404");
        }
      });
  };

  useEffect(fetchProduct, [title, navigate]);

  const fetchCorrelatedProducts = () => {
    const { ram, cpu, gpu } = product;

    axios
      .get("http://localhost:3001/yuno/correlated", {
        params: { ram: "4gb" },
      })
      .then((res) => {
        console.log(ram, cpu, gpu);
        setCorrelatedProducts(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.error("Failed to fetch correlated products", err);
      });
  };

  useEffect(() => {
    if (product.id) {
      setInWishlist(isInWishlist(product.id));
      setInCart(isInCart(product.id));
      fetchCorrelatedProducts();
    }
  }, [product]);

  const handleAddToWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      setInWishlist(false);
    } else {
      addToWishlist({
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        discount: product.discount,
        category: product.category,
        cpu: product.cpu,
        description: product.description,
        gpu: product.gpu,
        quantity: product.quantity,
        ram: product.ram,
      });
      setInWishlist(true);
    }
  };

  const handleAddToCart = () => {
    if (inCart) {
      removeFromCart(product.id);
      setInCart(false);
    } else {
      addToCart({
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        discount: product.discount,
        category: product.category,
        cpu: product.cpu,
        description: product.description,
        gpu: product.gpu,
        quantity: product.quantity,
        ram: product.ram,
      });
      setInCart(true);
    }
  };

  return (
    <div className="max-w-8xl mx-auto px-4 my-12">
      <div className="max-w-6xl mx-auto">
        <Heading level={6}>
          <Link to="/" className="text-white">
            /Home
          </Link>
          <Link to={`/yuno/${product.id}`} className="text-white">
            /{product.title}
          </Link>
        </Heading>
        {/* Product Card*/}
        <div className="grid grid-cols-12 gap-2 mt-5 p-4 bg-white rounded-xl shadow-md shadow-black">
          <div className="col-span-12 md:col-span-4">
            <img
              className="w-full"
              src={`${product.image}.jpg`}
              alt={product.title}
            />
          </div>
          <div className="col-span-12 md:col-span-8 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <Heading level={3}>{product.title}</Heading>
              <div className="flex items-center justify-between">
                {product.discount > 0 && (
                  <Heading
                    level={5}
                    className="text-red-500 line-through ml-2"
                  >{`€${Number(product.price).toFixed(2)}`}</Heading>
                )}
                <Heading level={5} className="text-blue-600">{`€${Number(
                  TotalDiscount
                ).toFixed(2)}`}</Heading>
              </div>
            </div>
            <Heading level={5}>
              <strong>Categoria: </strong> {product.category}
            </Heading>
            <Heading level={5}>
              <strong>Ram: </strong> {product.ram}
            </Heading>
            <Heading level={5}>
              <strong>Cpu: </strong> {product.cpu}
            </Heading>
            <Heading level={5}>
              <strong>Gpu: </strong> {product.gpu}
            </Heading>
            <p className="text-lg">
              <strong>Descrizione: </strong>
              {product.description}
            </p>
            <Heading level={5}>
              <strong>Quantità: </strong> {product.quantity}
            </Heading>
            <div className="flex justify-end gap-4 mt-4">
              <Button
                className={inWishlist ? "bg-red-600 hover:bg-red-700" : ""}
                onClick={handleAddToWishlist}
              >
                <i className="fa-regular fa-heart mr-2"></i>
                {inWishlist ? "Nei preferiti" : "Aggiungi ai preferiti"}
              </Button>
              <Button
                className={inCart ? "bg-green-600 hover:bg-green-700" : ""}
                onClick={handleAddToCart}
              >
                <i className="fa-solid fa-cart-shopping mr-2"></i>
                {inCart ? "Nel carrello" : "Aggiungi al carrello"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Correlated */}
      <div className="text-white p-12 mt-4 flex justify-between items-center">
        <Heading level={2}>Prodotti correlati</Heading>
        <div className="bg-gray-700 rounded-lg p-1 inline-flex">
          <button
            onClick={() => setViewType("horizontal")}
            className={`p-2 rounded-md ${
              viewType === "horizontal" ? "bg-gray-600 shadow-sm" : ""
            }`}
            aria-label="Visualizzazione orizzontale"
          >
            <List size={20} color="white" />
          </button>
          <button
            onClick={() => setViewType("vertical")}
            className={`p-2 rounded-md ${
              viewType === "vertical" ? "bg-gray-600 shadow-sm" : ""
            }`}
            aria-label="Visualizzazione verticale"
          >
            <Grid size={20} color="white" />
          </button>
        </div>
      </div>

      {viewType === "horizontal" ? (
        // Visualizzazione orizzontale
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {correlatedProducts.map((card, index) => (
            <div key={index} className={index === 0 ? "hidden md:block" : ""}>
              <HorizontalPCCard
                title={card.title}
                image={card.image}
                description={card.description}
                category={card.category}
                price={card.price}
                quantity={card.quantity}
                cpu={card.cpu}
                gpu={card.gpu}
                ram={card.ram}
                discount={card.discount}
                id={card.id}
              />
            </div>
          ))}
        </div>
      ) : (
        // Visualizzazione verticale
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
            {correlatedProducts.map((card, index) => (
              <div key={index} className={index === 0 ? "hidden md:block" : ""}>
                <VerticalPCCard
                  title={card.title}
                  image={card.image}
                  description={card.description}
                  category={card.category}
                  price={card.price}
                  quantity={card.quantity}
                  cpu={card.cpu}
                  gpu={card.gpu}
                  ram={card.ram}
                  discount={card.discount}
                  id={card.id}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
