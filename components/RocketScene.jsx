"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FlagForm from "./FlagForm";

const correctFlags = [
  "1",
  "2",
  "3",
  "4",
  "5"
];

const formPositions = [
  { top: "-180px", left: "-200px" },
  { top: "-220px", left: "180px" },
  { top: "60px", left: "-220px" },
  { top: "120px", left: "200px" },
  { top: "-40px", left: "0px" },
];

// Rocket Component
const Rocket = ({ width = 100, height = 200 }) => {
  const primaryColor = "#0055A4";
  const accentColor = "#00A651";
  const windowColor = "#B3E0FF";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 200"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      <defs>
        <linearGradient id="rocketBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} />
          <stop offset="100%" stopColor={accentColor} />
        </linearGradient>
      </defs>

      <rect x="30" y="40" width="40" height="100" fill="url(#rocketBody)" rx="20" />
      <path d="M50 20 L70 40 L30 40 Z" fill={primaryColor} />
      <circle cx="50" cy="80" r="12" fill={windowColor} />
      <circle cx="50" cy="80" r="6" fill="#E6F7FF" />
      <circle cx="35" cy="60" r="4" fill={windowColor} />
      <circle cx="65" cy="60" r="4" fill={windowColor} />
      <circle cx="35" cy="100" r="4" fill={windowColor} />
      <circle cx="65" cy="100" r="4" fill={windowColor} />
      <path d="M30 140 L15 170 L30 150 Z" fill="#003366" />
      <path d="M70 140 L85 170 L70 150 Z" fill="#003366" />
      <rect x="30" y="120" width="40" height="3" fill="#FFD700" />
    </svg>
  );
};

// Gundam Component
const Gundam = ({ width = 120, height = 200 }) => {
  const primaryColor = "#0055A4";
  const secondaryColor = "#00A651";
  const armorColor = "#1a365d";
  const accentColor = "#e53e3e";
  const metalColor = "#a0aec0";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 200"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      <defs>
        <linearGradient id="gundamBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} />
          <stop offset="100%" stopColor={secondaryColor} />
        </linearGradient>
        <linearGradient id="gundamArmor" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={armorColor} />
          <stop offset="100%" stopColor="#2d3748" />
        </linearGradient>
        <linearGradient id="metal" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#718096" />
          <stop offset="100%" stopColor="#a0aec0" />
        </linearGradient>
      </defs>

      {/* Main body */}
      <rect x="40" y="60" width="40" height="60" fill="url(#gundamBody)" rx="5" />
      
      {/* Chest armor */}
      <rect x="35" y="50" width="50" height="25" fill="url(#gundamArmor)" rx="8" />
      
      {/* F-Men Text on Chest */}
      <text 
        x="60" 
        y="65" 
        textAnchor="middle" 
        fill="white" 
        fontSize="8" 
        fontFamily="Arial, sans-serif" 
        fontWeight="bold"
        style={{ textShadow: '0 0 3px #000' }}
      >
        F-MEN
      </text>
      
      {/* Head */}
      <path d="M50 30 L70 30 L75 45 L65 50 L55 50 L45 45 Z" fill="url(#gundamArmor)" />
      <rect x="55" y="35" width="10" height="5" fill={accentColor} rx="2" />
      
      {/* V-fin antenna */}
      <path d="M58 25 L62 25 L63 28 L57 28 Z" fill={accentColor} />
      
      {/* Shoulder armor */}
      <rect x="25" y="55" width="15" height="25" fill="url(#gundamArmor)" rx="5" />
      <rect x="80" y="55" width="15" height="25" fill="url(#gundamArmor)" rx="5" />
      
      {/* Arms */}
      <rect x="20" y="80" width="15" height="35" fill="url(#gundamBody)" rx="5" />
      <rect x="85" y="80" width="15" height="35" fill="url(#gundamBody)" rx="5" />
      
      {/* Legs */}
      <path d="M45 130 L35 160 L45 170 L50 160 Z" fill="url(#gundamBody)" />
      <path d="M75 130 L85 160 L75 170 L70 160 Z" fill="url(#gundamBody)" />
      
      {/* Feet */}
      <rect x="30" y="170" width="20" height="10" fill="url(#gundamArmor)" rx="3" />
      <rect x="70" y="170" width="20" height="10" fill="url(#gundamArmor)" rx="3" />
      
      {/* Eye */}
      <rect x="58" y="37" width="4" height="2" fill="#00FF00" rx="1" />
    </svg>
  );
};

export default function RocketScene() {
  const [flags, setFlags] = useState([false, false, false, false, false]);
  const [landed, setLanded] = useState(false);
  const [showRocket, setShowRocket] = useState(false);
  const [showLand, setShowLand] = useState(false);
  const [transforming, setTransforming] = useState(false);
  const [transformed, setTransformed] = useState(false);
  const [takeoff, setTakeoff] = useState(false);
  const [showForms, setShowForms] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRocket(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (index, value) => {
    if (value === correctFlags[index]) {
      const newFlags = [...flags];
      newFlags[index] = true;
      setFlags(newFlags);
    } else {
      alert("❌ Wrong flag");
    }
  };

  useEffect(() => {
    if (flags.every(Boolean) && !transforming && !transformed) {
      setTransforming(true);
      setTimeout(() => {
        setTransformed(true);
        setTransforming(false);
      }, 2000);
    }
  }, [flags, transforming, transformed]);

  useEffect(() => {
    if (transformed) {
      const launchTimer = setTimeout(() => {
        setTakeoff(true);
      }, 3000);
      return () => clearTimeout(launchTimer);
    }
  }, [transformed]);

  useEffect(() => {
    if (landed) {
      const formsTimer = setTimeout(() => {
        setShowForms(true);
      }, 1000);
      return () => clearTimeout(formsTimer);
    }
  }, [landed]);

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      {/* Description Banner */}
      {showForms && !transformed && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5, type: "spring", stiffness: 100 }}
          className="absolute z-40 bg-gradient-to-br from-cyan-600/95 via-blue-600/95 to-purple-600/95 backdrop-blur-md border-2 border-cyan-400 shadow-2xl rounded-xl"
          style={{
            top: `calc(100vh - 250px + ${formPositions[2].top})`,
            left: "50%",
            transform: "translateX(-50%)",
            width: "90%",
            maxWidth: "550px"
          }}
        >
          <div className="px-5 py-4">
            <h2 className="text-xl font-bold text-white mb-2 text-center flex items-center justify-center gap-2">
              🚀 Welcome to FundServ CTF!
            </h2>
            <div className="text-cyan-50 text-xs leading-relaxed space-y-1.5">
              <p>
                <span className="font-semibold text-yellow-300">Step 1:</span> Visit{" "}
                <a 
                  href="https://fundserv.ctfd.io/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-bold text-white underline decoration-2 decoration-cyan-300 hover:decoration-yellow-300 hover:text-yellow-200 transition-all duration-200"
                >
                  fundserv.ctfd.io
                </a>{" "}
                and click <span className="font-semibold text-white bg-cyan-700/60 px-1.5 py-0.5 rounded">Register</span> (top right).
              </p>
              <p>
                <span className="font-semibold text-yellow-300">Step 2:</span> Create your account with a username, email, and password.
              </p>
              <p>
                <span className="font-semibold text-yellow-300">Step 3:</span> Verify your account via the email link sent to you.
              </p>
              <p>
                <span className="font-semibold text-yellow-300">Step 4:</span> Solve CTF challenges and climb the{" "}
                <span className="font-semibold text-white bg-purple-700/60 px-1.5 py-0.5 rounded">🏆 Leaderboard</span>!
              </p>
              <div className="mt-3 pt-2 border-t border-cyan-400/50">
                <p className="text-center font-semibold text-yellow-200 text-xs">
                  🎯 Side Mission: Collect all 5 CTF coding flags below to transform your rocket into a powerful robot!
                </p>
                <p className="text-center text-cyan-100 text-[10px] mt-1">
                  Complete the mission and launch your robot into the future to save the world! 🌍✨
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      {/* Moon surface */}
      {showLand && !takeoff && (
        <motion.div 
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-0 w-[140%] h-48 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-t-[100%] z-10 -left-[20%] origin-bottom"
        >
          <div className="absolute w-20 h-20 bg-gray-800 rounded-full top-8 left-[25%] opacity-60"></div>
          <div className="absolute w-12 h-12 bg-gray-800 rounded-full top-12 left-[65%] opacity-60"></div>
          <div className="absolute w-16 h-16 bg-gray-800 rounded-full top-4 left-[45%] opacity-60"></div>
        </motion.div>
      )}

      {/* Vehicle Container */}
      <motion.div
        initial={{ y: "-50vh", x: "50%" }}
        animate={{ y: takeoff ? "-100vh" : "calc(100vh - 250px)" }}
        transition={{ duration: takeoff ? 2 : 4, ease: takeoff ? "easeIn" : "easeOut" }}
        className="absolute top-0 left-1/2 z-20"
        style={{ transform: "translateX(-50%)" }}
        onAnimationComplete={() => {
          if (!landed && !takeoff) {
            setLanded(true);
            setShowLand(true);
          }
        }}
      >
        <AnimatePresence mode="wait">
          {/* Rocket */}
          {showRocket && !transformed && !transforming && (
            <motion.div
              key="rocket"
              initial={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Rocket width={100} height={200} />
              {landed && (
                <motion.div
                  animate={{ scaleY: [0.8, 1.2, 0.8], opacity: [0.7, 1, 0.7] }}
                  transition={{ repeat: Infinity, duration: 0.3 }}
                  className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-12 bg-gradient-to-t from-orange-500 via-yellow-400 to-transparent rounded-full"
                />
              )}
            </motion.div>
          )}

          {/* Transformation */}
          {transforming && (
            <motion.div
              key="transforming"
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: 1.1, opacity: 1 }}
              exit={{ scale: 1, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7], rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-32 h-32 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-xl absolute -inset-4"
              />
              <motion.div
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                <Rocket width={100} height={200} />
              </motion.div>
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute inset-0"
              >
                <Gundam width={120} height={200} />
              </motion.div>
            </motion.div>
          )}

          {/* Gundam */}
          {transformed && (
            <motion.div
              key="gundam"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: [1, 1.05, 1], y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: takeoff ? 0 : Infinity }}
              className="relative"
            >
              <Gundam width={120} height={200} />
              {takeoff && (
                <motion.div
                  animate={{ scaleY: [0.5, 1.5] }}
                  transition={{ repeat: Infinity, duration: 0.2, yoyo: Infinity }}
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-16 bg-gradient-to-t from-blue-500 via-cyan-400 to-transparent rounded-full"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Transformation particles */}
      {transforming && (
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-30">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
              animate={{ scale: [0, 1, 0], opacity: [1, 1, 0], x: Math.cos(i * 0.2) * 150, y: Math.sin(i * 0.2) * 150 }}
              transition={{ duration: 2, delay: i * 0.05 }}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full"
            />
          ))}
        </div>
      )}

      {/* Flag forms */}
      {showForms && !transformed && (
        <div className="absolute z-30 w-full h-full">
          {flags.map((solved, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.3, duration: 0.5, type: "spring", stiffness: 100 }}
              className="absolute"
              style={{
                top: `calc(100vh - 250px + ${formPositions[i].top})`,
                left: `calc(50% + ${formPositions[i].left})`,
              }}
            >
              <FlagForm index={i} solved={solved} onSubmit={handleSubmit} />
            </motion.div>
          ))}
        </div>
      )}

      {/* Messages */}
      {transforming && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-1/4 left-1/2 transform -translate-x-1/2 z-40 text-center"
        >
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-3xl font-bold p-6 rounded-2xl shadow-2xl border-4 border-white mb-4">
            🔄 TRANSFORMATION IN PROGRESS! ⚡
          </div>
        </motion.div>
      )}

      {transformed && !takeoff && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute top-1/4 left-1/2 transform -translate-x-1/2 z-40 text-center"
        >
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-3xl font-bold p-6 rounded-2xl shadow-2xl border-4 border-white mb-4">
            🤖 F-MEN ACTIVATED! 🚀
          </div>
          <div className="text-white text-xl bg-black/50 p-4 rounded-lg">
            Preparing for launch...
          </div>
        </motion.div>
      )}

      {takeoff && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center z-40"
        >
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-4xl font-bold p-8 rounded-2xl shadow-2xl border-4 border-white text-center">
            🚀 F-MEN LAUNCH! 🎉<br />
            <span className="text-2xl">You save the world!</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
