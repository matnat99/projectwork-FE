import axios from "../api/axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Grid, List } from "lucide-react";
import VerticalPCCard from "../components/ui/VerticalCard";
import HorizontalPCCard from "../components/ui/HorizontalCard";
import Heading from "../components/ui/Heading";

export default function BrandPage() {
  const { tag_name } = useParams();
  const [products, setProducts] = useState([]);
  const [viewType, setViewType] = useState("horizontal"); // "horizontal" o "vertical"

  useEffect(() => {
    const fetchProducts = () => {
      axios
        .get(`/yuno/brand/${tag_name.toUpperCase()}`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((err) => console.error("Errore nel recupero dei prodotti", err));
    };

    fetchProducts();
  }, [tag_name]);

  return (
    <div className="container mx-auto p-10">
      <div className="container mx-auto">
        <div className="text-white p-12 flex justify-between items-center">
          <Heading level={2}>Prodotti {tag_name}</Heading>
          <div className="bg-gray-700 rounded-lg p-1 inline-flex">
            <button
              onClick={() => setViewType("horizontal")}
              className={`p-2 rounded-md cursor-pointer ${
                viewType === "horizontal" ? "bg-gray-600 shadow-sm" : ""
              }`}
              aria-label="Visualizzazione orizzontale"
            >
              <List size={20} color="white" />
            </button>
            <button
              onClick={() => setViewType("vertical")}
              className={`p-2 rounded-md cursor-pointer ${
                viewType === "vertical" ? "bg-gray-600 shadow-sm" : ""
              }`}
              aria-label="Visualizzazione verticale"
            >
              <Grid size={20} color="white" />
            </button>
          </div>
        </div>

        {viewType === "horizontal" ? (
          // Visualizzazione orizzontale
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {products.map((card, index) => (
              <div key={index} className={index === 0 ? "hidden md:block" : ""}>
                <HorizontalPCCard
                  title={card.title}
                  image={card.image}
                  description={card.description}
                  category={card.category}
                  price={card.price}
                  quantity={card.quantity}
                  cpu={card.cpu}
                  gpu={card.gpu}
                  ram={card.ram}
                  discount={card.discount}
                  id={card.id}
                />
              </div>
            ))}
          </div>
        ) : (
          // Visualizzazione verticale
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
              {products.map((card, index) => (
                <div
                  key={index}
                  className={index === 0 ? "hidden md:block" : ""}
                >
                  <VerticalPCCard
                    title={card.title}
                    image={card.image}
                    description={card.description}
                    category={card.category}
                    price={card.price}
                    quantity={card.quantity}
                    cpu={card.cpu}
                    gpu={card.gpu}
                    ram={card.ram}
                    discount={card.discount}
                    id={card.id}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
