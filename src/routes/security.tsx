import { rand } from "@/lib/rng";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell, SectionCard, StatCard, Pill } from "@/components/shell/AppShell";
import { ShieldCheck, Fingerprint, KeySquare, UserCog, Clock4, KeyRound, Lock, Award, ScrollText, ShieldAlert, Radar, BellRing, Gauge, CheckCircle2 } from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/security")({ component: Page, head: () => ({ meta: [{ title: "Security Architecture - GLC" }] }) });

const controls = [
  { k: "Authentication", i: Fingerprint, s: "OIDC · SAML 2.0", v: "Active" },
  { k: "Authorization", i: KeySquare, s: "Attribute-based (ABAC)", v: "Enforced" },
  { k: "RBAC", i: UserCog, s: "23 roles · 148 permissions", v: "Active" },
  { k: "MFA", i: ShieldCheck, s: "TOTP · WebAuthn · SMS fallback", v: "Required" },
  { k: "Session Management", i: Clock4, s: "15m idle · rotating tokens", v: "Active" },
  { k: "Encryption", i: Lock, s: "AES-256 · TLS 1.3 · FIPS 140-2", v: "Enforced" },
  { k: "Secrets Management", i: KeyRound, s: "HashiCorp Vault · HSM-backed", v: "Rotated 24h" },
  { k: "Certificate Management", i: Award, s: "ACME · auto-renew · 90d", v: "Healthy" },
  { k: "Audit Logging", i: ScrollText, s: "Immutable · WORM · 7y retention", v: "Streaming" },
  { k: "API Security", i: ShieldAlert, s: "OAuth2 · JWT · Rate-limited", v: "Protected" },
];

const trend = Array.from({ length: 14 }, (_, i) => ({ d: `D${i+1}`, events: 20 + Math.round(rand() * 40 + Math.sin(i) * 10), blocked: 15 + Math.round(rand() * 30) }));

function Page() {
  return (
    <AppShell title="Security Architecture" subtitle="Zero-trust controls, continuous monitoring, and enterprise-grade identity, authorization, and encryption." breadcrumb={["Security", "Architecture"]}
      actions={<><Pill tone="success"><CheckCircle2 className="size-3" /> Security Score A+</Pill><Pill tone="info">Zero-Trust</Pill></>}>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Security Score" value="97 / A+" tone="up" icon={Gauge} delta="▲ 4 pts this quarter" />
        <StatCard label="Active Threats" value="0" tone="up" icon={Radar} delta="Nothing critical" />
        <StatCard label="MFA Adoption" value="99.2%" tone="up" icon={Fingerprint} delta="Enforced org-wide" />
        <StatCard label="Mean Detect Time" value="42s" tone="up" icon={BellRing} delta="▼ 68% YoY" />
      </div>

      <div className="grid xl:grid-cols-[1.4fr_1fr] gap-4">
        <SectionCard title="Security Controls" description="Core enterprise safeguards, continuously validated">
          <div className="grid md:grid-cols-2 gap-3">
            {controls.map((c) => (
              <div key={c.k} className="rounded-md border border-border bg-surface/60 p-3 flex items-start gap-3">
                <div className="size-9 rounded-md bg-primary/10 border border-primary/20 grid place-items-center text-primary"><c.i className="size-4" /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between"><div className="text-sm font-semibold">{c.k}</div><Pill tone="success">{c.v}</Pill></div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{c.s}</div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <div className="space-y-4">
          <SectionCard title="Composite Security Score" description="Rolling 30-day">
            <div className="h-48 relative">
              <ResponsiveContainer>
                <RadialBarChart innerRadius="60%" outerRadius="100%" data={[{ v: 97, fill: "var(--color-primary)" }]} startAngle={90} endAngle={-270}>
                  <PolarAngleAxis type="number" domain={[0,100]} tick={false} />
                  <RadialBar dataKey="v" cornerRadius={20} background={{ fill: "var(--color-muted)" } as any} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 grid place-items-center"><div className="text-center"><div className="text-4xl font-display font-semibold text-gradient-gold">97</div><div className="text-[10px] uppercase tracking-widest text-muted-foreground">A+ · Excellent</div></div></div>
            </div>
          </SectionCard>
          <SectionCard title="Compliance Status">
            <ul className="text-xs space-y-1.5">
              {[["SOC 2 Type II","Passed"],["NIST 800-53 r5","Aligned"],["PCI DSS 4.0","Compliant"],["FedRAMP Mod","In Review"],["StateRAMP","In Progress"],["CJIS","Aligned"]].map(([k,v])=>(
                <li key={k} className="flex items-center justify-between rounded-md border border-border bg-surface/60 px-3 py-2"><span>{k}</span><Pill tone={v==="Passed"||v==="Compliant"||v==="Aligned"?"success":"warn"}>{v}</Pill></li>
              ))}
            </ul>
          </SectionCard>
        </div>
      </div>

      <div className="grid xl:grid-cols-[1.4fr_1fr] gap-4">
        <SectionCard title="Threat Detection · Events vs Blocked (14d)">
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={trend}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="d" tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="events" stroke="var(--color-warning)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="blocked" stroke="var(--color-success)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
        <SectionCard title="Security Alerts" right={<Pill tone="info">Last 24h</Pill>}>
          <ul className="text-xs divide-y divide-border -my-2">
            {[
              ["Unusual login from new geography - auto-challenged","3m ago","warn"],
              ["Anomalous document download rate - rate-limited","28m ago","warn"],
              ["JWT rotation completed for auth-service","1h ago","info"],
              ["Vulnerability scan complete - 0 critical","4h ago","success"],
            ].map(([t,w,tone],i)=>(
              <li key={i} className="py-2.5 flex items-start gap-2">
                <span className={"mt-1 status-dot " + (tone==="success"?"text-success":tone==="warn"?"text-warning":"text-info")} />
                <span className="flex-1">{t}</span>
                <span className="text-[10px] text-muted-foreground shrink-0">{w}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </AppShell>
  );
}