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

      // Update products quantity in the database
      for (let i = 0; i < cartOut.length; i++) {
        const prod_data = {
          title: cartOut[i].title,
          quantity: cartOut[i].quantity,
        };

        console.log(cartOut[i].title);

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
        <div className="bg-white p-6 rounded-xl shadow-xl shadow-black">
          <Heading level={4}>Riepilogo Carrello:</Heading>
          <div className="mt-4">
            {cartOut.map((card, index) => (
              <div key={index}>
                <div className="flex mb-4">
                  <img
                    src={`${card.image}.jpg`}
                    alt={card.title}
                    className="w-30 h-30 object-contain"
                  />
                  <div className="flex-1 ml-4">
                    <h3 className="font-semibold">{card.title}</h3>
                    <p>Quantità: {card.quantity}</p>
                    <p>Prezzo: €{card.price}</p>
                    {card.discount > 0 && <p>Sconto: {card.discount}%</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl flex-1 h-[480px] shadow-xl shadow-black"
        >
          {Object.entries({
            name: "Nome",
            surname: "Cognome",
            email: "Email",
            address: "Indirizzo",
            phone: "Telefono",
          }).map(([key, label]) => (
            <div key={key} className="mb-4">
              <label className="block mb-2">{label}</label>
              <input
                value={formData[key]}
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
          <div className="mt-10">
            <Button
              type="submit"
              variant="primary"
              className="w-full hover:bg-blue-700"
            >
              Conferma Ordine
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
