import { rand } from "@/lib/rng";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell, StatCard, SectionCard, Pill } from "@/components/shell/AppShell";
import { Activity, ShieldCheck, Users, DollarSign, Rocket, Server, TrendingUp, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

const volume = Array.from({ length: 24 }, (_, i) => ({
  h: `${i}:00`,
  apps: 40 + Math.round(Math.sin(i / 3) * 20 + rand() * 18 + i * 1.5),
  payments: 30 + Math.round(Math.cos(i / 3.5) * 15 + rand() * 14 + i * 1.1),
}));

const revenueBars = [
  { m: "Jan", v: 1.8 }, { m: "Feb", v: 2.1 }, { m: "Mar", v: 2.4 },
  { m: "Apr", v: 2.2 }, { m: "May", v: 2.7 }, { m: "Jun", v: 3.1 },
  { m: "Jul", v: 3.4 }, { m: "Aug", v: 3.6 }, { m: "Sep", v: 3.9 },
];

function Index() {
  return (
    <AppShell
      title="Enterprise Command Center"
      subtitle="Unified view of the Georgia Lottery Retailer Licensing Platform — architecture, security posture, operations, and business KPIs."
      breadcrumb={["Overview"]}
      actions={
        <>
          <Pill tone="success"><span className="status-dot text-success" /> All systems operational</Pill>
          <Link to="/presentation" className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-3 text-xs font-semibold text-primary-foreground hover:brightness-105">
            <Rocket className="size-3.5" /> Enter Presentation
          </Link>
        </>
      }
    >
      {/* Hero band */}
      <section className="relative overflow-hidden panel">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="absolute -top-24 -right-16 size-72 rounded-full blur-3xl bg-primary/20" />
        <div className="relative p-8 grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Pill tone="primary">Phase 5</Pill>
              <Pill tone="info">RFP FINAL REVIEW</Pill>
              <Pill>v5.0.1 · build #48213</Pill>
            </div>
            <h2 className="text-4xl font-display font-semibold tracking-tight leading-tight">
              A <span className="text-gradient-gold">modern, secure, cloud‑ready</span> licensing platform for the State of Georgia.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-2xl">
              Enterprise architecture with zero‑trust boundaries, Voltage field‑level encryption, Veracode‑verified pipelines, and 99.98% availability across primary and secondary data centers.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link to="/architecture" className="h-9 inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 text-xs font-medium hover:bg-surface-2">View Architecture</Link>
              <Link to="/security" className="h-9 inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 text-xs font-medium hover:bg-surface-2">Security Posture</Link>
              <Link to="/executive" className="h-9 inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 text-xs font-medium hover:bg-surface-2">Executive Report</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MiniStat label="Availability (30d)" value="99.98%" tone="success" />
            <MiniStat label="Security Score" value="A+" tone="success" />
            <MiniStat label="Avg Process Time" value="4.2d" tone="neutral" />
            <MiniStat label="Open Criticals" value="0" tone="success" />
          </div>
        </div>
      </section>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Applications Submitted" value="18,427" delta="▲ 12.4% vs last quarter" tone="up" icon={Users} />
        <StatCard label="Approved Retailers" value="14,902" delta="▲ 8.1% YoY" tone="up" icon={CheckCircle2} />
        <StatCard label="Revenue Processed" value="$27.6M" delta="▲ 15.3% YoY" tone="up" icon={DollarSign} />
        <StatCard label="Avg Turnaround" value="4.2 days" delta="▼ 32% vs legacy" tone="up" icon={Clock} />
      </div>

      <div className="grid xl:grid-cols-3 gap-4">
        <SectionCard title="Platform Throughput — Last 24h" description="Applications submitted and payments processed per hour" right={<Pill tone="info">Live</Pill>}>
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={volume}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.5} /><stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} /></linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.4} /><stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="h" tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Area dataKey="apps" stroke="var(--color-primary)" fill="url(#g1)" strokeWidth={2} />
                <Area dataKey="payments" stroke="var(--color-accent)" fill="url(#g2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
        <SectionCard title="Monthly Revenue" description="Recognized YTD ($M)">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={revenueBars}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="m" tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="v" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
        <SectionCard title="Composite Health Score" description="Rolling 7-day operational index">
          <div className="h-64">
            <ResponsiveContainer>
              <RadialBarChart innerRadius="60%" outerRadius="100%" data={[{ name: "Health", value: 97, fill: "var(--color-primary)" }]} startAngle={90} endAngle={-270}>
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar background={{ fill: "var(--color-muted)" } as any} dataKey="value" cornerRadius={30} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="-mt-40 text-center">
              <div className="text-4xl font-display font-semibold text-gradient-gold">97</div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Excellent</div>
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <SectionCard title="Live Activity" description="Recent platform events" right={<Pill tone="info"><span className="status-dot text-info pulse-live" /> Streaming</Pill>}>
          <ul className="text-sm divide-y divide-border -my-2">
            {[
              { i: CheckCircle2, t: "Retailer application #A-208441 approved", meta: "Compliance · 12s ago", tone: "text-success" },
              { i: ShieldCheck, t: "Voltage encryption key rotated — HSM cluster GA-01", meta: "Security · 2m ago", tone: "text-info" },
              { i: Server, t: "Melissa Data integration latency normalized to 128ms", meta: "Ops · 4m ago", tone: "text-muted-foreground" },
              { i: AlertTriangle, t: "Rate-limit warning cleared on Payment Gateway", meta: "Ops · 11m ago", tone: "text-warning" },
              { i: Activity, t: "Deployment glc-web v5.0.1 promoted to Production", meta: "DevOps · 22m ago", tone: "text-primary" },
              { i: Users, t: "38 new applicants registered", meta: "Business · 41m ago", tone: "text-muted-foreground" },
            ].map((r, i) => (
              <li key={i} className="py-3 flex items-center gap-3">
                <r.i className={"size-4 " + r.tone} />
                <span className="flex-1 truncate">{r.t}</span>
                <span className="text-[11px] text-muted-foreground">{r.meta}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
        <SectionCard title="Compliance & Certifications">
          <div className="grid grid-cols-2 gap-3">
            {[
              ["SOC 2 Type II", "Passed · 2025-08-14"],
              ["FedRAMP Moderate", "Ready · In Review"],
              ["PCI DSS v4.0", "Compliant"],
              ["NIST 800-53", "Aligned · Rev 5"],
              ["WCAG 2.1 AA", "Verified"],
              ["HIPAA-Ready", "Where applicable"],
              ["StateRAMP", "In Progress"],
              ["ISO 27001", "Certified"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-md border border-border bg-surface/60 p-3">
                <div className="text-xs font-semibold">{k}</div>
                <div className="text-[11px] text-muted-foreground mt-1">{v}</div>
                <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden"><div className="h-full bg-success" style={{ width: `${75 + ((k.length * 3) % 25)}%` }} /></div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}

function MiniStat({ label, value, tone }: { label: string; value: string; tone: "up" | "down" | "neutral" | "warn" | "success" }) {
  const t = tone === "success" ? "text-success" : tone === "warn" ? "text-warning" : "text-foreground";
  return (
    <div className="rounded-lg border border-border bg-surface/70 backdrop-blur p-4">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className={"mt-1 text-2xl font-display font-semibold " + t}>{value}</div>
    </div>
  );
}
