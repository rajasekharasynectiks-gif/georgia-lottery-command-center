import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  LayoutDashboard, Network, GitBranch, KeyRound, Plug, ServerCog,
  Search, ChevronRight, Circle, PanelLeftClose, PanelLeftOpen, Printer,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const nav = [
  { group: "Solution Architecture", items: [
    { to: "/", label: "Overview", icon: LayoutDashboard },
    { to: "/architecture", label: "System Topology", icon: Network },
    { to: "/workflow", label: "Application Workflow", icon: GitBranch },
    { to: "/integrations", label: "Integration Architecture", icon: Plug },
    { to: "/encryption", label: "Data Protection", icon: KeyRound },
    { to: "/disaster-recovery", label: "Resilience & DR", icon: ServerCog },
  ]},
];

export function AppShell({ children, title, subtitle, breadcrumb, actions }: {
  children: ReactNode; title: string; subtitle?: string; breadcrumb?: string[]; actions?: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setCollapsed(localStorage.getItem("glc-command-sidebar-collapsed") === "true");
  }, []);

  function toggleCollapsed() {
    setCollapsed((current) => {
      const next = !current;
      localStorage.setItem("glc-command-sidebar-collapsed", String(next));
      return next;
    });
  }

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <aside className={["app-sidebar hidden lg:flex flex-col border-r border-sidebar-border bg-sidebar sticky top-0 h-screen transition-[width] duration-200", collapsed ? "w-16" : "w-64"].join(" ")}>
        <div className="h-16 flex items-center gap-3 px-3 border-b border-sidebar-border">
          <div className="size-9 shrink-0 rounded-md bg-gradient-to-br from-primary to-primary-hover grid place-items-center text-primary-foreground font-display font-bold shadow-[var(--shadow-glow)]">GL</div>
          <div className={["leading-tight min-w-0", collapsed ? "hidden" : ""].join(" ")}>
            <div className="text-[13px] font-semibold tracking-wide text-sidebar-foreground">Georgia Lottery</div>
            <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Solution Architecture</div>
          </div>
          <button
            type="button"
            onClick={toggleCollapsed}
            className="ml-auto grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
            title={collapsed ? "Expand navigation" : "Collapse navigation"}
          >
            {collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
          </button>
        </div>
        <nav className={["flex-1 overflow-y-auto py-4 space-y-6", collapsed ? "px-2" : "px-3"].join(" ")}>
          {nav.map((g) => (
            <div key={g.group}>
              <div className={["px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/80", collapsed ? "hidden" : ""].join(" ")}>{g.group}</div>
              <ul className="space-y-0.5">
                {g.items.map((it) => {
                  const active = pathname === it.to || (it.to !== "/" && pathname.startsWith(it.to));
                  const Icon = it.icon;
                  return (
                    <li key={it.to}>
                      <Link
                        to={it.to}
                        title={collapsed ? it.label : undefined}
                        className={[
                          "group flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors",
                          collapsed ? "justify-center" : "",
                          active ? "bg-sidebar-accent text-primary" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground",
                        ].join(" ")}
                      >
                        <Icon className={"size-4 " + (active ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                        <span className={["flex-1 truncate", collapsed ? "hidden" : ""].join(" ")}>{it.label}</span>
                        {active && <span className={["size-1.5 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]", collapsed ? "hidden" : ""].join(" ")} />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
        <div className={["px-4 py-3 border-t border-sidebar-border text-[11px] text-muted-foreground", collapsed ? "px-2" : ""].join(" ")}>
          <div className={["flex items-center gap-2", collapsed ? "justify-center" : ""].join(" ")}>
            <span className="status-dot text-success" />
            <span className={collapsed ? "hidden" : ""}>RFA Submission · v5.0</span>
          </div>
          <div className={["mt-1 font-mono text-[10px] opacity-60", collapsed ? "hidden" : ""].join(" ")}>doc: GLC-SA-2026-11-15</div>
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="app-topbar h-16 border-b border-border bg-surface/60 backdrop-blur sticky top-0 z-30">
          <div className="h-full flex items-center gap-4 px-6">
            <div className="hidden md:flex items-center gap-1 text-xs text-muted-foreground">
              <span>GLC</span>
              <ChevronRight className="size-3" />
              <span>Solution Architecture</span>
              {breadcrumb?.map((b, i) => (
                <span key={i} className="flex items-center gap-1">
                  <ChevronRight className="size-3" />
                  <span className={i === (breadcrumb.length - 1) ? "text-foreground" : ""}>{b}</span>
                </span>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 h-9 w-72 rounded-md border border-border bg-input/40 px-3 text-xs text-muted-foreground">
                <Search className="size-3.5" />
                <span>Search components, integrations, controls...</span>
                <span className="ml-auto font-mono text-[10px] opacity-70">K</span>
              </div>
              <Link
                to="/print"
                className="hidden md:inline-flex h-9 items-center gap-2 rounded-md border border-primary/40 bg-primary/10 px-3 text-xs font-semibold text-primary hover:bg-primary/15"
                title="Print / export to PDF"
              >
                <Printer className="size-3.5" /> Print / PDF
              </Link>
              <ThemeToggle />
              <div className="flex items-center gap-2 pl-3 border-l border-border">
                <div className="size-8 rounded-full bg-gradient-to-br from-accent to-primary grid place-items-center text-[11px] font-semibold text-primary-foreground">JR</div>
                <div className="hidden md:block leading-tight">
                  <div className="text-xs font-semibold">J. Reynolds</div>
                  <div className="text-[10px] text-muted-foreground">Program Director</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="app-page-header px-6 pt-6 pb-3 border-b border-border bg-gradient-to-b from-surface/40 to-transparent">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
              {subtitle && <p className="text-sm text-muted-foreground mt-1 max-w-3xl">{subtitle}</p>}
            </div>
            {actions && <div className="flex items-center gap-2">{actions}</div>}
          </div>
        </div>

        <main className="flex-1 min-w-0 p-6 space-y-6">{children}</main>

        <footer className="app-footer border-t border-border py-3 px-6 text-[11px] text-muted-foreground flex flex-wrap gap-4 justify-between">
          <span>Georgia Lottery Corporation · Retailer Licensing Platform · Solution Architecture v5.0</span>
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1.5"><Circle className="size-2 fill-success text-success" /> SOC 2 Type II</span>
            <span className="flex items-center gap-1.5"><Circle className="size-2 fill-success text-success" /> WCAG 2.1 AA</span>
            <span className="flex items-center gap-1.5"><Circle className="size-2 fill-success text-success" /> FedRAMP Ready</span>
          </span>
        </footer>
      </div>
    </div>
  );
}

export function StatCard({ label, value, delta, tone = "neutral", icon: Icon, hint }: {
  label: string; value: string; delta?: string; tone?: "up" | "down" | "neutral" | "warn"; icon?: any; hint?: string;
}) {
  const toneCls = tone === "up" ? "text-success" : tone === "down" ? "text-destructive" : tone === "warn" ? "text-warning" : "text-muted-foreground";
  return (
    <div className="panel p-5">
      <div className="flex items-start justify-between">
        <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{label}</div>
        {Icon && <Icon className="size-4 text-muted-foreground" />}
      </div>
      <div className="mt-3 text-3xl font-display font-semibold tracking-tight">{value}</div>
      <div className={"mt-1 text-xs " + toneCls}>{delta ?? hint}</div>
    </div>
  );
}

export function SectionCard({ title, description, children, right }: { title: string; description?: string; children: ReactNode; right?: ReactNode }) {
  return (
    <section className="panel">
      <header className="flex items-center justify-between gap-4 p-5 border-b border-border">
        <div>
          <h2 className="text-sm font-semibold tracking-wide uppercase text-foreground/90">{title}</h2>
          {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        </div>
        {right}
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}

export function Pill({ children, tone = "muted" }: { children: ReactNode; tone?: "muted" | "success" | "warn" | "danger" | "info" | "primary" }) {
  const map: Record<string, string> = {
    muted: "bg-muted text-muted-foreground border-border",
    success: "bg-success/15 text-success border-success/30",
    warn: "bg-warning/15 text-warning border-warning/30",
    danger: "bg-destructive/15 text-destructive border-destructive/30",
    info: "bg-info/15 text-info border-info/30",
    primary: "bg-primary/15 text-primary border-primary/30",
  };
  return <span className={"inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10.5px] font-medium uppercase tracking-wider " + map[tone]}>{children}</span>;
}
