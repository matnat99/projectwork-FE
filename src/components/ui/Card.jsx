import Heading from "./Heading";
import { Link } from "react-router-dom";
import Button from "./Button";

export default function HorizontalPCCard({
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
  let TotalDiscount = price;

  if (discount > 0) {
    TotalDiscount = price - (price / 100) * discount;
  }

  return (
    <Link to={`/Yuno/${id}`}>
      <div className="bg-white rounded-xl shadow-md shadow-black flex h-60">
        <div className="w-1/2">
          <img
            className="w-full h-full object-contain p-4"
            src={`${image}.jpg`}
            alt={title}
          />
        </div>
        <div className="p-3 w-1/2 flex flex-col justify-between">
          <div>
            <Heading level={5} className="mb-1">
              {title}
            </Heading>
            {/* <ul className="text-sm list-disc pl-5">
            <li>{gpu}</li>
            <li>{cpu}</li>
            <li>{ram}</li>
          </ul> */}
            <p className="text-xs line-clamp-4 md:line-clamp-5 xl:line-clamp-6">
              {description}
            </p>
          </div>
          <div className="text-center mt-2">
            <div className="mb-1">
              {discount > 0 && (
                <span className="text-red-500 line-through ml-2">{`€ ${Number(
                  price
                ).toFixed(2)}`}</span>
              )}
              <span className="text-blue-600">{`€ ${Number(
                TotalDiscount
              ).toFixed(2)}`}</span>
            </div>
            <div>
              <Button className="text-center text-xs py-1 px-3" size="xs">
                Scopri di più
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
