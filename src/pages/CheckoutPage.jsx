import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../components/ui/Heading";
import Button from "../components/ui/Button";
import {
  getCheckoutData,
  clearCheckoutData,
  infoSales,
} from "../utils/storage";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [checkoutData, setCheckoutData] = useState({});
  const [cartOut, setCartOut] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    surname: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  //recuperiamo i dati per il checkout
  useEffect(() => {
    const data = getCheckoutData();
    if (!data) {
      navigate("/cart");
      return;
    }
    setCheckoutData(data);
  }, [navigate]);

  //recuperiamo i prodotti nel carrello
  useEffect(() => {
    // Carica inizialmente i prodotti nel carrello
    const Citems = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartOut(Citems);

    // Listener per l'evento di aggiornamento carrello
    const handleCartUpdate = () => {
      const updatedItems = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartOut(updatedItems);
    };

    // Aggiungi il listener agll' evento
    window.addEventListener("cartUpdate", handleCartUpdate);

    // Cleanup del listener quando il componente viene smontato
    return () => {
      window.removeEventListener("cartUpdate", handleCartUpdate);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Genera un ID univoco che sarà usato sia per l'utente che per la vendita
      const uniqueId = crypto.randomUUID();

      // Aggiorna il formData con il nuovo ID
      const userDataToSend = {
        ...formData,
        id: uniqueId,
      };

      // Create user
      const userResponse = await fetch("http://localhost:3001/user/new_user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDataToSend),
      });

      const userData = await userResponse.json();
      console.log(userData);
      const uniqueUserID = uniqueId + "user";

      // Create sale
      const saleData = {
        id: uniqueId,
        user_id: uniqueUserID,
        user_email: formData.email,
        user_address: formData.address,
        data: new Date().toISOString(),
        state: "confermato",
        discounted: Number(checkoutData.discountedTotal),
        total: Number(checkoutData.total),
      };

      infoSales(saleData);
      console.log(infoSales);

      await fetch("http://localhost:3001/sale/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(saleData),
      });

      // Create product_sale
      for (let i = 0; i < cartOut.length; i++) {
        const prod_sale_data = {
          sales_id: uniqueId,
          quantity: cartOut[i].quantity,
          unitary_price: cartOut[i].price,
          product_title: cartOut[i].title,
          product_image: cartOut[i].image,
        };

        await fetch("http://localhost:3001/prod_sale/new_prod_sale", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(prod_sale_data),
        });
      }

      infoSales(saleData);

      // Clear cart and checkout data
      localStorage.removeItem("cart");
      clearCheckoutData();

      // Redirect to success page
      navigate("/order-success");
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex justify-between">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl">
        <Heading level={2} className=" mb-6">
          Riepilogo Carrello:
        </Heading>
        <div>
          {cartOut.map((card, index) => (
            <div key={index} className={index === 0 ? "hidden md:block" : ""}>
              title={card.title}
              image={card.image}
              price={card.price}
              quantity={card.quantity}
              discount={card.discount}
            </div>
          ))}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white p-6 rounded-xl"
      >
        {Object.entries({
          name: "Nome",
          surname: "Cognome",
          email: "Email",
          password: "Password",
          address: "Indirizzo",
          phone: "Telefono",
        }).map(([key, label]) => (
          <div key={key} className="mb-4">
            <label className="block mb-2">{label}</label>
            <input
              type={key === "password" ? "password" : "text"}
              value={formData[key]}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [key]: e.target.value,
                }))
              }
              className="w-full p-2 border-b focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
        ))}
        <Button
          type="submit"
          variant="primary"
          className="w-full hover:bg-blue-700 "
        >
          Conferma Ordine
        </Button>
      </form>
    </div>
  );
}
