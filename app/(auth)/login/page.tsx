"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const response: any = await axios.post("/api/auth/login", formData);

      // Check if the response contains a token
      if (response.data.token) {
        // Store the JWT token in sessionStorage (better than localStorage for temporary sessions)
        sessionStorage.setItem("token", response.data.token);

        // Optionally, redirect the user to a protected page (e.g., dashboard)
        router.push("/profile"); // Adjust the redirection as needed
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      setError("Invalid credentials or server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleThirdPartyLogin = async (provider: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await signIn(provider, {
        redirect: false,
      });

      if (result?.error) {
        setError("Third-party login failed. Please try again.");
      } else {
        // Redirect or handle post-login (you can get the JWT token in the `result` object)
        router.push("/profile"); // Adjust the redirection as needed
      }
    } catch (error) {
      setError("Error occurred during third-party login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        {/* Error message */}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {/* Login form */}
        <div className="space-y-4">
          <input
            type="text"
            name="emailOrPhone"
            placeholder="Email or Phone"
            value={formData.emailOrPhone}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Forgot password link */}
          <div className="text-right">
            <a
              href="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        {/* Third-Party Login Buttons */}
        <div className="flex space-x-4 mt-4">
          <button
            onClick={() => handleThirdPartyLogin("google")}
            className="flex items-center justify-center w-full  bg-white border py-3 rounded-lg hover:bg-gray-100 transition"
          >
            <img
              src="/google-icon.png"
              alt="Login with Google"
              className="h-6 w-6"
            />
          </button>
          <button
            onClick={() => handleThirdPartyLogin("facebook")}
            className="flex items-center justify-center w-full  bg-white border py-3 rounded-lg hover:bg-gray-100 transition"
          >
            <img
              src="/facebook-icon.png"
              alt="Login with Facebook"
              className="h-6 w-6"
            />
          </button>
        </div>

        {/* Link to register page */}
        <div className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:text-blue-700">
            Register here
          </a>
        </div>
      </div>
    </div>
  );
}
