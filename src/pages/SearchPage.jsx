import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "../api/axios";
import Heading from "../components/ui/Heading";
import HorizontalPCCard from "../components/ui/Card";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchTerm = searchParams.get("q");
    if (searchTerm) {
      setIsLoading(true);
      axios
        .get(`/yuno/search?title=${searchTerm}`)
        .then((response) => {
          setResults(response.data);
        })
        .catch((error) => {
          console.error("Errore nella ricerca:", error);
          setResults([]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Heading level={2} className="text-white mb-6">
        Risultati della ricerca
      </Heading>

      {isLoading ? (
        <p className="text-white text-center">Caricamento...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((product) => (
            <HorizontalPCCard key={product.id} {...product} />
          ))}
          {results.length === 0 && searchParams.get("q") && (
            <p className="text-white col-span-full text-center">
              Nessun risultato trovato
            </p>
          )}
        </div>
      )}
    </div>
  );
}
