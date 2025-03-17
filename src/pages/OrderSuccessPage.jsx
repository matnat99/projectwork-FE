import { Link } from "react-router-dom";
import Heading from "../components/ui/Heading";
import Button from "../components/ui/Button";

export default function OrderSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <div className="bg-white rounded-xl p-8 max-w-2xl mx-auto">
        <i className="fa-solid fa-circle-check text-green-500 text-6xl mb-4"></i>
        <Heading level={2} className="mb-4">
          Ordine Confermato!
        </Heading>
        <p className="text-gray-600 mb-8">
          Grazie per il tuo acquisto. Riceverai una email con i dettagli del tuo
          ordine.
        </p>
        <Link to="/">
          <Button variant="primary">Torna alla Home</Button>
        </Link>
      </div>
    </div>
  );
}
