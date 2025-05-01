"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    location: "",
    password: "",
    profilePicture: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture" && files) {
      setFormData({ ...formData, profilePicture: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) form.append(key, value);
      });

      const res = await axios.put("/api/auth/user/profile", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Profile updated successfully!");
      router.push("/");
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-xl space-y-5">
        <h1 className="text-2xl font-bold text-center">Edit Profile</h1>

        {message && (
          <div className="text-center text-sm text-blue-600">{message}</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="New Password"
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="file"
            name="profilePicture"
            onChange={handleChange}
            accept="image/*"
            className="w-full"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
