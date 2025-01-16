"use client";

import ReasonScreen from "./reason_screen";
import ArmadaScreen from "./armada_screen";
import HeroScreen from "./hero_screen";
import PickupScreen from "./pickup_screen";

export default function HomeScreen() {
  return (
    <main className="min-h-screen">
      <HeroScreen />
      <PickupScreen />
      <ArmadaScreen />
      <ReasonScreen />
    </main>
  );
}
