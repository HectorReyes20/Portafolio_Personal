"use client";

import React, { useEffect, useState } from "react";

/**
 * Muestra la hora actual en Lima, Perú sin desajustes de hidratación SSR.
 */
export default function LimaClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const formatLima = () =>
      new Intl.DateTimeFormat("es-PE", {
        timeZone: "America/Lima",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date());

    setTime(formatLima());
    const interval = setInterval(() => {
      setTime(formatLima());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
      Perú — Lima{time ? ` · ${time}` : ""}
    </span>
  );
}
