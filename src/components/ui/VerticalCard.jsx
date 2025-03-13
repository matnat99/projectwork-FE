import Button from "./Button";
import Heading from "./Heading";
import { Link } from "react-router-dom";

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
  return (
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
            <li>{category}</li>
        </ul>
        <p className="text-sm">{description}</p>
        <div className="mt-auto pt-4 flex flex-col items-center gap-2">
          <Heading level={5} className="text-blue-600">
            {price} €
          </Heading>
          <Link to={"/"} className="w-full">
            <Button className="w-full text-center" size="sm">
              Scopri di più
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
