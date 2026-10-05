import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-lg bg-red-500 shadow-md md:hidden"
        aria-label="Open menu"
      >
        <span className="block h-0.5 w-5 bg-white"></span>
        <span className="block h-0.5 w-5 bg-white"></span>
        <span className="block h-0.5 w-5 bg-white"></span>
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 shrink-0 flex-col bg-red-500 p-5 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Logo */}
        <div className="mb-8 flex h-32 items-center justify-center rounded-xl bg-white">
          {/* Add your logo image here */}
          <span className="text-2xl font-bold text-red-500">
            QUICKBITE
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-4">
          <Link
            to="/menu"
            onClick={closeMenu}
            className="rounded-xl bg-white px-5 py-4 text-center font-bold text-red-500 no-underline transition hover:bg-red-50"
          >
            Menu
          </Link>

          <Link
            to="/cart"
            onClick={closeMenu}
            className="rounded-xl bg-white px-5 py-4 text-center font-bold text-red-500 no-underline transition hover:bg-red-50"
          >
            Cart
          </Link>

          <Link
            to="/order-status"
            onClick={closeMenu}
            className="rounded-xl bg-white px-5 py-4 text-center font-bold text-red-500 no-underline transition hover:bg-red-50"
          >
            Order Status
          </Link>

          <Link
            to="/games"
            onClick={closeMenu}
            className="rounded-xl bg-white px-5 py-4 text-center font-bold text-red-500 no-underline transition hover:bg-red-50"
          >
            Games
          </Link>
        </nav>

        {/* Staff Login */}
        <div className="mt-auto">
          <Link
            to="/staff-login"
            onClick={closeMenu}
            className="block rounded-xl bg-white px-5 py-4 text-center font-bold text-red-500 no-underline transition hover:bg-red-50"
          >
            Staff Login
          </Link>
        </div>
      </aside>
    </>
  );
}

export default Navbar;
