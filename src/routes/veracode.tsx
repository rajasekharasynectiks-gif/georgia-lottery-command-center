import { createFileRoute } from "@tanstack/react-router";
import { AppShell, SectionCard, Pill, StatCard } from "@/components/shell/AppShell";
import { FileCode2, Bug, Package, Container, Cable, ShieldCheck, TrendingDown } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from "recharts";

export const Route = createFileRoute("/veracode")({ component: Page, head: () => ({ meta: [{ title: "Veracode Compliance - GLC" }] }) });

const scans = [
  { k: "Static Analysis (SAST)", i: FileCode2, last: "12m ago", cov: "98%", tone: "success" },
  { k: "Dynamic Analysis (DAST)", i: Bug, last: "1h ago", cov: "100%", tone: "success" },
  { k: "Dependency Scan (SCA)", i: Package, last: "8m ago", cov: "342 pkgs", tone: "success" },
  { k: "Container Scan", i: Container, last: "24m ago", cov: "18 images", tone: "success" },
  { k: "API Scan", i: Cable, last: "2h ago", cov: "94 endpoints", tone: "success" },
];

const trend = Array.from({ length: 12 }, (_, i) => ({ m: `W${i+1}`, critical: Math.max(0, 6 - i), high: Math.max(0, 14 - i), medium: 22 - i, low: 30 - i }));
const remediation = [{ n: "SLA-met", v: 96 },{ n: "In-progress", v: 3 },{ n: "Overdue", v: 1 }];

function Page() {
  return (
    <AppShell title="Veracode Compliance Dashboard" subtitle="Continuous SAST, DAST, SCA, container and API scanning integrated into every pipeline." breadcrumb={["Security", "Veracode"]}
      actions={<><Pill tone="success">Veracode Verified</Pill><Pill tone="primary">Policy: Enterprise</Pill></>}>
      <div className="grid md:grid-cols-4 gap-4">
        <StatCard label="Compliance Score" value="A+ · 96" tone="up" icon={ShieldCheck} delta="Passing all gates" />
        <StatCard label="Critical Issues" value="0" tone="up" icon={Bug} delta="7 fixed this sprint" />
        <StatCard label="High Issues" value="2" tone="up" icon={TrendingDown} delta="Both in remediation" />
        <StatCard label="Remediation SLA" value="96%" tone="up" delta="Target ≥ 95%" />
      </div>

      <SectionCard title="Scan Coverage" description="All quality and security gates required for production release">
        <div className="grid md:grid-cols-5 gap-3">
          {scans.map(s => (
            <div key={s.k} className="rounded-md border border-border bg-surface/60 p-3">
              <div className="flex items-center gap-2"><s.i className="size-4 text-primary" /><div className="text-xs font-semibold">{s.k}</div></div>
              <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground"><span>Last: {s.last}</span><Pill tone="success">{s.cov}</Pill></div>
              <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden"><div className="h-full bg-success" style={{ width: "96%" }} /></div>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="grid xl:grid-cols-[1.4fr_1fr] gap-4">
        <SectionCard title="Vulnerability Trend (12 weeks)" description="Downward trajectory across all severities">
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={trend}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="m" tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Area stackId="1" dataKey="critical" stroke="var(--color-critical)" fill="var(--color-critical)" fillOpacity={0.4} />
                <Area stackId="1" dataKey="high" stroke="var(--color-destructive)" fill="var(--color-destructive)" fillOpacity={0.3} />
                <Area stackId="1" dataKey="medium" stroke="var(--color-warning)" fill="var(--color-warning)" fillOpacity={0.3} />
                <Area stackId="1" dataKey="low" stroke="var(--color-info)" fill="var(--color-info)" fillOpacity={0.25} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
        <SectionCard title="Remediation Status">
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={remediation} layout="vertical">
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="n" tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="v" fill="var(--color-primary)" radius={[0,4,4,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Executive Summary" description="For Security Review Committee">
        <div className="grid md:grid-cols-3 gap-3 text-sm">
          <div className="rounded-md border border-success/30 bg-success/5 p-4"><Pill tone="success">Approved</Pill><div className="mt-2 font-semibold">Production Release</div><div className="text-xs text-muted-foreground mt-1">All gates passed · zero criticals · policy compliant</div></div>
          <div className="rounded-md border border-border bg-surface/60 p-4"><div className="text-xs text-muted-foreground">Median time to remediate</div><div className="mt-1 text-2xl font-display font-semibold">2.4 days</div><div className="text-[11px] text-muted-foreground mt-1">▼ 41% YoY</div></div>
          <div className="rounded-md border border-border bg-surface/60 p-4"><div className="text-xs text-muted-foreground">Policy compliance</div><div className="mt-1 text-2xl font-display font-semibold">100%</div><div className="text-[11px] text-muted-foreground mt-1">Veracode Enterprise policy · SLA-driven</div></div>
        </div>
      </SectionCard>
    </AppShell>
  );
}