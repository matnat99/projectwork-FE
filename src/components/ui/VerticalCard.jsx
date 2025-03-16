import Button from "./Button";
import Heading from "./Heading";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function VerticalPCCard({
  category,
  cpu,
  description,
  discount,
  gpu,
  id,
  image,
  price,
  quantity,
  ram,
  title,
}) {
  const { idpc } = useParams();
  let TotalDiscount = price;

  if (discount > 0) {
    TotalDiscount = price - (price / 100) * discount;
  }

  return (
    <Link to={`/Yuno/${id}`}>
      <div className="bg-white rounded-xl shadow-md shadow-black max-w-xs h-full flex flex-col">
        <div className="w-full h-48">
          <img
            className="w-full h-full object-contain p-4"
            src={`${image}.jpg`}
            alt={title}
          />
        </div>
        <div className="p-4 space-y-3 flex flex-col flex-1">
          <Heading level={4}>{title}</Heading>
          <Heading level={6}>Specifiche:</Heading>
          <ul className="text-sm list-disc pl-5">
            <li>{gpu}</li>
            <li>{cpu}</li>
            <li>{ram}</li>
          </ul>
          <p className="text-sm line-clamp-3">{description}</p>
          <div className="mt-auto pt-4 flex flex-col items-center gap-2">
            <div>
              {discount > 0 && (
                <span className="text-red-500 line-through ml-2">{`€ ${Number(
                  price
                ).toFixed(2)}`}</span>
              )}
              <span className="text-blue-600">{`€ ${Number(
                TotalDiscount
              ).toFixed(2)}`}</span>
            </div>
            <div className="w-full">
              <Button className="w-full text-center" size="sm">
                Scopri di più
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
