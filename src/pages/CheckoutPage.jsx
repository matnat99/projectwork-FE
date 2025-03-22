import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../components/ui/Heading";
import Button from "../components/ui/Button";
import axios from "axios";
import "../styles/forms.css";

import {
  getCheckoutData,
  clearCheckoutData,
  infoSales,
  removeFromCart,
} from "../utils/storage";
import { div } from "framer-motion/client";

// Funzione per inviare l'email, definita fuori dal componente
const sendOrderConfirmationEmail = async (email) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/email/send-confirmation",
      {
        email: email,
      }
    );

    if (response.status === 200) {
      console.log("✅ Email inviata con successo a:", email);
      console.log("📧 Dettagli email:", response.data);
      return true;
    } else {
      console.log("❌ Errore nell'invio dell'email:", response.status);
      return false;
    }
  } catch (error) {
    console.error("❌ Errore nell'invio dell'email:", error.message);
    return false;
  }
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [checkoutData, setCheckoutData] = useState({});
  const [cartOut, setCartOut] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    surname: "",
    email: "",
    password: "xxx",
    address: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
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

      // Update products quantity in the database
      for (let i = 0; i < cartOut.length; i++) {
        const prod_data = {
          title: cartOut[i].title,
          quantity: cartOut[i].quantity,
        };

        await fetch(`http://localhost:3001/yuno/update_quantity`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: cartOut[i].title,
            quantity: cartOut[i].quantity,
          }),
        });
      }

      // Controllo invio email
      const emailSent = await sendOrderConfirmationEmail(formData.email);
      if (!emailSent) {
        console.log("⚠️ Attenzione: problemi con l'invio dell'email");
        // Puoi decidere se continuare comunque o gestire diversamente
      }

      // Clear cart and checkout data
      localStorage.removeItem("cart");
      // Dispatchare l'evento di aggiornamento del carrello
      window.dispatchEvent(new Event("cartUpdate"));

      clearCheckoutData();

      // Redirect to success page
      navigate("/order-success");
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-center gap-6 px-4 py-14">
        <div className="bg-white p-4 rounded-xl shadow-xl shadow-black flex flex-col h-full">
          <Heading level={4}>Riepilogo Carrello:</Heading>
          <div className="mt-4 flex-grow">
            {cartOut.map((card, index) => (
              <div key={index}>
                <div className="flex mb-4">
                  <img
                    src={`${card.image}.jpg`}
                    alt={card.title}
                    className="w-30 h-30 object-contain"
                  />
                  <div className="flex-1 ml-4">
                    <Heading level={6}>{card.title}</Heading>
                    <p>
                      <strong>Quantità:</strong> {card.quantity}
                    </p>
                    <p>
                      <strong>Prezzo:</strong>{" "}
                      {card.discount > 0 || card.quantity > 1 ? (
                        <span className="text-black-600">{`€${Number(
                          (card.price -
                            (card.price / 100) * card.discount -
                            (card.price / 100) * card.bulkDiscount) *
                            card.quantity
                        ).toFixed(2)}`}</span>
                      ) : (
                        <span className="text-black-600">{`€${Number(
                          card.price * card.quantity
                        ).toFixed(2)}`}</span>
                      )}
                    </p>
                    {card.discount > 0 && (
                      <p>
                        <strong>Totale sconto:</strong> {card.discount}%
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-auto text-end">
            <Heading level={5} className="text-red-600 ml-2">
              Totale finale: €
              {checkoutData.discountedTotal
                ? Number(checkoutData.discountedTotal).toFixed(2)
                : "0.00"}
            </Heading>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded-xl flex-1 h-[500px] shadow-xl shadow-black"
        >
          <Heading level={4}>Dati Fatturazione:</Heading>
          {Object.entries({
            name: "Nome",
            surname: "Cognome",
            email: "Email",
            address: "Indirizzo",
            phone: "Telefono",
          }).map(([key, label]) => (
            <div key={key} className="my-4">
              <label className="block mb-2">{label}</label>
              <input
                value={formData[key]}
                maxLength={label == "Telefono" ? 13 : 500}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [key]: e.target.value,
                  }))
                }
                className="w-full my_input p-2 border-b focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          ))}
          <div className="mt-8 text-center">
            <Button
              type="submit"
              variant="primary"
              className="hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
              ) : (
                "Conferma Ordine"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
