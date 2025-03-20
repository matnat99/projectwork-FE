import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import Heading from "../components/ui/Heading";
import VerticalPCCard from "../components/ui/VerticalCard";
import HorizontalPCCard from "../components/ui/HorizontalCard";
import Catalogo from "./Catalogo";
import Hero from "../components/Hero";
import { Grid, List } from "lucide-react";

export default function HomePage() {
  const [viewType, setViewType] = useState("vertical"); // "horizontal" o "vertical"
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
        <Hero />
      </div>
      <div className="bg-[#181818]">
        <div className="container mx-auto">
          <div className="text-white p-12 md:flex justify-between items-center">
            <Heading level={2} className="text-center md:text-left">
              I Nostri Prodotti
            </Heading>
            <div className="hidden md:inline-flex bg-gray-700 rounded-lg p-1">
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
              <div
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4`}
              >
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
        <div className="text-white text-center p-12">
          <Heading level={2}>I nostri brand</Heading>
          <Catalogo />
        </div>
      </div>
    </>
  );
}
