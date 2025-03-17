import Heading from "./Heading";
import { Link } from "react-router-dom";
import Button from "./Button";
import {
  addToWishlist,
  addToCart,
  isInWishlist,
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
    <Link to={`/Yuno/${id}`}>
      <div
        className={`bg-white rounded-xl shadow-md shadow-black flex h-60 ${
          discount > 0 ? "border-4 border-red-500" : ""
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
            {/* <ul className="text-sm list-disc pl-5">
            <li>{gpu}</li>
            <li>{cpu}</li>
            <li>{ram}</li>
          </ul> */}
            <p className="text-xs  line-clamp-2 md:line-clamp-4 xl:line-clamp-5">
              {description}
            </p>
          </div>
          <div className="text-center mt-2">
            <div className="mb-1">
              {discount > 0 && (
                <span className="text-red-500 line-through ml-2">{`€ ${Number(
                  price
                ).toFixed(2)}`}</span>
              )}
              <span className="text-blue-600">{`€ ${Number(
                TotalDiscount
              ).toFixed(2)}`}</span>
            </div>
            <div className="flex gap-2 justify-center mt-2">
              <Button
                onClick={handleAddToWishlist}
                className={`text-center text-xs py-1 px-3 ${
                  inWishlist ? "bg-blue-600" : ""
                }`}
                size="xs"
              >
                <i className="fa-regular fa-heart"></i>
              </Button>
              <Button
                onClick={handleAddToCart}
                className={`text-center text-xs py-1 px-3 ${
                  inCart ? "bg-blue-600" : ""
                }`}
                size="xs"
              >
                <i className="fa-solid fa-cart-shopping"></i>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
