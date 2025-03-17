import { useState, useEffect } from "react";
import { removeFromWishlist, moveToCart } from "../utils/storage";
import Heading from "../components/ui/Heading";
import Button from "../components/ui/Button";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(items);
  }, []);

  const handleRemove = (id) => {
    removeFromWishlist(id);
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const handleMoveToCart = (id) => {
    moveToCart(id);
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Heading level={2} className="text-white mb-6">
        I miei preferiti
      </Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlist.map((item) => (
          <div key={item.id} className="bg-white rounded-xl p-4 flex flex-col">
            <img
              src={`${item.image}.jpg`}
              alt={item.title}
              className="w-full h-48 object-contain"
            />
            <Heading level={4} className="mt-4">
              {item.title}
            </Heading>
            <div className="mt-auto pt-4 flex justify-between items-center">
              {item.discount > 0 ? (
                <div>
                  <span className="text-gray-500 line-through">{`€ ${Number(
                    item.price
                  ).toFixed(2)}`}</span>
                  <span className="text-red-600 ml-2">{`€ ${Number(
                    item.price - (item.price / 100) * item.discount
                  ).toFixed(2)}`}</span>
                </div>
              ) : (
                <span className="text-blue-600">{`€ ${Number(
                  item.price
                ).toFixed(2)}`}</span>
              )}
              <div className="flex gap-2">
                <Button onClick={() => handleMoveToCart(item.id)} size="sm">
                  <i className="fa-solid fa-cart-shopping"></i>
                </Button>
                <Button
                  onClick={() => handleRemove(item.id)}
                  variant="secondary"
                  size="sm"
                >
                  <i className="fa-solid fa-trash"></i>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {wishlist.length === 0 && (
        <p className="text-white text-center">La tua wishlist è vuota</p>
      )}
    </div>
  );
}
