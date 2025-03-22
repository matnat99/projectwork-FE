import { Link } from "react-router-dom";
import { useEffect } from "react";
import Heading from "../components/ui/Heading";
import Button from "../components/ui/Button";
import { getInfoSales, infoSales, clearCheckoutData } from "../utils/storage";

export default function OrderSuccessPage() {
  const data = getInfoSales();

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl p-8 max-w-2xl mx-auto">
          <Heading level={3}>Ricevuta:</Heading>
          <div className="mt-2">
            <p>
              <strong>Email:</strong> {JSON.stringify(data.user_email)}
            </p>
            <p>
              <strong>Indirizzo:</strong> {JSON.stringify(data.user_address)}
            </p>
            <p>
              <strong>Data acquisto:</strong> {JSON.stringify(data.data)}
            </p>
            <p>
              <strong>Stato ordine:</strong> {JSON.stringify(data.state)}
            </p>
            {data.discounted && (
              <p>
                <strong>Prezzo Scontato:</strong>{" "}
                {JSON.stringify(data.discounted)} €
              </p>
            )}
            <p>
              <strong>Totale:</strong> €{JSON.stringify(data.total)}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 text-center">
        <div className="bg-white rounded-xl p-8 max-w-2xl mx-auto">
          <i className="fa-solid fa-circle-check text-green-500 text-6xl mb-4"></i>
          <Heading level={2} className="mb-4">
            Ordine Confermato!
          </Heading>
          <p className="text-gray-600 mb-8">
            Grazie per il tuo acquisto. Riceverai una email con i dettagli del
            tuo ordine.
          </p>
          <Link to="/">
            <Button variant="primary" className="hover:bg-blue-700 ">
              Torna alla Home
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
