import { useState } from "react";
import { useNavigate } from "react-router-dom";

function StaffLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("waiter");
  const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    if (!username || !password) {
      setError("Please enter your username and password.");
      return;
    }

    if (role === "waiter") {
      navigate("/waiter");
    } else {
      navigate("/manager");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-5 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
          Staff <span className="text-red-500">Login</span>
        </h1>

        <p className="mb-8 text-center text-gray-500">
          Access the QuickBite staff dashboard
        </p>

        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-center text-sm font-semibold text-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-2 block font-semibold text-gray-700">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter username"
              className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 outline-none transition focus:border-red-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-gray-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
              className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 outline-none transition focus:border-red-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-gray-700">
              Staff Role
            </label>

            <select
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 outline-none focus:border-red-500"
            >
              <option value="waiter">Waiter</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-red-500 px-5 py-3 font-bold text-white transition hover:bg-red-600"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}

export default StaffLogin;