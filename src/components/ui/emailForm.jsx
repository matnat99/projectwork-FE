import React, { useState } from "react";
import axios from "axios";

const EmailForm = () => {
  const [emailData, setEmailData] = useState({
    to: "riccardoorlando08@gmail.com",
    subject: "Test Email",
    text: "Ciao!",
    html: "<b>Ciao!</b>",
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log per vedere i dati che vengono inviati
    console.log("Dati inviati: ", emailData);

    setLoading(true);
    setStatus({ type: "info", message: "Invio in corso..." });

    try {
      const response = await axios.post(
        "http://localhost:3001/api/send-email",
        emailData
      );

      console.log("Risposta dal server: ", response); // Log della risposta dal server

      if (response.data.success) {
        setStatus({
          type: "success",
          message: `Email inviata con successo! ID: ${response.data.messageId}`,
        });
      } else {
        setStatus({
          type: "error",
          message: `Errore nell'invio: ${response.data.error}`,
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: `Errore: ${error.message}`,
      });
      console.error("Errore durante l'invio dell'email:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Form Fields */}
        <button type="submit" disabled={loading}>
          {loading ? "Invio in corso..." : "Invia Email"}
        </button>
      </form>

      {status && <div>{status.message}</div>}
    </div>
  );
};

export default EmailForm;
