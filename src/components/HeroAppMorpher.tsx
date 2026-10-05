"use client";

import { useEffect, useState, type JSX } from "react";

interface AppItem {
  name: string;
  logo: JSX.Element;
}

const apps: AppItem[] = [
  {
    name: "n8n",
    logo: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="#EA4B71" />
        <circle cx="7" cy="12" r="2.2" fill="#FFFFFF" />
        <circle cx="17" cy="7.5" r="2.2" fill="#FFFFFF" />
        <circle cx="17" cy="16.5" r="2.2" fill="#FFFFFF" />
        <path d="M7 12h5l5-4.5M12 12l5 4.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Slack",
    logo: (
      <svg className="w-full h-full" viewBox="0 0 24 24">
        <path fill="#E01E5A" d="M6 15a2 2 0 1 1-2-2h2v2zm1 0a2 2 0 1 1 2 2V13H7v2z" />
        <path fill="#36C5F0" d="M9 6a2 2 0 1 1 2-2v2H9zm0 1a2 2 0 1 1-2 2h4V7H9z" />
        <path fill="#2EB67D" d="M18 9a2 2 0 1 1 2 2h-2V9zm-1 0a2 2 0 1 1-2-2v4h4V9h-1z" />
        <path fill="#ECB22E" d="M15 18a2 2 0 1 1-2 2v-2h2zm0-1a2 2 0 1 1 2-2h-4v4h2v-1z" />
      </svg>
    ),
  },
  {
    name: "Notion",
    logo: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
        <path fill="#FFFFFF" d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.093-.374L17.8.847a1.72 1.72 0 0 0-1.214-.56L3.385 1.08c-.467.047-.56.28-.374.514l1.448 2.614zm1.774 4.576v12.28c0 .794.374 1.12 1.214 1.074l13.822-.84c.84-.047 1.074-.654 1.074-1.261V7.99c0-.654-.28-.934-.84-.887l-14.43.887c-.607.047-.84.28-.84.794zm12.373 1.027c.093.42.047.84-.28.887l-.98.187v8.964c-.467.28-.98.42-1.448.42-.7 0-.98-.233-1.54-.933l-4.576-7.05v7.05l1.448.327c0 .42-.327.794-.887.794l-3.362.233c-.093-.374 0-.794.374-.84l.98-.187V9.764l-1.354-.14c-.094-.42.14-.794.7-.84l3.595-.234 4.81 7.284V9.297l-1.26-.14c-.094-.42.14-.794.7-.84l3.072-.233z" />
      </svg>
    ),
  },
  {
    name: "OpenAI",
    logo: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="#10A37F" />
        <path
          d="M12 6.5a2.5 2.5 0 0 1 2.2 1.3 2.5 2.5 0 0 1 2.8 1.6 2.5 2.5 0 0 1-.6 3.2 2.5 2.5 0 0 1 1.1 3 2.5 2.5 0 0 1-2.8 1.6 2.5 2.5 0 0 1-2.2 1.3 2.5 2.5 0 0 1-2.2-1.3 2.5 2.5 0 0 1-2.8-1.6 2.5 2.5 0 0 1 .6-3.2 2.5 2.5 0 0 1-1.1-3 2.5 2.5 0 0 1 2.8-1.6A2.5 2.5 0 0 1 12 6.5z"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="1.5" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: "Airtable",
    logo: (
      <svg className="w-full h-full" viewBox="0 0 24 24">
        <path fill="#FCB400" d="M11.02 2.21a1.9 1.9 0 0 1 1.96 0l8.15 4.83a.95.95 0 0 1 0 1.63l-8.15 4.83a1.9 1.9 0 0 1-1.96 0L2.87 8.67a.95.95 0 0 1 0-1.63l8.15-4.83z" />
        <path fill="#18BFFF" d="M12.98 14.61v7.65a.95.95 0 0 0 1.45.81l7.68-4.55a.95.95 0 0 0 .46-.82v-7.65a.95.95 0 0 0-1.44-.82l-7.69 4.56a.95.95 0 0 0-.46.82z" />
        <path fill="#F82B60" d="M10.05 14.28L3.2 18.33a.95.95 0 0 0-.47.82v1.17c0 .64.52 1.15 1.16 1.15h12.22c.64 0 1.16-.51 1.16-1.15v-6.04H10.05z" />
      </svg>
    ),
  },
  {
    name: "HubSpot",
    logo: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="#FF7A59">
        <path d="M18.8 7.2V5.1c.7-.4 1.2-1.1 1.2-2 0-1.3-1-2.3-2.3-2.3-1.3 0-2.3 1-2.3 2.3 0 .9.5 1.6 1.2 2v2.1c-.8.2-1.6.6-2.2 1.1L8.7 5.5c.1-.3.2-.6.2-.9 0-1.7-1.4-3.1-3.1-3.1S2.7 2.9 2.7 4.6s1.4 3.1 3.1 3.1c.6 0 1.1-.2 1.6-.4l5.7 2.8c-.5.8-.8 1.8-.8 2.8 0 1.1.4 2.2 1 3l-2.4 2.4c-.4-.2-.8-.4-1.3-.4-1.7 0-3.1 1.4-3.1 3.1s1.4 3.1 3.1 3.1 3.1-1.4 3.1-3.1c0-.5-.1-1-.4-1.4l2.4-2.4c.8.5 1.7.8 2.8.8 2.8 0 5-2.2 5-5 0-2.2-1.4-4.1-3.4-4.8zm-1.1-4.7c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7zm-11.9 3.6c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4zm3.8 14.5c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4zm7.2-6.3c-1.8 0-3.3-1.5-3.3-3.3s1.5-3.3 3.3-3.3 3.3 1.5 3.3 3.3-1.5 3.3-3.3 3.3z" />
      </svg>
    ),
  },
  {
    name: "Google Sheets",
    logo: (
      <svg className="w-full h-full" viewBox="0 0 24 24">
        <path fill="#0F9D58" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
        <path fill="#87CEAC" d="M14 2v6h6z" />
        <path fill="#FFFFFF" d="M8 13h8v2H8zm0 3h8v2H8zm0-6h4v2H8z" />
      </svg>
    ),
  },
  {
    name: "Stripe",
    logo: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="#635BFF">
        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.97 15.697.5 12.873.5 7.425.5 3.5 3.35 3.5 8.163c0 6.002 8.307 5.097 8.307 8.143 0 1.05-.935 1.548-2.28 1.548-2.617 0-5.328-1.157-7.078-2.181l-.892 5.578c1.696.862 4.685 1.55 7.643 1.55 5.753 0 9.799-2.73 9.799-8.083 0-6.242-8.023-5.34-8.023-8.168z" />
      </svg>
    ),
  },
];

export default function HeroAppMorpher() {
  const [index, setIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setIsFlipping(true);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % apps.length);
        setIsFlipping(false);
      }, 240);
    }, 2400);

    return () => clearInterval(interval);
  }, [isPaused]);

  const currentApp = apps[index];

  return (
    <span
      className="inline-flex items-center align-middle ml-1 sm:ml-1.5 -translate-y-2 sm:-translate-y-3 md:-translate-y-4 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      title={currentApp.name}
    >
      <span className="relative inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl sm:rounded-3xl bg-[#111118] border border-[#2a2a3a] hover:border-indigo-500/50 shadow-lg transition-all duration-300">
        {/* Morphing container with enlarged icon and stylish rotation */}
        <span
          className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center transition-all duration-300 ease-out"
          style={{
            transform: isFlipping
              ? "scale(0.6) rotate(45deg) rotateY(90deg)"
              : "scale(1) rotate(-4deg) rotateY(0deg)",
            opacity: isFlipping ? 0 : 1,
            transformOrigin: "center",
          }}
        >
          {currentApp.logo}
        </span>
      </span>
    </span>
  );
}
