import axios from "../api/axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Heading from "../components/ui/Heading";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  let TotalDiscount = product.price;

  if (product.discount > 0) {
    TotalDiscount = product.price - (product.price / 100) * product.discount;
  }

  const fetchProduct = () => {
    axios
      .get(`/yuno/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          navigate("/404");
        }
      });
  };

  useEffect(fetchProduct, [id, navigate]);

  return (
    <div className="max-w-6xl mx-auto px-4 my-12">
      <Link to="/" className="text-white">
        <Heading level={6}>
          <i className="fa-solid fa-arrow-left-long"></i> Indietro
        </Heading>
      </Link>
      <div className="grid grid-cols-12 gap-2 mt-5 p-4 bg-white rounded-xl shadow-md shadow-black">
        <div className="col-span-12 md:col-span-4">
          <img className="w-full" src={product.image} alt={product.title} />
        </div>
        <div className="col-span-12 md:col-span-8 p-4 space-y-2">
          <Heading level={3}>{product.title}</Heading>
          <Heading level={5}>
            <strong>Categoria: </strong> {product.category}
          </Heading>
          <Heading level={5}>
            <strong>Ram: </strong> {product.ram}
          </Heading>
          <Heading level={5}>
            <strong>Cpu: </strong> {product.cpu}
          </Heading>
          <Heading level={5}>
            <strong>Gpu: </strong> {product.gpu}
          </Heading>
          <p className="text-lg">
            <strong>Descrizione: </strong>
            {product.description}
          </p>
          <Heading level={5}>
            <strong>Quantità: </strong> {product.quantity}
          </Heading>
          <Heading level={5}>
            <div>
              Prezzo:{" "}
              <span className="text-blue-600">{`€ ${TotalDiscount}`}</span>
              {product.discount > 0 && (
                <span className="text-red-500 line-through ml-2">{`€ ${product.price}`}</span>
              )}
            </div>
          </Heading>
        </div>
      </div>
    </div>
  );
}
