"use client";

import type { JSX } from "react";

interface Integration {
  name: string;
  category?: string;
  logo: JSX.Element;
}

const integrations: Integration[] = [
  {
    name: "n8n",
    category: "Automation",
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="#EA4B71" fillOpacity="0.2" />
        <circle cx="7" cy="12" r="2.2" fill="#EA4B71" />
        <circle cx="17" cy="7.5" r="2.2" fill="#EA4B71" />
        <circle cx="17" cy="16.5" r="2.2" fill="#EA4B71" />
        <path d="M7 12h5l5-4.5M12 12l5 4.5" stroke="#EA4B71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Slack",
    category: "Communication",
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="#E01E5A" d="M6 15a2 2 0 1 1-2-2h2v2zm1 0a2 2 0 1 1 2 2V13H7v2z" />
        <path fill="#36C5F0" d="M9 6a2 2 0 1 1 2-2v2H9zm0 1a2 2 0 1 1-2 2h4V7H9z" />
        <path fill="#2EB67D" d="M18 9a2 2 0 1 1 2 2h-2V9zm-1 0a2 2 0 1 1-2-2v4h4V9h-1z" />
        <path fill="#ECB22E" d="M15 18a2 2 0 1 1-2 2v-2h2zm0-1a2 2 0 1 1 2-2h-4v4h2v-1z" />
      </svg>
    ),
  },
  {
    name: "Notion",
    category: "Productivity",
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path fill="#FFFFFF" d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.093-.374L17.8.847a1.72 1.72 0 0 0-1.214-.56L3.385 1.08c-.467.047-.56.28-.374.514l1.448 2.614zm1.774 4.576v12.28c0 .794.374 1.12 1.214 1.074l13.822-.84c.84-.047 1.074-.654 1.074-1.261V7.99c0-.654-.28-.934-.84-.887l-14.43.887c-.607.047-.84.28-.84.794zm12.373 1.027c.093.42.047.84-.28.887l-.98.187v8.964c-.467.28-.98.42-1.448.42-.7 0-.98-.233-1.54-.933l-4.576-7.05v7.05l1.448.327c0 .42-.327.794-.887.794l-3.362.233c-.093-.374 0-.794.374-.84l.98-.187V9.764l-1.354-.14c-.094-.42.14-.794.7-.84l3.595-.234 4.81 7.284V9.297l-1.26-.14c-.094-.42.14-.794.7-.84l3.072-.233z" />
      </svg>
    ),
  },
  {
    name: "OpenAI",
    category: "AI",
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="#10A37F" fillOpacity="0.2" />
        <path
          d="M12 6.5a2.5 2.5 0 0 1 2.2 1.3 2.5 2.5 0 0 1 2.8 1.6 2.5 2.5 0 0 1-.6 3.2 2.5 2.5 0 0 1 1.1 3 2.5 2.5 0 0 1-2.8 1.6 2.5 2.5 0 0 1-2.2 1.3 2.5 2.5 0 0 1-2.2-1.3 2.5 2.5 0 0 1-2.8-1.6 2.5 2.5 0 0 1 .6-3.2 2.5 2.5 0 0 1-1.1-3 2.5 2.5 0 0 1 2.8-1.6A2.5 2.5 0 0 1 12 6.5z"
          stroke="#10A37F"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="1.5" fill="#10A37F" />
      </svg>
    ),
  },
  {
    name: "Airtable",
    category: "Database",
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="#FCB400" d="M11.02 2.21a1.9 1.9 0 0 1 1.96 0l8.15 4.83a.95.95 0 0 1 0 1.63l-8.15 4.83a1.9 1.9 0 0 1-1.96 0L2.87 8.67a.95.95 0 0 1 0-1.63l8.15-4.83z" />
        <path fill="#18BFFF" d="M12.98 14.61v7.65a.95.95 0 0 0 1.45.81l7.68-4.55a.95.95 0 0 0 .46-.82v-7.65a.95.95 0 0 0-1.44-.82l-7.69 4.56a.95.95 0 0 0-.46.82z" />
        <path fill="#F82B60" d="M10.05 14.28L3.2 18.33a.95.95 0 0 0-.47.82v1.17c0 .64.52 1.15 1.16 1.15h12.22c.64 0 1.16-.51 1.16-1.15v-6.04H10.05z" />
      </svg>
    ),
  },
  {
    name: "HubSpot",
    category: "CRM",
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FF7A59">
        <path d="M18.8 7.2V5.1c.7-.4 1.2-1.1 1.2-2 0-1.3-1-2.3-2.3-2.3-1.3 0-2.3 1-2.3 2.3 0 .9.5 1.6 1.2 2v2.1c-.8.2-1.6.6-2.2 1.1L8.7 5.5c.1-.3.2-.6.2-.9 0-1.7-1.4-3.1-3.1-3.1S2.7 2.9 2.7 4.6s1.4 3.1 3.1 3.1c.6 0 1.1-.2 1.6-.4l5.7 2.8c-.5.8-.8 1.8-.8 2.8 0 1.1.4 2.2 1 3l-2.4 2.4c-.4-.2-.8-.4-1.3-.4-1.7 0-3.1 1.4-3.1 3.1s1.4 3.1 3.1 3.1 3.1-1.4 3.1-3.1c0-.5-.1-1-.4-1.4l2.4-2.4c.8.5 1.7.8 2.8.8 2.8 0 5-2.2 5-5 0-2.2-1.4-4.1-3.4-4.8zm-1.1-4.7c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7zm-11.9 3.6c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4zm3.8 14.5c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4zm7.2-6.3c-1.8 0-3.3-1.5-3.3-3.3s1.5-3.3 3.3-3.3 3.3 1.5 3.3 3.3-1.5 3.3-3.3 3.3z" />
      </svg>
    ),
  },
  {
    name: "Google Sheets",
    category: "Spreadsheet",
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="#0F9D58" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
        <path fill="#87CEAC" d="M14 2v6h6z" />
        <path fill="#FFFFFF" d="M8 13h8v2H8zm0 3h8v2H8zm0-6h4v2H8z" />
      </svg>
    ),
  },
  {
    name: "Stripe",
    category: "Payment",
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#635BFF">
        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.97 15.697.5 12.873.5 7.425.5 3.5 3.35 3.5 8.163c0 6.002 8.307 5.097 8.307 8.143 0 1.05-.935 1.548-2.28 1.548-2.617 0-5.328-1.157-7.078-2.181l-.892 5.578c1.696.862 4.685 1.55 7.643 1.55 5.753 0 9.799-2.73 9.799-8.083 0-6.242-8.023-5.34-8.023-8.168z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    category: "Dev",
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FFFFFF">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    name: "Discord",
    category: "Community",
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#5865F2">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
  {
    name: "Telegram",
    category: "Messaging",
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#229ED9">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
      </svg>
    ),
  },
  {
    name: "Gmail",
    category: "Email",
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="#EA4335" d="M12 13.5L2 6.3V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6.3l-10 7.2z" />
        <path fill="#4285F4" d="M22 6.3L12 13.5 2 6.3 12 0l10 6.3z" />
        <path fill="#FBBC05" d="M2 6.3V18a2 2 0 0 0 2 2h2V7.8L2 6.3z" />
        <path fill="#34A853" d="M22 6.3V18a2 2 0 0 1-2 2h-2V7.8l4-1.5z" />
      </svg>
    ),
  },
  {
    name: "Shopify",
    category: "E-Commerce",
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#95BF47">
        <path d="M19.98 6.72c-.04-.28-.27-.47-.54-.47h-2.57c-.12-1.56-.7-3.13-1.89-4.24C13.82.95 12.35.48 10.9.67c-1.38.18-2.61.98-3.3 2.14L5.12 3.75c-.34.1-.56.41-.53.76l1.52 14.54a1.86 1.86 0 0 0 1.84 1.66h9.12a1.86 1.86 0 0 0 1.85-1.66l1.06-12.33zm-7.61-4.3c.96-.12 1.93.18 2.65.84.77.72 1.18 1.77 1.25 2.85l-5.06 1.48c.45-.96 1.26-1.63 2.21-1.81.4-.07-.65.12-.05.04l-.08.02.09-.02-.91-3.4zm-.75 14.28c-1.81 0-2.82-1.02-2.82-2.22 0-1.98 2.76-2.3 2.76-3.23 0-.41-.35-.68-.96-.68-.86 0-1.74.39-2.36.87l-.65-1.52c.86-.68 2.05-1.08 3.19-1.08 2 0 2.92 1.1 2.92 2.39 0 2.09-2.78 2.37-2.78 3.26 0 .46.42.66 1.05.66.86 0 1.84-.44 2.47-.94l.65 1.54c-.9.7-2.18 1.14-3.47 1.14z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    category: "Messaging",
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#25D366">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.04 3.67C16.58 3.67 20.28 7.37 20.28 11.91C20.28 16.45 16.58 20.15 12.04 20.15ZM16.55 14.39C16.3 14.26 15.08 13.66 14.86 13.58C14.63 13.5 14.47 13.46 14.3 13.71C14.14 13.96 13.66 14.52 13.51 14.69C13.37 14.85 13.22 14.87 12.97 14.75C12.72 14.62 11.93 14.36 10.99 13.52C10.26 12.87 9.77 12.07 9.63 11.82C9.48 11.57 9.61 11.44 9.74 11.31C9.85 11.2 9.99 11.02 10.12 10.87C10.25 10.72 10.29 10.62 10.37 10.45C10.45 10.29 10.41 10.14 10.35 10.02C10.29 9.89 9.8 8.68 9.59 8.19C9.39 7.7 9.19 7.77 9.04 7.76H8.57C8.4 7.76 8.13 7.82 7.9 8.07C7.68 8.32 7.05 8.91 7.05 10.11C7.05 11.31 7.92 12.47 8.04 12.63C8.17 12.79 9.77 15.26 12.21 16.32C12.79 16.57 13.25 16.72 13.6 16.83C14.19 17.02 14.72 16.99 15.15 16.93C15.63 16.86 16.62 16.33 16.83 15.75C17.03 15.18 17.03 14.69 16.97 14.59C16.91 14.49 16.8 14.43 16.55 14.39Z" />
      </svg>
    ),
  },
];

export default function Marquee() {
  // Duplicate list to achieve continuous seamless ticker loop
  const allIntegrations = [...integrations, ...integrations];

  return (
    <div className="relative overflow-hidden border-y border-[#2a2a3a]/80 bg-[#0a0a0f]/80 backdrop-blur-md py-5">
      {/* Background glow strip */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-amber-500/5 to-indigo-500/5 pointer-events-none" />

      {/* Left/Right Edge Gradient Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent pointer-events-none" />

      {/* Micro-label */}
      <div className="text-center mb-3">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          Compatible avec vos applications favorites
        </span>
      </div>

      {/* Animated track */}
      <div
        className="flex gap-4 sm:gap-6 whitespace-nowrap hover:[animation-play-state:paused]"
        style={{ animation: "marquee-scroll 32s linear infinite" }}
      >
        {allIntegrations.map((item, i) => (
          <div
            key={i}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#111118]/90 border border-[#2a2a3a] hover:border-indigo-500/50 hover:bg-[#161622] hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 group cursor-default select-none"
          >
            <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
              {item.logo}
            </div>
            <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
              {item.name}
            </span>
            {item.category && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-gray-500 group-hover:text-gray-400 group-hover:bg-white/10 transition-colors">
                {item.category}
              </span>
            )}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
