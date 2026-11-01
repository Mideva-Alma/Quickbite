import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Utensils,
  ShoppingCart,
  ReceiptText,
  Gamepad2,
  Menu as MenuIcon,
  X,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import logo from "../assets/QuickBite-logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();

  const links = [
    { to: "/menu", label: "Menu", Icon: Utensils },
    { to: "/cart", label: "Cart", Icon: ShoppingCart },
    { to: "/order-status", label: "Order Status", Icon: ReceiptText },
    { to: "/games", label: "Games", Icon: Gamepad2 },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/menu" className="shrink-0">
          <img
            src={logo}
            alt="Quickbite"
            className="h-20 w-auto max-w-50 object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map(({ to, label, Icon }) => (
            <Link
              key={to}
              to={to}
              className={`relative flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold no-underline transition ${
                location.pathname === to
                  ? "bg-red-50 text-red-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-red-600"
              }`}
            >
              <Icon size={19} />
              <span>{label}</span>

              {label === "Cart" && cartCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 md:hidden"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={25} /> : <MenuIcon size={25} />}
        </button>
      </div>

      {isOpen && (
        <nav className="flex flex-col gap-1 border-t border-gray-200 bg-white p-3 md:hidden">
          {links.map(({ to, label, Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 font-semibold no-underline ${
                location.pathname === to
                  ? "bg-red-50 text-red-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon size={20} />
              <span>{label}</span>

              {label === "Cart" && cartCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export default Navbar;
