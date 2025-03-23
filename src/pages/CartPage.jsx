import { useState, useEffect } from "react";
import { removeFromCart } from "../utils/storage";
import Heading from "../components/ui/Heading";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(items);
  }, []);

  const handleRemove = (id) => {
    removeFromCart(id);
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id, newQuantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.min(
                Math.max(1, newQuantity),
                item.availableQuantity
              ),
              bulkDiscount: newQuantity > 1 ? 5 : 0,
            }
          : item
      )
    );
    // Aggiorna il localStorage
    const updatedCart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: Math.min(
              Math.max(1, newQuantity),
              item.availableQuantity
            ),
            bulkDiscount: newQuantity > 1 ? 5 : 0,
          }
        : item
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    // Dispatchare l'evento di aggiornamento del carrello
    window.dispatchEvent(new Event("cartUpdate"));
  };

  const handleCheckout = () => {
    // salva la situazione attuale del carrello da restituire poi alla checkout page
    sessionStorage.setItem(
      "checkoutData",
      JSON.stringify({
        items: cart,
        total: total,
        discountedTotal: discountedTotal,
      })
    );
    console.log(sessionStorage);
    navigate("/checkout");
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountedTotal = cart.reduce((acc, item) => {
    let price = item.price;
    // Aggiungi sconto
    if (item.discount > 0) {
      price -= (price / 100) * item.discount;
    }
    // applica sconto "bulk" se > 1 di quantità
    if (item.quantity > 1) {
      price -= (price / 100) * item.bulkDiscount;
    }
    return acc + price * item.quantity;
  }, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mt-4 text-white">
        <Heading level={2}>Carrello</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 text-black">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-4 flex flex-col"
            >
              <img
                src={`${item.image}.jpg`}
                alt={item.title}
                className="w-full h-48 object-contain"
              />
              <Heading level={4} className="mt-4">
                {item.title}
              </Heading>
              <div className="mt-4 flex items-center">
                <label className="mr-2">Quantità:</label>
                <input
                  type="number"
                  min="1"
                  max={item.availableQuantity}
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                  className="w-20 px-2 py-1 border rounded"
                />
                <span className="ml-2 text-sm text-gray-500">
                  (Max: {item.availableQuantity})
                </span>
              </div>
              <div className="mt-auto pt-4 flex justify-between items-center">
                {item.discount > 0 || item.quantity > 1 ? (
                  <div>
                    <span className="text-gray-500 line-through">{`€ ${Number(
                      item.price * item.quantity
                    ).toFixed(2)}`}</span>
                    <span className="text-red-600 ml-2">{`€ ${Number(
                      (item.price -
                        (item.price / 100) * item.discount -
                        (item.price / 100) * item.bulkDiscount) *
                        item.quantity
                    ).toFixed(2)}`}</span>
                    {item.quantity > 1 && (
                      <span className="text-green-600 text-sm ml-2">
                        (Sconto quantità: -5%)
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-black-600">{`€ ${Number(
                    item.price * item.quantity
                  ).toFixed(2)}`}</span>
                )}
                <Button
                  onClick={() => handleRemove(item.id)}
                  variant="secondary"
                  size="sm"
                >
                  <i className="fa-solid fa-trash"></i>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {cart.length === 0 ? (
        <p className="text-white text-center">Il tuo carrello è vuoto</p>
      ) : (
        <div className="mt-8 text-right text-white">
          <Heading level={3}>
            {total !== discountedTotal && (
              <span className="line-through text-gray-400 mr-4">
                Totale: € {total.toFixed(2)}
              </span>
            )}

            <span className={total !== discountedTotal ? "text-red-500" : ""}>
              Totale finale: € {discountedTotal.toFixed(2)}
            </span>
          </Heading>
          <Button onClick={handleCheckout} variant="primary" className="mt-4">
            Procedi all'acquisto
          </Button>
        </div>
      )}
    </div>
  );
}
