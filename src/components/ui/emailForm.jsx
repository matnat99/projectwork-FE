import React, { useState } from "react";
import axios from "axios";


const EmailForm = () => {
  const [emailData, setEmailData] = useState({
    to: "riccardoorlando08@gmail.com",
    subject: "Send email using nodemailer and gmail",
    text: "Hello world?",
    html: "<b>Hello world?</b>",
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
    setLoading(true);
    setStatus({ type: "info", message: "Invio in corso..." });

    try {
      const response = await axios.post(
        "http://localhost:3001/api/send-email",
        emailData
      );

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
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-10">
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">
          Sistema Email
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Invia Email</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="to"
              className="block text-sm font-medium text-gray-700"
            >
              Destinatario
            </label>
            <input
              type="email"
              name="to"
              id="to"
              value={emailData.to}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700"
            >
              Oggetto
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              value={emailData.subject}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="text"
              className="block text-sm font-medium text-gray-700"
            >
              Testo
            </label>
            <textarea
              name="text"
              id="text"
              value={emailData.text}
              onChange={handleChange}
              required
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="html"
              className="block text-sm font-medium text-gray-700"
            >
              HTML (opzionale)
            </label>
            <textarea
              name="html"
              id="html"
              value={emailData.html}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                loading
                  ? "bg-indigo-300"
                  : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              }`}
            >
              {loading ? "Invio in corso..." : "Invia Email"}
            </button>
          </div>
        </form>

        {status && (
          <div
            className={`mt-6 px-4 py-3 rounded-md ${
              status.type === "success"
                ? "bg-green-50 text-green-800"
                : status.type === "error"
                ? "bg-red-50 text-red-800"
                : "bg-blue-50 text-blue-800"
            }`}
          >
            {status.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailForm;
