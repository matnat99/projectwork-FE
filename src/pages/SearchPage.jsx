import { useState } from "react";
import axios from "../api/axios";
import Heading from "../components/ui/Heading";
import HorizontalPCCard from "../components/ui/Card";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.get(`/yuno/search?title=${searchTerm}`);
      setResults(response.data);
    } catch (error) {
      console.error("Errore nella ricerca:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Heading level={2} className="text-white mb-6">
        Ricerca Prodotti
      </Heading>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cerca prodotti..."
            className="flex-1 p-2 rounded bg-white"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Cerca
          </button>
        </div>
      </form>

      {isLoading ? (
        <p className="text-white text-center">Caricamento...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((product) => (
            <HorizontalPCCard key={product.id} {...product} />
          ))}
          {results.length === 0 && searchTerm && (
            <p className="text-white col-span-full text-center">
              Nessun risultato trovato
            </p>
          )}
        </div>
      )}
    </div>
  );
}
