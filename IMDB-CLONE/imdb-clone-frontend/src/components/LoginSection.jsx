import { useState } from "react";
import { Link } from "react-router-dom";

const LoginSection = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin({ username, password });
  };

  return (
    <div className="flex justify-center items-center h-[100vh] bg-gray-300 dark:bg-gray-800">
      <div className="bg-gray-900 dark:bg-gray-900 text-gray-100 dark:text-gray-300 p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h2 className="text-3xl font-bold text-blue-400 mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-200">
              Username:
            </label>
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              required
              className="w-full p-3 rounded-lg bg-gray-800 dark:bg-gray-700 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-200">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              required
              className="w-full p-3 rounded-lg bg-gray-800 dark:bg-gray-700 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginSection;