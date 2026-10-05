"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [dot, setDot] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    let animId: number;
    let targetX = -100, targetY = -100;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setDot({ x: e.clientX, y: e.clientY });

      const el = document.elementFromPoint(e.clientX, e.clientY);
      const computed = el ? window.getComputedStyle(el).cursor : "";
      setIsPointer(computed === "pointer");
      setIsHidden(computed === "text");
    };

    const lerp = () => {
      setPos((prev) => ({
        x: prev.x + (targetX - prev.x) * 0.12,
        y: prev.y + (targetY - prev.y) * 0.12,
      }));
      animId = requestAnimationFrame(lerp);
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    animId = requestAnimationFrame(lerp);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <>
      {/* Outer ring — follows with lag */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full border border-indigo-400/50 transition-all duration-150"
        style={{
          left: pos.x,
          top: pos.y,
          width: isPointer ? 44 : isClicking ? 28 : 36,
          height: isPointer ? 44 : isClicking ? 28 : 36,
          transform: "translate(-50%, -50%)",
          opacity: isHidden ? 0 : 1,
          background: isPointer ? "rgba(99,102,241,0.08)" : "transparent",
          mixBlendMode: "normal",
        }}
      />
      {/* Inner dot — instant */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full bg-[#f43f7e]"
        style={{
          left: dot.x,
          top: dot.y,
          width: isClicking ? 6 : 5,
          height: isClicking ? 6 : 5,
          transform: "translate(-50%, -50%)",
          opacity: isHidden ? 0 : 1,
          boxShadow: "0 0 6px rgba(244,63,126,0.8)",
          transition: "width 0.1s, height 0.1s",
        }}
      />
    </>
  );
}
