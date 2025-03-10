import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-blue-500 text-white py-4 px-6 shadow-md shadow-black">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Yuno Build</h1>
        <nav>
          <ul className="flex gap-4">
            <li className="hover:text-gray-200 cursor-pointer">
              <NavLink to="#">Home</NavLink>
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
