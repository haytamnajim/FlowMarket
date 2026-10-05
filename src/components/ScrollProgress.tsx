"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9998] h-[2px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-indigo-500 via-[#f43f7e] to-amber-500 transition-all duration-75 ease-out shadow-[0_0_8px_rgba(244,63,126,0.6)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
