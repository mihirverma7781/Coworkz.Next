"use client";

import Header from "./_components/Header";
import Hero from "./_components/Hero";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect } from "react";

export default function Home() {

  return (
    <div>
      <Header />
      <Hero />
    </div>
  );
}
