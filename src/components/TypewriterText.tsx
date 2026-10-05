"use client";

import { useEffect, useState, useRef } from "react";

interface TypewriterTextProps {
  texts: string[];
  speed?: number;
  pauseDuration?: number;
  className?: string;
}

export default function TypewriterText({
  texts,
  speed = 50,
  pauseDuration = 2000,
  className = "",
}: TypewriterTextProps) {
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (!isVisible) return;

    const currentFullText = texts[textIndex];
    
    if (!isDeleting) {
      // Typing
      if (currentText.length < currentFullText.length) {
        timeoutRef.current = setTimeout(() => {
          setCurrentText(currentFullText.slice(0, currentText.length + 1));
        }, speed);
      } else {
        // Pause before deleting
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Deleting - but keep at least 1 char to prevent layout shift
      if (currentText.length > 1) {
        timeoutRef.current = setTimeout(() => {
          setCurrentText(currentFullText.slice(0, currentText.length - 1));
        }, speed / 2);
      } else {
        // Switch to next text directly (keep 1 char, then replace)
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
        // Immediately start typing next text
        timeoutRef.current = setTimeout(() => {
          setCurrentText(texts[(textIndex + 1) % texts.length].slice(0, 1));
        }, 50);
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentText, textIndex, isDeleting, texts, speed, pauseDuration, isVisible]);

  return (
    <span className={className} style={{ display: "inline-block", minWidth: "1ch" }}>
      {currentText || "\u00A0"}
      <span className="relative inline-block w-2 h-8 ml-1 animate-blink align-bottom bg-gradient-to-b from-indigo-400 to-amber-400" />
    </span>
  );
}