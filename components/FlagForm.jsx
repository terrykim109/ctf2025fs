"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function FlagForm({ index, solved, onSubmit }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(index, value);
  };

  const colors = [
    "bg-gradient-to-br from-pink-400 to-purple-500 border-pink-300",
    "bg-gradient-to-br from-yellow-300 to-orange-400 border-yellow-300",
    "bg-gradient-to-br from-green-400 to-blue-500 border-green-300", 
    "bg-gradient-to-br from-red-400 to-pink-500 border-red-300",
    "bg-gradient-to-br from-indigo-400 to-purple-500 border-indigo-300"
  ];

  const emojis = ["🚩", "🎯", "🏴", "📍", "🚀"];

  return (
    <motion.div
      className={`p-4 rounded-2xl ${colors[index]} border-4 shadow-2xl min-w-[200px] ${
        solved ? 'saturate-50' : ''
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="block text-white font-bold text-lg text-center">
          {emojis[index]} Flag {index + 1}
          {solved && <span className="ml-2 text-green-300">✅</span>}
        </label>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={`Enter flag ${index + 1}`}
            disabled={solved}
            className={`flex-1 px-3 py-2 rounded-lg border-2 text-sm ${
              solved ? "bg-gray-200 border-gray-400 text-gray-600" : "bg-white border-gray-300"
            }`}
          />
          
          {!solved && (
            <motion.button
              type="submit"
              className="px-4 py-2 bg-white text-gray-800 rounded-lg font-bold text-sm hover:bg-gray-100 border-2 border-yellow-400"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              GO!
            </motion.button>
          )}
        </div>

        {solved && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center text-white font-bold text-sm mt-2 bg-green-500/50 py-1 rounded-lg"
          >
            Captured! 🎉
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}