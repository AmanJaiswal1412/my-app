"use client";

import Image from "next/image";
import { useState } from "react";

const categories = [
  "2025 Horoscope",
  "Pt. Punarvasu",
  "Career Reports",
  "Astrology Consultation",
  "Financial Horoscope",
  "Love Marriage Horoscope",
  "Unknown Birthtime",
  "Detailed Horoscope",
  "Others",
  "Child Astrology",
  "Pt.Ajai Bhambi",
  "Birthday Astrology Report",
  "Pankaj",
  "Member",
];

type Product = {
  name: string;
  price: number;
};

const productData: Record<string, Product[]> = {
  "2025 Horoscope": [
    { name: "2025 Horoscope Reading (In Hindi Language)", price: 3430 },
    { name: "2025 Horoscope Reading", price: 3430 },
    { name: "2025 Career Report", price: 3430 },
    { name: "2025 Love or Marriage Report", price: 3430 },
    { name: "2025 Finance Report", price: 3430 },
    { name: "2025 Horoscope Reading + 1 question", price: 4480 },
    { name: "2025 Horoscope Reading + webchat to discuss", price: 5180 },
    {
      name: "2025 Horoscope Reading + day to day forecast & planner",
      price: 6930,
    },
    { name: "2025 Career Report + 1 question", price: 4480 },
    { name: "2025 Career Report + webchat to discuss", price: 5180 },
    { name: "2025 Career Report + day to day career prediction", price: 5880 },
    { name: "2025 Love or Marriage Report + 1 question", price: 4480 },
    { name: "2025 Love or Marriage Report + webchat to discuss", price: 5180 },
    {
      name: "2025 Love or Marriage Report + day to day love prediction",
      price: 6930,
    },
    { name: "2025 Finance Report + 1 question", price: 4480 },
    {
      name: "2025 Finance Report + webchat to discuss",
      price: 5180,
    },
    {
      name: "2025 Finance Report + day to day finance prediction",
      price: 6930,
    },
    { name: "2025 Horoscope Reading- 2 Profiles", price: 6230 },
    { name: "2025 Horoscope Reading- 3 Profiles", price: 9240 },
    {
      name: "2025 Horoscope Reading- 4 Profiles",
      price: 11830,
    },
  ],
  "Pt. Punarvasu": [],
  "Career Reports": [],
  "Astrology Consultation": [],
  "Financial Horoscope": [],
  "Love Marriage Horoscope": [],
  "Unknown Birthtime": [],
  "Detailed Horoscope": [],
  Others: [],
  "Child Astrology": [],
  "Pt.Ajai Bhambi": [],
  "Birthday Astrology Report": [],
  Pankaj: [],
  Member: [],
};

export default function Home() {
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const toggleSection = (category: string) => {
    setOpenSections((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const handleCheckboxChange = (product: Product) => {
    setSelectedProducts((prev) => {
      const exists = prev.find((p) => p.name === product.name);
      if (exists) {
        return prev.filter((p) => p.name !== product.name);
      } else {
        return [...prev, product];
      }
    });
  };

  const subtotal = selectedProducts.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-4 sm:p-6 md:p-8">
      {/* Cart */}
      <div className="border border-yellow-400 bg-yellow-50 p-3 rounded-t-md text-sm flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <strong>Product Cart:</strong>
          <ul className="text-xs mt-2">
            {selectedProducts.map((item) => (
              <li key={item.name}>
                {item.name} - Rs. {item.price}
              </li>
            ))}
          </ul>
        </div>
        <span className="mt-2 sm:mt-0">
          Subtotal ({selectedProducts.length} items): Rs. {subtotal}
        </span>
        <div className="flex gap-2 items-center mt-2 sm:mt-0">
          <select className="border p-1 text-sm">
            <option>-- Choose Currency --</option>
          </select>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded">
            🛒 Continue
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        {/* Left: Collapsible Categories */}
        <div className="md:col-span-3 space-y-2">
          {categories.map((cat) => (
            <div key={cat}>
              <button
                onClick={() => toggleSection(cat)}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 text-left rounded transition"
              >
                {openSections.includes(cat) ? "▾" : "▸"} {cat}
              </button>
              {openSections.includes(cat) && (
                <div className="bg-white border border-gray-300 p-4 space-y-2">
                  {(productData[cat] || []).map((product, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border-b py-2 hover:bg-gray-50 px-2"
                    >
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="accent-blue-600"
                          checked={selectedProducts.some(
                            (p) => p.name === product.name
                          )}
                          onChange={() => handleCheckboxChange(product)}
                        />
                        {product.name}
                      </label>
                      <span className="font-semibold text-sm">
                        Rs. {product.price}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right: Static Category List */}
        <div className="bg-white border p-4 rounded shadow">
          <h3 className="font-semibold text-lg mb-2">Categories</h3>
          <ul className="space-y-1 text-sm">
            {categories.map((cat) => (
              <li key={cat} className="flex items-center gap-2">
                <span>⚙️</span>
                <span>{cat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
