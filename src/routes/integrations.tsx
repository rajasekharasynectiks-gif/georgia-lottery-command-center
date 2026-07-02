import { rand } from "@/lib/rng";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell, SectionCard, Pill, StatCard } from "@/components/shell/AppShell";
import { Plug, Mail, ShieldCheck, FileText, CreditCard, Building2, Boxes } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/integrations")({ component: Page, head: () => ({ meta: [{ title: "Integration Monitoring - GLC" }] }) });

const partners = [
  { k: "Melissa Data", i: Building2, purpose: "Address validation", status: "healthy", latency: 128, success: 99.98 },
  { k: "MerchantOne", i: CreditCard, purpose: "Payment processing", status: "degraded", latency: 412, success: 99.32 },
  { k: "ActivePDF", i: FileText, purpose: "PDF generation", status: "healthy", latency: 220, success: 99.99 },
  { k: "Voltage", i: ShieldCheck, purpose: "Encryption / KMS", status: "healthy", latency: 34, success: 100.0 },
  { k: "SMTP Relay", i: Mail, purpose: "Email delivery", status: "healthy", latency: 72, success: 99.95 },
  { k: "Identity Provider", i: Plug, purpose: "OIDC / SAML SSO", status: "healthy", latency: 88, success: 99.99 },
  { k: "Future APIs (reserved)", i: Boxes, purpose: "Extensibility slots", status: "planned", latency: 0, success: 0 },
];

const latencyTrend = Array.from({length: 20}, (_,i)=>({ t:i, melissa: 120+Math.round(rand()*30), merchant: 380+Math.round(rand()*80), voltage: 32+Math.round(rand()*10) }));

function Page() {
  return (
    <AppShell title="Integration Monitoring" subtitle="Health, latency, and transaction success across every partner and third-party system." breadcrumb={["Operations", "Integrations"]}
      actions={<Pill tone="info">7 partner systems</Pill>}>
      <div className="grid md:grid-cols-4 gap-4">
        <StatCard label="Total Transactions (24h)" value="48,271" delta="▲ 8.2%" tone="up" />
        <StatCard label="Success Rate" value="99.87%" tone="up" delta="Target ≥ 99.5%" />
        <StatCard label="Avg Latency" value="147 ms" tone="up" delta="p95 · 380 ms" />
        <StatCard label="Retry Queue" value="4" tone="warn" delta="All within SLA" />
      </div>

      <SectionCard title="Partner Systems">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
          {partners.map(p => (
            <div key={p.k} className="rounded-md border border-border bg-surface/60 p-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-md bg-primary/10 border border-primary/20 grid place-items-center text-primary"><p.i className="size-5" /></div>
                <div className="flex-1 min-w-0"><div className="text-sm font-semibold">{p.k}</div><div className="text-[11px] text-muted-foreground">{p.purpose}</div></div>
                <Pill tone={p.status==="healthy"?"success":p.status==="degraded"?"warn":"muted"}>{p.status}</Pill>
              </div>
              {p.status !== "planned" && (
                <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
                  <div><div className="text-muted-foreground">Latency</div><div className="font-display text-base">{p.latency} ms</div></div>
                  <div><div className="text-muted-foreground">Success</div><div className="font-display text-base">{p.success}%</div></div>
                  <div><div className="text-muted-foreground">Status</div><div className="flex items-center gap-1.5 mt-0.5"><span className={"status-dot " + (p.status==="healthy"?"text-success":"text-warning")} /> Live</div></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="grid xl:grid-cols-[1.4fr_1fr] gap-4">
        <SectionCard title="Latency Trend (last hour)">
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={latencyTrend}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="t" tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Line dataKey="melissa" stroke="var(--color-primary)" strokeWidth={2} dot={false} />
                <Line dataKey="merchant" stroke="var(--color-warning)" strokeWidth={2} dot={false} />
                <Line dataKey="voltage" stroke="var(--color-success)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
        <SectionCard title="Retry & Failure Queue">
          <ul className="text-xs divide-y divide-border -my-2">
            {[
              ["MerchantOne","txn-A208441","Timeout · retry 1/3","warn"],
              ["Melissa Data","addr-lookup-99341","Success on retry","success"],
              ["SMTP","notif-71204","Delivered","success"],
              ["ActivePDF","render-A208402","Success","success"],
            ].map((r,i)=>(
              <li key={i} className="py-2.5 flex items-center gap-2">
                <span className={"status-dot " + (r[3]==="warn"?"text-warning":"text-success")} />
                <div className="flex-1"><div className="font-medium">{r[0]}</div><div className="text-[10px] text-muted-foreground font-mono">{r[1]}</div></div>
                <span className="text-[10px] text-muted-foreground">{r[2]}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </AppShell>
  );
}