import { NavLink, Link } from "react-router-dom";
import Heading from "./ui/Heading";

export default function Header() {
  return (
    <header className="bg-blue-500 text-white py-4 px-6 shadow-md shadow-black">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <Heading level={1}>Yuno Build</Heading>
        </Link>
        <nav>
          <ul className="flex gap-4">
            <li className="hover:text-gray-200 cursor-pointer">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="hover:text-gray-200 cursor-pointer">
              <NavLink to="#">Catalogo</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
