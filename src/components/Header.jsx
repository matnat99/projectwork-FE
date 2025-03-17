import { NavLink, Link } from "react-router-dom";
import Heading from "./ui/Heading";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-blue-500 text-white py-4 px-6 shadow-md shadow-black relative">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <Heading level={1}>Yuno Build</Heading>
        </Link>
        {/* Menu Hamburger (visibile solo su mobile) */}
        <button
          className="sm:hidden z-[60] fixed right-6"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i
            className={`fa-solid ${
              isMenuOpen ? "fa-xmark" : "fa-bars"
            } text-2xl`}
          ></i>
        </button>

        {/* Overlay quando il menu è aperto */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 backdrop-blur-sm z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Menu Desktop */}
        <nav className="hidden sm:block">
          <ul className="flex gap-4">
            <li className="hover:text-gray-200 cursor-pointer">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="hover:text-gray-200 cursor-pointer">
              <NavLink to="/catalogo">Catalogo</NavLink>
            </li>
            <li className="hover:text-gray-200 cursor-pointer">
              <NavLink to="/wishlist">
                <i className="fa-regular fa-heart" />
              </NavLink>
            </li>
            <li className="hover:text-gray-200 cursor-pointer">
              <NavLink to="/cart">
                <i className="fa-solid fa-cart-shopping" />
              </NavLink>
            </li>
            <li className="hover:text-gray-200 cursor-pointer">
              <NavLink to="/search">
                <i className="fa-solid fa-search" />
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Menu Mobile */}
        <nav
          className={`md:hidden fixed top-0 right-0 w-1/3 bg-blue-500 h-screen z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ul className="flex flex-col items-center justify-center gap-8 h-full text-lg">
            <li className="hover:text-gray-200 cursor-pointer transform hover:scale-110 transition-transform">
              <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </NavLink>
            </li>
            <li className="hover:text-gray-200 cursor-pointer transform hover:scale-110 transition-transform">
              <NavLink to="/catalogo" onClick={() => setIsMenuOpen(false)}>
                Catalogo
              </NavLink>
            </li>
            <li className="hover:text-gray-200 cursor-pointer transform hover:scale-110 transition-transform">
              <NavLink to="/wishlist" onClick={() => setIsMenuOpen(false)}>
                <i className="fa-regular fa-heart" />
              </NavLink>
            </li>
            <li className="hover:text-gray-200 cursor-pointer transform hover:scale-110 transition-transform">
              <NavLink to="/cart" onClick={() => setIsMenuOpen(false)}>
                <i className="fa-solid fa-cart-shopping" />
              </NavLink>
            </li>
            <li className="hover:text-gray-200 cursor-pointer transform hover:scale-110 transition-transform">
              <NavLink to="/search" onClick={() => setIsMenuOpen(false)}>
                <i className="fa-solid fa-search" />
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
