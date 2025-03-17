import axios from "../api/axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Heading from "../components/ui/Heading";
import Button from "../components/ui/Button";
import {
  addToWishlist,
  addToCart,
  isInWishlist,
  isInCart,
  removeFromWishlist,
  removeFromCart,
} from "../utils/storage";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [inWishlist, setInWishlist] = useState(false);
  const [inCart, setInCart] = useState(false);
  const navigate = useNavigate();
  let TotalDiscount = product.price;

  if (product.discount > 0) {
    TotalDiscount = product.price - (product.price / 100) * product.discount;
  }

  const fetchProduct = () => {
    axios
      .get(`/yuno/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          navigate("/404");
        }
      });
  };

  useEffect(fetchProduct, [id, navigate]);

  useEffect(() => {
    if (product.id) {
      setInWishlist(isInWishlist(product.id));
      setInCart(isInCart(product.id));
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
    <div className="max-w-6xl mx-auto px-4 my-12">
      <Heading level={6}>
        <Link to="/" className="text-white">
          <i className="fa-solid fa-arrow-left-long"></i> Indietro
        </Link>
      </Heading>
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
            <Heading level={5}>
              {product.discount > 0 && (
                <span className="text-red-500 line-through ml-2">{`€ ${Number(
                  product.price
                ).toFixed(2)}`}</span>
              )}
              <span className="text-blue-600">{`€ ${Number(
                TotalDiscount
              ).toFixed(2)}`}</span>
            </Heading>
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
          <div className="flex gap-4 mt-4">
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
  );
}
