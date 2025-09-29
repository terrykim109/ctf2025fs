"use client";

import React, { useState } from "react";
import IntroCrawl from "../components/IntroCrawl";
import RocketScene from "../components/RocketScene";

export default function Home() {
  const [showRocket, setShowRocket] = useState(false);

  return (
    <main className="bg-black text-white min-h-screen overflow-hidden">
      {!showRocket ? (
        <IntroCrawl onFinish={() => setShowRocket(true)} />
      ) : (
        <RocketScene />
      )}
    </main>
  );
}
