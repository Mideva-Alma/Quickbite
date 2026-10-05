import { Link } from "react-router-dom";

function Navbar() {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-red-500 p-5">
      
      {/* Logo Section */}
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
          className="rounded-xl bg-white px-5 py-4 text-center font-bold text-red-500 no-underline transition hover:bg-red-50">
          Menu
        </Link>

        <Link
          to="/cart"
          className="rounded-xl bg-white px-5 py-4 text-center font-bold text-red-500 no-underline transition hover:bg-red-50"
        >
          Cart
        </Link>

        <Link
            to="/order-status"
            className="rounded-xl bg-white px-5 py-4 text-center font-bold text-red-500 no-underline transition hover:bg-red-50"
            >
            Order Status
        </Link>

        {/* Games Section */}
        <Link
            to="/games"
            className="rounded-xl bg-white px-5 py-4 text-center font-bold text-red-500 no-underline transition hover:bg-red-50"
            >
            Games
        </Link>
      </nav>

      {/* Staff Login */}
      <div className="mt-auto">
        <Link
          to="/staff-login"
          className="block rounded-xl bg-white px-5 py-4 text-center font-bold text-red-500 no-underline transition hover:bg-red-50"
        >
          Staff Login
        </Link>
      </div>

    </aside>
  );
}

export default Navbar;