import axios from "../api/axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Heading from "../components/ui/Heading";
import Button from "../components/ui/Button";
import HorizontalPCCard from "../components/ui/HorizontalCard";
import VerticalPCCard from "../components/ui/VerticalCard";
import { Check, Grid, List } from "lucide-react";
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
      .get("/yuno/correlated", {
        params: {
          ram: `${product.ram.match(/\d+/)[0]}gb`,
          cpu: product.cpu.match(/intel/i) ? "Intel" : "AMD",
        },
      })
      .then((res) => {
        const filteredProducts = res.data.filter(
          (correlatedProduct) => correlatedProduct.id !== product.id
        );
        setCorrelatedProducts(filteredProducts);
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
          <Link onClick={() => navigate(-1)} className="text-white">
            /Indietro
          </Link>
          <Link to={`/yuno/${product.title}`} className="text-white">
            /{product.title}
          </Link>
        </Heading>
        {/* Product Card*/}
        <div
          className={`grid grid-cols-12 gap-2 mt-5 p-4 bg-white rounded-xl shadow-md shadow-black ${
            product.quantity < 1
              ? "border-x-4 border-gray-600"
              : product.discount > 0
              ? "border-x-4 border-red-500"
              : ""
          }
          }`}
        >
          <div className="col-span-12 md:col-span-4">
            <img
              className="w-full max-h-[400px] object-contain"
              src={`${product.image}.jpg`}
              alt={product.title}
            />
          </div>
          <div className="col-span-12 md:col-span-8 p-4 space-y-2 flex flex-col justify-between">
            <div className="flex flex-col">
              <div
                className={`${
                  window.innerWidth > 767
                    ? "flex items-center justify-between"
                    : ""
                }`}
              >
                <Heading level={3}>{product.title}</Heading>
                <div className={`flex gap-1 items-center`}>
                  {product.discount > 0 && (
                    <Heading
                      level={5}
                      className="text-red-500 line-through"
                    >{`€${Number(product.price).toFixed(2)}`}</Heading>
                  )}
                  <Heading level={5} className="text-black">{`€${Number(
                    TotalDiscount
                  ).toFixed(2)}`}</Heading>
                </div>
              </div>
              <br />
              <Heading level={5}>
                <strong>Categoria: </strong> {product.category}
              </Heading>
              <Heading level={5}>
                <strong>Ram: </strong>{" "}
                <a className="text-gray-900 text-[0.8em]">{product.ram}</a>
              </Heading>
              <Heading level={5}>
                <strong>Cpu: </strong>{" "}
                <a className="text-gray-900 text-[0.8em]">{product.cpu}</a>
              </Heading>
              <Heading level={5}>
                <strong>Gpu: </strong>{" "}
                <a className="text-gray-900 text-[0.8em]">{product.gpu}</a>
              </Heading>

              <Heading level={5}>
                <strong>Descrizione: </strong>
              </Heading>
              <p className="text-gray-900 text-md">{product.description}</p>
              <br />
              <Heading level={5}>
                <strong>Quantità: </strong>{" "}
                <i className="text-gray-700">
                  {product.quantity < 0 ? 0 : product.quantity}
                </i>
              </Heading>
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <Button
                className={`cursor-pointer hover:bg-blue-700 ${
                  inWishlist ? "bg-red-600 hover:bg-red-700" : ""
                }`}
                onClick={handleAddToWishlist}
              >
                {inWishlist > 0 ? (
                  <>
                    <i
                      className={`fa-solid fa-heart ${
                        window.innerWidth < 511 ? "" : "mr-2"
                      }`}
                    />
                    <a>{window.innerWidth < 511 ? <br /> : ""}</a>
                  </>
                ) : (
                  <>
                    <i
                      className={`fa-regular fa-heart ${
                        window.innerWidth < 511 ? "" : "mr-2"
                      }`}
                    />
                    <a>{window.innerWidth < 511 ? <br /> : ""}</a>
                  </>
                )}
                {inWishlist ? "Nei preferiti" : "Aggiungi ai preferiti"}
              </Button>
              <div className="w-49 flex justify-end">
                {product.quantity < 1 ? (
                  <Button
                    className="bg-gray-500 cursor-not-allowed"
                    disabled={true}
                  >
                    NON DISPONIBILE
                  </Button>
                ) : (
                  <Button
                    className={`cursor-pointer hover:bg-blue-700 ${
                      inCart ? "bg-green-600 hover:bg-green-700" : ""
                    }`}
                    onClick={handleAddToCart}
                  >
                    {inCart > 0 ? (
                      <>
                        <i
                          className={`fa-solid fa-cart-shopping ${
                            window.innerWidth < 511 ? "" : "mr-2"
                          }`}
                        />
                        <a>{window.innerWidth < 511 ? <br /> : ""}</a>
                      </>
                    ) : (
                      <>
                        <i
                          className={`fa-solid fa-cart-plus ${
                            window.innerWidth < 511 ? "" : "mr-2"
                          }`}
                        />
                        <a>{window.innerWidth < 511 ? <br /> : ""}</a>
                      </>
                    )}
                    {inCart ? "Nel carrello" : "Aggiungi al carrello"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Correlated */}
      {correlatedProducts.length > 0 && (
        <div className="text-white p-12 mt-4 flex justify-between items-center">
          <Heading level={2}>Prodotti correlati</Heading>
          <div className="hidden md:inline-flex bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewType("horizontal")}
              className={`p-2 rounded-md cursor-pointer ${
                viewType === "horizontal" ? "bg-gray-600 shadow-sm" : ""
              }`}
              aria-label="Visualizzazione orizzontale"
            >
              <List size={20} color="white" />
            </button>
            <button
              onClick={() => setViewType("vertical")}
              className={`p-2 rounded-md cursor-pointer ${
                viewType === "vertical" ? "bg-gray-600 shadow-sm" : ""
              }`}
              aria-label="Visualizzazione verticale"
            >
              <Grid size={20} color="white" />
            </button>
          </div>
        </div>
      )}

      {viewType === "horizontal" ? (
        // Visualizzazione orizzontale
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {correlatedProducts.map((card, index) => (
            <div key={index} className={index === 0 ? "hidden md:block" : ""}>
              {product.title == card.title ? (
                <></>
              ) : (
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
              )}
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
