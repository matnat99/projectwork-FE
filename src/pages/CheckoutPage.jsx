import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../components/ui/Heading";
import Button from "../components/ui/Button";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [checkoutData, setCheckoutData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    const data = sessionStorage.getItem("checkoutData");
    if (!data) {
      navigate("/cart");
      return;
    }
    setCheckoutData(JSON.parse(data));
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create user
      const userResponse = await fetch("http://localhost:3001/user/new_user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const userData = await userResponse.json();

      // Crea lo scontrino SALES
      const saleData = {
        user_id: userData.id,
        user_email: formData.email,
        user_address: formData.address,
        data: new Date().toISOString(),
        state: "confermato",
        discounted: checkoutData.discountedTotal,
        total: checkoutData.total,
        items: checkoutData.items,
      };

      await fetch("http://localhost:3001/sales/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(saleData),
      });

      // pulisci carrello e checkoutData
      localStorage.removeItem("cart");
      sessionStorage.removeItem("checkoutData");

      // Redirect alla pagina di successo
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
