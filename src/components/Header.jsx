import { NavLink, Link, useNavigate } from "react-router-dom";
import Heading from "./ui/Heading";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlistLeng, setWishlistLeng] = useState([]);
  const [cartLeng, setCartLeng] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchTerm}`);
  };

  useEffect(() => {
    // Carica inizialmente il numero di prodotti
    const Witems = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlistLeng(Witems.length);
    const Citems = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartLeng(Citems.length);

    // Listener per l'evento di aggiornamento wishlist
    const handleWishlistUpdate = () => {
      const updatedItems = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlistLeng(updatedItems.length);
    };

    // Listener per l'evento di aggiornamento carrello
    const handleCartUpdate = () => {
      const updatedItems = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartLeng(updatedItems.length);
    };

    // Aggiungi il listener agli eventi
    window.addEventListener("wishlistUpdate", handleWishlistUpdate);
    window.addEventListener("cartUpdate", handleCartUpdate);

    // Cleanup del listener quando il componente viene smontato
    return () => {
      window.removeEventListener("wishlistUpdate", handleWishlistUpdate);
      window.removeEventListener("cartUpdate", handleCartUpdate);
    };
  }, []);

  console.log(wishlistLeng, cartLeng);

  return (
    <header className="bg-blue-500 text-white py-4 px-6 shadow-md shadow-black relative">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <Heading level={1}>Yuno Build</Heading>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 mx-8 hidden sm:block">
          <div className="flex max-w-md mx-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cerca prodotti..."
              className="w-full bg-white p-2 rounded-l text-black"
            />
            <button
              type="submit"
              className="bg-blue-600 px-4 rounded-r hover:bg-blue-700"
            >
              <i className="fa-solid fa-search"></i>
            </button>
          </div>
        </form>

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
              <NavLink to="/wishlist" className="relative">
                <i className="fa-regular fa-heart" />
                <div className="text-white">{wishlistLeng}</div>
                <div className="absolute top-0 right-0 w-12 h-12 rounded-full bg-red-500"></div>

              </NavLink>
            </li>
            <li className="hover:text-gray-200 cursor-pointer flex">
              <NavLink to="/cart">
                <i className="fa-solid fa-cart-shopping" />
                <div className="text-white">{cartLeng}</div>
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
            <li className="w-full px-4 bg-white">
              <form onSubmit={handleSearch} className="flex">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cerca prodotti..."
                  className="w-full p-2 rounded-l text-black "
                />
                <button
                  type="submit"
                  className="bg-blue-600 px-4 rounded-r hover:bg-blue-700"
                >
                  <i className="fa-solid fa-search"></i>
                </button>
              </form>
            </li>
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
