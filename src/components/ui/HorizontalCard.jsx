import Heading from "./Heading";
import { Link } from "react-router-dom";
import Button from "./Button";
import {
  addToWishlist,
  addToCart,
  isInWishlist,
  removeFromWishlist,
  removeFromCart,
  isInCart,
} from "../../utils/storage";
import { useState, useEffect } from "react";

export default function HorizontalPCCard({
  category,
  cpu,
  description,
  discount,
  gpu,
  id,
  image,
  price,
  quantity,
  ram,
  title,
}) {
  let TotalDiscount = price;

  if (discount > 0) {
    TotalDiscount = price - (price / 100) * discount;
  }

  const [inWishlist, setInWishlist] = useState(false);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    setInWishlist(isInWishlist(id));
    setInCart(isInCart(id));
  }, [id]);

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(id);
      setInWishlist(false);
    } else {
      addToWishlist({
        id,
        title,
        image,
        price,
        discount,
        category,
        cpu,
        description,
        gpu,
        quantity,
        ram,
      });
      setInWishlist(true);
    }
  };
  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart({
      id,
      title,
      image,
      price,
      discount,
      category,
      cpu,
      description,
      gpu,
      quantity,
      ram,
    });
    setInCart(true);
  };

  return (
    <Link to={`/yuno/${title}`}>
      <div
        className={`bg-white rounded-xl shadow-md shadow-black flex h-80 ${
          quantity < 1
            ? "border-4 border-gray-600"
            : discount > 0
            ? "border-x-4 border-red-500"
            : ""
        }`}
      >
        <div className="w-1/2">
          <img
            className="w-full h-full object-contain p-4"
            src={`${image}.jpg`}
            alt={title}
          />
        </div>
        <div className="p-3 w-1/2 flex flex-col justify-between">
          <div>
            <Heading level={5} className="mb-1 line-clamp-3">
              {title}
            </Heading>
            <p className="text-xs line-clamp-3 md:line-clamp-4 xl:line-clamp-5 ">
              {description}
            </p>
          </div>
          <div className="text-center mt-2">
            {quantity < 1 ? (
              <span className="text-gray-500 text-xl">NON DISPONIBILE</span>
            ) : (
              <div className="mb-1">
                {discount > 0 && (
                  <span className="text-red-500 line-through ml-2">{`€ ${Number(
                    price
                  ).toFixed(2)}`}</span>
                )}{" "}
                <span className="text-black">{`€ ${Number(
                  TotalDiscount
                ).toFixed(2)}`}</span>
                {/* Aggiunta barra disponibilità */}
                <div className="max-w-36 w-full m-auto bg-gray-200 h-2 rounded-full mt-2">
                  <div
                    className={`h-2 rounded-full ${
                      quantity <= 3
                        ? "bg-red-500"
                        : quantity <= 7
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                    style={{
                      width: `${Math.min((quantity / 10) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {quantity <= 3
                    ? "Quasi esaurito"
                    : quantity <= 7
                    ? "Disponibilità media"
                    : "Ampia disponibilità"}
                </div>
              </div>
            )}

            <div className="flex gap-2 justify-center mt-2">
              <Button
                onClick={handleAddToWishlist}
                className={`text-center text-xs py-1 px-3 cursor-pointer hover:bg-blue-700  ${
                  inWishlist ? "bg-red-600 hover:bg-red-700" : "bg-blue-600"
                }`}
                size="xs"
              >
                {inWishlist > 0 ? (
                  <i className="fa-solid fa-heart" />
                ) : (
                  <i className="fa-regular fa-heart" />
                )}
              </Button>
              <Button
                onClick={handleAddToCart}
                disabled={quantity < 1}
                className={`text-center text-xs py-1 px-3 hover:bg-blue-700 ${
                  quantity < 1
                    ? "bg-gray-500 hover:bg-gray-500 cursor-not-allowed"
                    : inCart
                    ? "bg-green-600 hover:bg-green-700 cursor-pointer"
                    : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                }`}
                size="xs"
              >
                {inCart > 0 ? (
                  <i className="fa-solid fa-cart-shopping" />
                ) : (
                  <i className="fa-solid fa-cart-plus" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
