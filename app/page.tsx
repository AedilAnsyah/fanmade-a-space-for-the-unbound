"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Characters from "@/components/sections/Characters";
import Gameplay from "@/components/sections/Gameplay";
import News from "@/components/sections/News";
import PlayNow from "@/components/sections/PlayNow";
import VideoModal from "@/components/ui/VideoModal";
import AtmaJournal from "@/components/features/AtmaJournal";
import InteractiveEasterEggs from "@/components/features/InteractiveEasterEggs";
import CRTFilter from "@/components/effects/CRTFilter";
import PixelCursor from "@/components/effects/PixelCursor";

export default function Home() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedTrailerId, setSelectedTrailerId] = useState("trailer_01_launch");

  const handleOpenTrailer = (trailerId: string = "trailer_01_launch") => {
    setSelectedTrailerId(trailerId);
    setIsVideoModalOpen(true);
  };

  return (
    <main className="relative min-h-screen bg-bg-primary text-text-main">
      {/* Handcrafted Global Effects */}
      <PixelCursor />
      <CRTFilter />

      {/* 1. Sticky Navigation */}
      <Navbar onOpenTrailer={() => handleOpenTrailer("trailer_01_launch")} />

      {/* 2. Hero Section (#home) */}
      <Hero onOpenTrailer={() => handleOpenTrailer("trailer_01_launch")} />

      {/* 3. Characters Section (#characters) */}
      <Characters />

      {/* 4. Diegetic Feature: Atma's Red Journal */}
      <AtmaJournal />

      {/* 5. Gameplay & Features Section (#gameplay) */}
      <Gameplay />

      {/* 6. Handcrafted Easter Eggs: Pet Lulu & Hit Kentongan */}
      <InteractiveEasterEggs />

      {/* 7. News & Milestones Timeline Section (#news) */}
      <News />

      {/* 8. Play Now & Platforms Section (#play) */}
      <PlayNow />

      {/* 9. Footer */}
      <Footer />

      {/* 10. Interactive Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        initialTrailerId={selectedTrailerId}
      />
    </main>
  );
}
