"use client";
import { useState, useEffect } from "react";
const label = { inputProps: { "aria-label": "Switch demo" } };
import { useRouter } from "next/navigation";
import { deleteCookie, hasCookie } from "cookies-next";

export default function Home() {
  const route = useRouter();
  useEffect(() => {
    if (hasCookie("userName")) {
      route.push("/prices");
    } else {
      route.push("/login");
    }
  }, []);
  return <div className="container"></div>;
}
