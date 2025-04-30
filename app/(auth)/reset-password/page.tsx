// /app/reset-password/page.tsx
"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
  });

  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResetPassword = async () => {
    try {
      const response: any = await axios.post(
        "/api/auth/reset-password",
        formData
      );

      if (response.data.success) {
        setMessage("Password updated successfully!");
        setTimeout(() => {
          router.push("/login"); // Redirect to login after 2 seconds
        }, 2000);
      } else {
        setMessage("Failed to reset password.");
      }
    } catch (error) {
      setMessage("Error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">Reset Password</h1>

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          name="newPassword"
          placeholder="Enter new password"
          value={formData.newPassword}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleResetPassword}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
        >
          Reset Password
        </button>

        {message && (
          <div className="text-center text-sm text-gray-600">{message}</div>
        )}
      </div>
    </div>
  );
}
