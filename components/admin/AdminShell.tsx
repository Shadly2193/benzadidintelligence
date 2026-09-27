"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  Film,
  Clapperboard,
  GraduationCap,
  Briefcase,
  Home,
  User,
  Building2,
  Quote,
  Inbox,
  Settings,
  FolderOpen,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";

const NAV_PRIMARY = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/videos", label: "Videos", icon: Film },
  { href: "/admin/content-videos", label: "Content Videos", icon: Clapperboard },
  { href: "/admin/tutorials", label: "Tutorials", icon: GraduationCap },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/homepage", label: "Homepage", icon: Home },
  { href: "/admin/about", label: "About Page", icon: User },
  { href: "/admin/logos", label: "Client Logos", icon: Building2 },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
];

const NAV_SECONDARY = [
  { href: "/admin/media", label: "Media Library", icon: FolderOpen },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
];

const LABELS: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/videos": "Videos",
  "/admin/content-videos": "Content Videos",
  "/admin/tutorials": "Tutorials",
  "/admin/services": "Services",
  "/admin/homepage": "Homepage",
  "/admin/about": "About Page",
  "/admin/logos": "Client Logos",
  "/admin/testimonials": "Testimonials",
  "/admin/leads": "Leads",
  "/admin/media": "Media Library",
  "/admin/settings": "Site Settings",
};

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  const current = LABELS[pathname] ?? "Admin";

  const navContent = (
    <>
      <div className="px-5 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-orange flex items-center justify-center shrink-0">
            <span className="text-white font-black text-sm">B</span>
          </div>
          <span className="text-sm font-bold text-white leading-tight">
            Benzadid
            <br />
            Intelligence
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden text-brand-gray-text hover:text-white"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 px-3 flex flex-col gap-0.5 overflow-y-auto">
        {NAV_PRIMARY.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              isActive(item.href)
                ? "bg-brand-orange/10 text-brand-orange font-semibold"
                : "text-brand-gray-text hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <item.icon size={17} strokeWidth={2} />
            {item.label}
          </Link>
        ))}

        <p className="mt-6 mb-2 px-3 text-[10px] font-bold tracking-widest uppercase text-white/25">
          System
        </p>
        {NAV_SECONDARY.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              isActive(item.href)
                ? "bg-brand-orange/10 text-brand-orange font-semibold"
                : "text-brand-gray-text hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <item.icon size={17} strokeWidth={2} />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-brand-gray-text hover:text-white hover:bg-white/[0.04] transition-colors"
        >
          <LogOut size={17} strokeWidth={2} />
          Log Out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-brand-black flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 h-screen sticky top-0 border-r border-white/10 bg-white/[0.015] flex-col">
        {navContent}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-72 bg-brand-black border-r border-white/10 flex flex-col">
            {navContent}
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 shrink-0 border-b border-white/10 flex items-center justify-between px-4 lg:px-6 bg-brand-black/60 backdrop-blur sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-white"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <span className="text-brand-gray-text">Benzadid Intelligence</span>
              <span className="text-white/20">/</span>
              <span className="text-white font-semibold">{current}</span>
            </div>
            <span className="sm:hidden text-sm font-semibold text-white">{current}</span>
          </div>

          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange text-white text-xs font-bold px-3 py-2 sm:px-4 hover:bg-brand-orange-light transition-colors whitespace-nowrap"
          >
            <span className="hidden sm:inline">View Live Site</span>
            <ExternalLink size={13} strokeWidth={2.5} />
          </Link>
        </header>

        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
