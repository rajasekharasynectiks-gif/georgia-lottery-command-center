import { rand } from "@/lib/rng";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell, SectionCard, Pill, StatCard } from "@/components/shell/AppShell";
import { LogIn, LogOut, FileText, DollarSign, Settings, Download, Upload, ShieldAlert, UserCog, Filter, Search, Download as DL, MapPin } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export const Route = createFileRoute("/audit")({ component: Page, head: () => ({ meta: [{ title: "Audit & Compliance Center — GLC" }] }) });

const hourly = Array.from({ length: 24 }, (_, i) => ({ h: `${i}h`, v: 400 + Math.round(rand() * 320 + Math.sin(i / 3) * 120) }));
const events = [
  { t: "14:22:07", type: "Login", who: "sarah.miller@ga.gov", ip: "72.14.201.4", geo: "Atlanta, GA", risk: "low", icon: LogIn },
  { t: "14:21:48", type: "Document Access", who: "j.chen@retailer.com", ip: "24.90.44.19", geo: "Athens, GA", risk: "low", icon: FileText },
  { t: "14:21:12", type: "Payment", who: "a-208441 · $6,250", ip: "internal", geo: "Atlanta, GA", risk: "low", icon: DollarSign },
  { t: "14:20:53", type: "Config Change", who: "admin.kane@ga.gov", ip: "10.4.12.55", geo: "HQ VPN", risk: "med", icon: Settings },
  { t: "14:20:11", type: "Permission Change", who: "admin.kane@ga.gov", ip: "10.4.12.55", geo: "HQ VPN", risk: "med", icon: UserCog },
  { t: "14:19:44", type: "Download", who: "reviewer.03", ip: "10.4.9.22", geo: "HQ VPN", risk: "low", icon: Download },
  { t: "14:19:22", type: "Upload", who: "a-208429", ip: "68.55.90.12", geo: "Savannah, GA", risk: "low", icon: Upload },
  { t: "14:18:41", type: "Failed Login (5x)", who: "unknown", ip: "185.72.14.9", geo: "Bucharest, RO", risk: "high", icon: ShieldAlert },
  { t: "14:18:04", type: "Logout", who: "sarah.miller", ip: "72.14.201.4", geo: "Atlanta, GA", risk: "low", icon: LogOut },
];

function Page() {
  return (
    <AppShell title="Audit & Compliance Center" subtitle="Immutable, signed audit trail with anomaly detection, geolocation, and export for regulators." breadcrumb={["Security", "Audit"]}
      actions={<><button className="h-9 inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 text-xs"><Filter className="size-3.5" /> Filters</button><button className="h-9 inline-flex items-center gap-2 rounded-md bg-primary px-3 text-xs font-semibold text-primary-foreground"><DL className="size-3.5" /> Export CSV</button></>}>
      <div className="grid md:grid-cols-4 gap-4">
        <StatCard label="Events (24h)" value="14,208" delta="▲ 6% vs baseline" />
        <StatCard label="Unique Users" value="1,847" delta="Across 42 states" />
        <StatCard label="High-Risk Events" value="3" tone="warn" delta="All auto-mitigated" />
        <StatCard label="Retention" value="7 years" delta="WORM · immutable" />
      </div>

      <div className="grid xl:grid-cols-[1.4fr_1fr] gap-4">
        <SectionCard title="Event Volume (last 24h)" description="Hourly aggregate across event categories">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={hourly}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="h" tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="v" fill="var(--color-primary)" radius={[3,3,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
        <SectionCard title="Anomaly Detection">
          <ul className="text-xs space-y-2">
            {[
              ["Unusual login geography","Bucharest, RO · challenged","high"],
              ["Off-hours admin activity","3 changes · 02:14 UTC","med"],
              ["Bulk download spike","Retailer 208221 · rate-limited","med"],
              ["Baseline deviation","Payment queue depth","low"],
            ].map(([t,d,r],i)=>(
              <li key={i} className="rounded-md border border-border bg-surface/60 p-2.5 flex items-start gap-2">
                <span className={"mt-1 status-dot " + (r==="high"?"text-destructive":r==="med"?"text-warning":"text-info")} />
                <div className="flex-1"><div className="font-semibold">{t}</div><div className="text-muted-foreground">{d}</div></div>
                <Pill tone={r==="high"?"danger":r==="med"?"warn":"info"}>{r}</Pill>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard title="Audit Timeline" description="Real-time stream · every action signed and tamper-evident" right={<div className="flex items-center gap-2 text-xs text-muted-foreground"><Search className="size-3.5" /><span>Search 14,208 events…</span></div>}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="text-muted-foreground border-b border-border"><tr className="text-left [&_th]:py-2 [&_th]:font-semibold [&_th]:uppercase [&_th]:tracking-wider [&_th]:text-[10px]"><th>Time</th><th>Type</th><th>Actor / Target</th><th>IP</th><th>Location</th><th>Risk</th></tr></thead>
            <tbody className="[&_tr]:border-b [&_tr]:border-border/60">
              {events.map((e,i)=>(
                <tr key={i} className="hover:bg-surface/60">
                  <td className="py-2.5 font-mono text-[11px]">{e.t}</td>
                  <td className="py-2.5"><span className="inline-flex items-center gap-2"><e.icon className="size-3.5 text-muted-foreground" />{e.type}</span></td>
                  <td className="py-2.5">{e.who}</td>
                  <td className="py-2.5 font-mono text-[11px]">{e.ip}</td>
                  <td className="py-2.5"><span className="inline-flex items-center gap-1"><MapPin className="size-3 text-muted-foreground" />{e.geo}</span></td>
                  <td className="py-2.5"><Pill tone={e.risk==="high"?"danger":e.risk==="med"?"warn":"success"}>{e.risk}</Pill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </AppShell>
  );
}