import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../components/ui/Heading";
import Button from "../components/ui/Button";
import { getCheckoutData, clearCheckoutData } from "../utils/storage";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [checkoutData, setCheckoutData] = useState({});
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    surname: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    const data = getCheckoutData();
    if (!data) {
      navigate("/cart");
      return;
    }
    setCheckoutData(data);
  }, [navigate]);

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

      // Create sale
      const saleData = {
        user_id: uniqueId,
        user_email: formData.email,
        user_address: formData.address,
        data: new Date().toISOString(),
        state: "confermato",
        discounted: Number(checkoutData.discountedTotal),
        total: Number(checkoutData.total),
      };

      console.log(saleData);

      await fetch("http://localhost:3001/sale/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(saleData),
      });

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
    <div className="container mx-auto px-4 py-8">
      <Heading level={2} className="text-white mb-6">
        Dati per l'acquisto
      </Heading>
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
              className="w-full p-2 border rounded"
              required
            />
          </div>
        ))}
        <Button type="submit" variant="primary" className="w-full">
          Conferma Ordine
        </Button>
      </form>
    </div>
  );
}
