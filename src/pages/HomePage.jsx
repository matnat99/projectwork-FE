import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import Heading from "../components/ui/Heading";
import VerticalPCCard from "../components/ui/VerticalCard";
import HorizontalPCCard from "../components/ui/Card";
import Catalogo from "./Catalogo";
import { Grid, List } from "lucide-react";

export default function HomePage() {
  const [viewType, setViewType] = useState("horizontal"); // "horizontal" o "vertical"
  const [Pc, SetPc] = useState([]);

  useEffect(() => {
    axios.get("/Yuno").then((response) => {
      SetPc(response.data);
    });
  }, []);

  return (
    <>
      <div>
        <img
          className="brightness-50 max-h-200 h-dvh w-full object-cover"
          src="../img/Immagine Hero Homepage.png"
          alt=""
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
          Welcome to Our Website!
        </div>
      </div>
      <div className="bg-[#181818]">
        <div className="container mx-auto">
          <div className="text-white p-12 flex justify-between items-center">
            <Heading level={2}>Ultime Aggiunte</Heading>
            <div className="bg-gray-700 rounded-lg p-1 inline-flex">
              <button
                onClick={() => setViewType("horizontal")}
                className={`p-2 rounded-md ${
                  viewType === "horizontal" ? "bg-gray-600 shadow-sm" : ""
                }`}
                aria-label="Visualizzazione orizzontale"
              >
                <List size={20} color="white" />
              </button>
              <button
                onClick={() => setViewType("vertical")}
                className={`p-2 rounded-md ${
                  viewType === "vertical" ? "bg-gray-600 shadow-sm" : ""
                }`}
                aria-label="Visualizzazione verticale"
              >
                <Grid size={20} color="white" />
              </button>
            </div>
          </div>

          {viewType === "horizontal" ? (
            // Visualizzazione orizzontale (come nel tuo codice originale)
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {Pc.map((card, index) => (
                <div
                  key={index}
                  className={index === 0 ? "hidden md:block" : ""}
                >
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
                {Pc.map((card, index) => (
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
        <Catalogo />
      </div>
    </>
  );
}
