import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";
const KEY = "glc-theme";

function applyTheme(t: Theme) {
  const root = document.documentElement;
  root.classList.toggle("light", t === "light");
  root.classList.toggle("dark", t === "dark");
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let initial: Theme = "dark";
    try {
      const saved = localStorage.getItem(KEY) as Theme | null;
      if (saved === "light" || saved === "dark") initial = saved;
      else if (window.matchMedia?.("(prefers-color-scheme: light)").matches) initial = "light";
    } catch {}
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    try { localStorage.setItem(KEY, next); } catch {}
  };

  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="relative inline-flex h-9 w-[76px] items-center rounded-full border border-border bg-surface/70 px-1 shadow-sm hover:bg-surface-2 transition-colors"
      suppressHydrationWarning
    >
      <span
        className="absolute top-1 h-7 w-7 rounded-full bg-gradient-to-br from-primary to-amber-700 shadow-[var(--shadow-glow)] transition-transform duration-300"
        style={{ transform: mounted && !isDark ? "translateX(40px)" : "translateX(0px)" }}
      />
      <span className="relative z-10 flex w-full items-center justify-between px-1.5 text-muted-foreground">
        <Moon className={"size-3.5 " + (isDark ? "text-primary-foreground" : "")} />
        <Sun className={"size-3.5 " + (!isDark && mounted ? "text-primary-foreground" : "")} />
      </span>
    </button>
  );
}

// Runs before React hydrates so the correct theme class is present on <html>.
// Inject via a <script> tag with this string as innerHTML in the root route.
export const themeInitScript = `(function(){try{var k='glc-theme';var s=localStorage.getItem(k);var t=(s==='light'||s==='dark')?s:(window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');var r=document.documentElement;r.classList.toggle('light',t==='light');r.classList.toggle('dark',t==='dark');}catch(e){}})();`;