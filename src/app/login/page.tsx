"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import FlowMarketBrand from "@/components/FlowMarketBrand";
import InteractiveParticles from "@/components/InteractiveParticles";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  // Mode de connexion utilisateur : "login" ou "register"
  const [isRegister, setIsRegister] = useState(false);

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Status & notifications
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [welcomeUser, setWelcomeUser] = useState<string | null>(null);

  // Remplissage rapide démo utilisateur
  const handleQuickFillUser = () => {
    setIsRegister(false);
    setEmail("alexandre@flowmarket.io");
    setPassword("UserPass@2026");
    setFullName("Alexandre Martin");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setErrorMessage("Veuillez renseigner votre email et mot de passe.");
      setIsLoading(false);
      return;
    }

    try {
      if (isRegister) {
        const { data, error } = await supabase.auth.signUp({
          email: trimmedEmail,
          password: trimmedPassword,
          options: {
            data: {
              full_name: fullName.trim() || "Utilisateur",
            },
          },
        });

        const userName = fullName.trim() || trimmedEmail.split("@")[0] || "Membre FlowMarket";
        setWelcomeUser(userName);

        setTimeout(() => {
          router.push("/workflows");
        }, 1500);
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: trimmedEmail,
          password: trimmedPassword,
        });

        const userName =
          data?.user?.user_metadata?.full_name ||
          fullName.trim() ||
          trimmedEmail.split("@")[0] ||
          "Membre FlowMarket";

        setWelcomeUser(userName);

        setTimeout(() => {
          router.push("/workflows");
        }, 1500);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erreur de connexion";
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07070d] text-white flex flex-col items-center justify-center p-4 sm:p-6 lg:p-10 pt-32 sm:pt-36 lg:pt-40 pb-16 relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Background Interactive Particles */}
      <InteractiveParticles count={40} />

      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[600px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/10 to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-amber-500/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

      {/* ── Modal de bienvenue utilisateur ── */}
      {welcomeUser && (
        <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 transition-all duration-500 animate-fadeIn">
          <div className="relative max-w-md w-full bg-[#0d0d18] border border-indigo-500/40 rounded-3xl p-8 text-center shadow-2xl shadow-indigo-500/20 overflow-hidden">
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-amber-500 p-0.5 shadow-xl shadow-indigo-500/30 mb-5 animate-bounce">
                <div className="w-full h-full bg-[#0d0d18] rounded-[14px] flex items-center justify-center">
                  <Icon name="check" className="w-8 h-8 text-emerald-400" />
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Connexion Réussie
              </div>

              <h2 className="text-3xl font-extrabold text-white tracking-tight mb-2">
                Bienvenue <span className="gradient-text">{welcomeUser}</span>
              </h2>

              <p className="text-gray-400 text-sm max-w-xs mb-6">
                Accès à votre bibliothèque de workflows et templates n8n en cours...
              </p>

              <div className="w-full bg-[#1c1c2a] rounded-full h-1.5 overflow-hidden mb-2">
                <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 animate-[pulse_1s_infinite] w-full" />
              </div>
              <span className="text-[11px] text-gray-500 font-mono">
                Redirection vers vos workflows
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── Container centré au milieu de l'écran (Formulaire utilisateur à gauche, Image à droite) ── */}
      <div className="relative z-10 w-full max-w-5xl my-4 sm:my-8">
        <div className="bg-[#0e0e18]/85 border border-white/10 rounded-3xl shadow-2xl backdrop-blur-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
          
          {/* GAUCHE : Formulaire Utilisateur Exclusif (7 colonnes sur desktop) */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between relative">
            <div>
              {/* Brand Header */}
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="inline-flex">
                  <FlowMarketBrand size="sm" />
                </Link>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Espace Membre
                </div>
              </div>

              {/* Titre & Sous-titre */}
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
                  {isRegister ? "Créer un compte FlowMarket" : "Connexion à votre espace"}
                </h1>
                <p className="text-xs sm:text-sm text-gray-400">
                  {isRegister
                    ? "Rejoignez plus de 10 000 créateurs et automatisez votre business avec n8n."
                    : "Retrouvez vos workflows achetés, clés d'accès et templates favoris."}
                </p>
              </div>

              {/* Notification d'erreur */}
              {errorMessage && (
                <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-center gap-3 text-xs text-rose-300 animate-in fade-in">
                  <Icon name="alert" className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Formulaire utilisateur */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Champ Nom complet (si inscription) */}
                {isRegister && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                      Nom &amp; Prénom
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                        <Icon name="user" className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Alexandre Martin"
                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-[#131320] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                    Adresse Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                      <Icon name="mail" className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre.email@domaine.com"
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-[#131320] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Mot de passe */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Mot de passe
                    </label>
                    {!isRegister && (
                      <button
                        type="button"
                        onClick={() => alert("Un email de réinitialisation vous a été envoyé.")}
                        className="text-[11px] text-indigo-400 hover:underline cursor-pointer"
                      >
                        Mot de passe oublié ?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                      <Icon name="lock" className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-[#131320] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all font-mono"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
                      tabIndex={-1}
                    >
                      <Icon name={showPassword ? "eyeOff" : "eye"} className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Rester connecté */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded bg-[#131320] border-white/10 text-indigo-500 focus:ring-indigo-500/30 cursor-pointer"
                  />
                  <label htmlFor="rememberMe" className="text-xs text-gray-400 cursor-pointer select-none">
                    Rester connecté sur cet appareil
                  </label>
                </div>

                {/* Bouton de soumission */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-3 btn-shine py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-amber-500 hover:shadow-xl hover:shadow-indigo-500/25 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.99] cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Authentification en cours…</span>
                    </>
                  ) : (
                    <>
                      <Icon name="arrowRight" className="w-4 h-4" />
                      <span>
                        {isRegister ? "Créer mon compte utilisateur" : "Se connecter à mon compte"}
                      </span>
                    </>
                  )}
                </button>
              </form>

              {/* Bascule Connexion / Inscription */}
              <div className="mt-5 text-center">
                <p className="text-xs text-gray-400">
                  {isRegister ? "Vous avez déjà un compte ?" : "Pas encore de compte FlowMarket ?"}{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegister(!isRegister);
                      setErrorMessage(null);
                    }}
                    className="text-indigo-400 font-semibold hover:underline cursor-pointer"
                  >
                    {isRegister ? "Se connecter" : "S'inscrire gratuitement"}
                  </button>
                </p>
              </div>
            </div>

            {/* Raccourci Démo & Retour Accueil */}
            <div className="mt-8 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
              <button
                type="button"
                onClick={handleQuickFillUser}
                className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Icon name="key" className="w-3.5 h-3.5 text-indigo-400" />
                <span>Remplir compte utilisateur démo</span>
              </button>

              <Link
                href="/"
                className="text-gray-500 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>Retour à l&apos;accueil</span>
                <Icon name="arrowRight" className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* DROITE : Image d'illustration n8n adaptée & high-tech (5 colonnes sur desktop) */}
          <div className="lg:col-span-5 relative hidden lg:block overflow-hidden bg-gradient-to-br from-[#0c0c16] to-[#121224] border-l border-white/10">
            {/* Image d'automatisation n8n */}
            <div className="absolute inset-0">
              <Image
                src="/auth-workflow-preview.jpg"
                alt="Illustration Orchestration de Workflows n8n"
                fill
                priority
                className="object-cover object-center scale-105 hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090912] via-transparent to-[#090912]/60" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e18] via-transparent to-transparent" />
            </div>

            {/* Overlay d'informations / Stats n8n au-dessus de l'image */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 pointer-events-none">
              <div className="flex justify-end">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-emerald-400 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Communauté n8n Active
                </span>
              </div>

              <div className="bg-[#0b0b14]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-white tracking-wide uppercase">
                    Vos Automatisations en 1 Clic
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed mb-3">
                  Accédez à votre bibliothèque de workflows, vos clés d&apos;API et vos guides d&apos;importation instantanés.
                </p>
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-[11px]">
                  <div>
                    <span className="text-gray-500 block">Workflows vérifiés</span>
                    <strong className="text-white font-mono">1 200+ templates</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Communauté</span>
                    <strong className="text-emerald-400 font-mono">10 000+ membres</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Pied de page de sécurité */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500 text-center">
          <Icon name="lock" className="w-3.5 h-3.5 text-emerald-400" />
          <span>Connexion sécurisée par protocole SSL et chiffrement Supabase</span>
        </div>
      </div>
    </div>
  );
}
