"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    birthDate: "",
    birthHour: "",
    birthMinute: "",
    birthCountry: "",
    birthState: "",
    birthCity: "",
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
      <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-2xl space-y-5">
        <h1 className="text-2xl font-bold text-center">Edit Profile</h1>

        {message && (
          <div className="text-center text-sm text-blue-600">{message}</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="gender"
            value={formData.gender}
            className="border rounded-lg p-3 w-full"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

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
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email"
            className="border rounded-lg p-3 w-full"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              placeholder="Date of Birth"
              className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time of Birth
            </label>
            <div className="grid grid-cols-2 gap-2">
              <select
                name="birthHour"
                value={formData.birthHour}
                className="border rounded-lg p-3 w-full"
              >
                <option value="">Hour</option>
                {[...Array(24)].map((_, i) => (
                  <option key={i} value={String(i).padStart(2, "0")}>
                    {String(i).padStart(2, "0")}
                  </option>
                ))}
              </select>
              <select
                name="birthMinute"
                value={formData.birthMinute}
                className="border rounded-lg p-3 w-full"
              >
                <option value="">Minute</option>
                {[...Array(60)].map((_, i) => (
                  <option key={i} value={String(i).padStart(2, "0")}>
                    {String(i).padStart(2, "0")}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Place of Birth
          </label>
          <div className="grid grid-cols-3 gap-2">
            <select
              name="birthCountry"
              value={formData.birthCountry}
              className="border rounded-lg p-3 w-full"
            >
              <option value="">Select Country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              {/* add more */}
            </select>
            <select
              name="birthState"
              value={formData.birthState}
              className="border rounded-lg p-3 w-full"
            >
              <option value="">Select State</option>
              <option value="Delhi">Delhi</option>
              <option value="California">California</option>
              {/* add more */}
            </select>
            <select
              name="birthCity"
              value={formData.birthCity}
              className="border rounded-lg p-3 w-full"
            >
              <option value="">Select City</option>
              <option value="New Delhi">New Delhi</option>
              <option value="San Francisco">San Francisco</option>
              {/* add more */}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
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
