import Button from "./Button";
import Heading from "./Heading";
import { Link } from "react-router-dom";

export default function Card({ title, image, content, director, link }) {
  return (
    <div className="bg-white flex h-full rounded-xl shadow-md shadow-black">
      <div className="w-1/2">
        <img className="h-full object-cover" src={image} alt={title} />
      </div>
      <div className="p-2 w-1/2 space-y-2 flex flex-col">
        <Heading level={4}>{title}</Heading>
        <Heading level={6}>{director}</Heading>
        <p className="text-sm">{content}</p>
        <div className="mt-auto text-center">
          <Link to={link}>
            <Button size="sm">Scopri di più</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
