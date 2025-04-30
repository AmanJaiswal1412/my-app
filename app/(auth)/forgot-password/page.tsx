"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleForgotPassword = async () => {
    setLoading(true);
    setError(null);

    try {
      const response: any = await axios.post("/api/auth/forgot-password", {
        email,
      });

      if (response.data.success) {
        // If email sent successfully → redirect to reset-password page
        router.push("/reset-password");
      } else {
        setError("Failed to send reset link. Try again.");
      }
    } catch (error) {
      setError("Error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">Forgot Password</h1>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleForgotPassword}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </div>
    </div>
  );
}
