import Heading from "./Heading";
import { Link } from "react-router-dom";
import Button from "./Button";

export default function HorizontalPCCard({
  title,
  image,
  content,
  specs,
  link,
}) {
  return (
    <div className="bg-white rounded-xl shadow-md shadow-black flex h-60">
      <div className="w-1/2">
        <img
          className="h-full object-cover rounded-l-xl"
          src={image}
          alt={title}
        />
      </div>
      <div className="p-3 w-1/2 flex flex-col justify-between">
        <div>
          <Heading level={5} className="mb-1">
            {title}
          </Heading>
          <p className="text-xs text-gray-600 mb-1">{specs}</p>
          <p className="text-xs line-clamp-2">{content}</p>
        </div>
        <div className="text-center mt-2">
          <Link to={link}>
            <Button className="text-center text-xs py-1 px-3" size="xs">
              Scopri di più
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
