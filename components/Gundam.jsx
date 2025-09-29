"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FlagForm from "./FlagForm";
import Rocket from "./Rocket";
import Gundam from "./Gundam";

const correctFlags = [
  "flag1{example}",
  "flag2{example}",
  "flag3{example}",
  "flag4{example}",
  "flag5{example}"
];

const formPositions = [
  { top: "-180px", left: "-200px" },
  { top: "-220px", left: "180px" },
  { top: "60px", left: "-220px" },
  { top: "120px", left: "200px" },
  { top: "-40px", left: "0px" },
];

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
      // Start transformation sequence
      setTransforming(true);
      setTimeout(() => {
        setTransformed(true);
        setTransforming(false);
      }, 2000); // Transformation duration
    }
  }, [flags, transforming, transformed]);

  // Launch after transformation
  useEffect(() => {
    if (transformed) {
      const launchTimer = setTimeout(() => {
        setTakeoff(true);
      }, 3000); // Wait 3 seconds after transformation before launch
      return () => clearTimeout(launchTimer);
    }
  }, [transformed]);

  // Show forms after landing
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

      {/* Moon surface - appears when rocket lands */}
      {showLand && !takeoff && (
        <motion.div 
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-0 w-[140%] h-48 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-t-[100%] z-10 -left-[20%] origin-bottom"
        >
          {/* Moon craters */}
          <div className="absolute w-20 h-20 bg-gray-800 rounded-full top-8 left-[25%] opacity-60"></div>
          <div className="absolute w-12 h-12 bg-gray-800 rounded-full top-12 left-[65%] opacity-60"></div>
          <div className="absolute w-16 h-16 bg-gray-800 rounded-full top-4 left-[45%] opacity-60"></div>
        </motion.div>
      )}

      {/* Vehicle Container - Same element transforms */}
      <motion.div
        initial={{ 
          y: "-50vh",
          x: "50%",
        }}
        animate={{ 
          y: takeoff ? "-100vh" : "calc(100vh - 250px)",
        }}
        transition={{ 
          duration: takeoff ? 2 : 4,
          ease: takeoff ? "easeIn" : "easeOut" 
        }}
        className="absolute top-0 left-1/2 z-20"
        style={{
          transform: "translateX(-50%)"
        }}
        onAnimationComplete={() => {
          if (!landed && !takeoff) {
            setLanded(true);
            setShowLand(true);
          }
        }}
      >
        <AnimatePresence mode="wait">
          {/* Rocket - shows before transformation */}
          {!transformed && !transforming && (
            <motion.div
              key="rocket"
              initial={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Rocket width={100} height={200} />
              
              {/* Landing flame */}
              {landed && !transforming && (
                <motion.div
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ 
                    scaleY: [0.8, 1.2, 0.8],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 0.3 
                  }}
                  className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-12 bg-gradient-to-t from-orange-500 via-yellow-400 to-transparent rounded-full"
                />
              )}
            </motion.div>
          )}

          {/* Transformation Animation */}
          {transforming && (
            <motion.div
              key="transforming"
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: 1.1, opacity: 1 }}
              exit={{ scale: 1, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Glowing orb during transformation */}
              <motion.div
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7],
                  rotate: 360
                }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity
                }}
                className="w-32 h-32 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-xl absolute -inset-4"
              />
              
              {/* Rocket shell breaking apart */}
              <motion.div
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                <Rocket width={100} height={200} />
              </motion.div>
              
              {/* Emerging Gundam */}
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

          {/* Gundam - after transformation */}
          {transformed && !takeoff && (
            <motion.div
              key="gundam"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ 
                scale: [1, 1.05, 1],
                y: [0, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity
              }}
              className="relative"
            >
              <Gundam width={120} height={200} />
            </motion.div>
          )}

          {/* Gundam with thrusters during launch */}
          {takeoff && (
            <motion.div
              key="gundam-launch"
              initial={{ scale: 1, opacity: 1 }}
              className="relative"
            >
              <Gundam width={120} height={200} />
              
              {/* Gundam thrusters */}
              <motion.div
                initial={{ scaleY: 0.5 }}
                animate={{ scaleY: 1.5 }}
                transition={{ repeat: Infinity, duration: 0.2, yoyo: Infinity }}
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-16 bg-gradient-to-t from-blue-500 via-cyan-400 to-transparent rounded-full"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Transformation particles */}
      {transforming && (
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-30">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                scale: 0, 
                opacity: 1,
                x: 0,
                y: 0
              }}
              animate={{ 
                scale: [0, 1, 0],
                opacity: [1, 1, 0],
                x: Math.cos(i * 0.125) * 200,
                y: Math.sin(i * 0.125) * 200
              }}
              transition={{ 
                duration: 2,
                delay: i * 0.05
              }}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full"
            />
          ))}
        </div>
      )}

      {/* Flag forms - show after landing */}
      {showForms && !transformed && (
        <div className="absolute z-30 w-full h-full">
          {flags.map((solved, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: i * 0.3, 
                duration: 0.5,
                type: "spring",
                stiffness: 100
              }}
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

      {/* Transformation message */}
      {transforming && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-1/4 left-1/2 transform -translate-x-1/2 z-40 text-center"
        >
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-3xl font-bold p-6 rounded-2xl shadow-2xl border-4 border-white mb-4">
            ⚡ Powering Up! ⚡
          </div>
        </motion.div>
      )}

      {/* Post-transformation message */}
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

      {/* Launch message */}
      {takeoff && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center z-40"
        >
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-4xl font-bold p-8 rounded-2xl shadow-2xl border-4 border-white text-center">
            🚀 F-MEN LAUNCH! 🎉<br />
            <span className="text-2xl">Mission Accomplished!</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}