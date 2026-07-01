import { createFileRoute } from "@tanstack/react-router";
import { AppShell, SectionCard, StatCard, Pill } from "@/components/shell/AppShell";
import { Cpu, MemoryStick, Network, Clock, AlertTriangle, ActivitySquare, Timer } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

export const Route = createFileRoute("/operations")({ component: Page, head: () => ({ meta: [{ title: "Monitoring & Operations — GLC" }] }) });

const cpuData = Array.from({ length: 30 }, (_, i) => ({ t: i, v: 40 + Math.round(Math.sin(i/2) * 12 + Math.random() * 10) }));
const latData = Array.from({ length: 30 }, (_, i) => ({ t: i, api: 120 + Math.round(Math.random() * 60), db: 40 + Math.round(Math.random() * 30) }));

const services = [
  ["Applicant Portal","Healthy","199 ms","99.99%","success"],
  ["API Gateway","Healthy","78 ms","99.98%","success"],
  ["Workflow Engine","Healthy","112 ms","99.97%","success"],
  ["Payment Service","Degraded","340 ms","99.82%","warn"],
  ["Notification Svc","Healthy","55 ms","99.99%","success"],
  ["Document Svc","Healthy","210 ms","99.96%","success"],
  ["SQL Primary","Healthy","12 ms","99.99%","success"],
  ["SQL Secondary","Healthy","14 ms","99.99%","success"],
  ["Object Storage","Healthy","28 ms","99.99%","success"],
  ["Audit Stream","Healthy","9 ms","99.99%","success"],
];

function Page() {
  return (
    <AppShell title="Monitoring & Operations Center" subtitle="Live health of every application, service, integration, and infrastructure component with SLA tracking and incident response." breadcrumb={["Operations", "Monitoring"]}
      actions={<><Pill tone="success"><span className="status-dot text-success pulse-live" /> Live</Pill><Pill tone="info">Region: us-east-atl</Pill></>}>
      <div className="grid md:grid-cols-4 gap-4">
        <StatCard label="Availability (30d)" value="99.98%" tone="up" icon={ActivitySquare} delta="Target 99.95%" />
        <StatCard label="Avg Response" value="128 ms" tone="up" icon={Timer} delta="▼ 12% w/w" />
        <StatCard label="Error Rate" value="0.03%" tone="up" icon={AlertTriangle} delta="Target ≤ 0.1%" />
        <StatCard label="Open Incidents" value="1" tone="warn" delta="P3 · payment latency" />
      </div>

      <div className="grid xl:grid-cols-4 gap-4">
        <SectionCard title="CPU Utilization" right={<Pill tone="success">Nominal</Pill>}>
          <div className="h-40"><Chart data={cpuData} k="v" color="var(--color-primary)" /></div>
          <div className="mt-2 flex items-center justify-between text-xs"><span className="text-muted-foreground">Cluster · 24 cores</span><span className="font-display text-lg">42%</span></div>
        </SectionCard>
        <SectionCard title="Memory" right={<Pill tone="success">Nominal</Pill>}>
          <div className="h-40"><Chart data={cpuData.map(x=>({...x, v:x.v+15}))} k="v" color="var(--color-info)" /></div>
          <div className="mt-2 flex items-center justify-between text-xs"><span className="text-muted-foreground">128 GB total</span><span className="font-display text-lg">61%</span></div>
        </SectionCard>
        <SectionCard title="Network" right={<Pill tone="success">Nominal</Pill>}>
          <div className="h-40"><Chart data={cpuData.map(x=>({...x, v:x.v-10}))} k="v" color="var(--color-success)" /></div>
          <div className="mt-2 flex items-center justify-between text-xs"><span className="text-muted-foreground">Ingress · 10 Gbps</span><span className="font-display text-lg">3.4 Gbps</span></div>
        </SectionCard>
        <SectionCard title="Storage" right={<Pill tone="success">Nominal</Pill>}>
          <div className="h-40"><Chart data={cpuData.map(x=>({...x, v:38+x.v/6}))} k="v" color="var(--color-warning)" /></div>
          <div className="mt-2 flex items-center justify-between text-xs"><span className="text-muted-foreground">28 TB provisioned</span><span className="font-display text-lg">54%</span></div>
        </SectionCard>
      </div>

      <div className="grid xl:grid-cols-[1.4fr_1fr] gap-4">
        <SectionCard title="Response Time (API vs DB)">
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={latData}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="t" tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="api" stroke="var(--color-primary)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="db" stroke="var(--color-info)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
        <SectionCard title="Queues & Jobs">
          <ul className="text-xs space-y-2">
            {[["Payment queue","24 pending","success"],["Notification queue","112 pending","success"],["Document processing","4 pending","success"],["Background jobs","2 running","info"],["Retry queue","1 waiting","warn"]].map(([k,v,t])=>(
              <li key={k} className="flex items-center justify-between rounded-md border border-border bg-surface/60 px-3 py-2"><span>{k}</span><Pill tone={t as any}>{v}</Pill></li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <div className="grid xl:grid-cols-[1.4fr_1fr] gap-4">
        <SectionCard title="Service Availability & SLA">
          <table className="w-full text-xs">
            <thead className="text-muted-foreground border-b border-border"><tr className="text-left [&_th]:py-2"><th>Service</th><th>Status</th><th>Response</th><th>SLA (30d)</th></tr></thead>
            <tbody className="[&_tr]:border-b [&_tr]:border-border/60">
              {services.map((s,i)=>(
                <tr key={i} className="hover:bg-surface/60">
                  <td className="py-2.5 font-medium">{s[0]}</td>
                  <td className="py-2.5"><Pill tone={s[4] as any}>{s[1]}</Pill></td>
                  <td className="py-2.5 font-mono text-[11px]">{s[2]}</td>
                  <td className="py-2.5">{s[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </SectionCard>
        <SectionCard title="Alert Center" right={<Pill tone="info">Last 24h</Pill>}>
          <ul className="text-xs space-y-2">
            {[
              ["P3","Payment gateway p95 latency 340ms","Acknowledged","warn"],
              ["P4","Backup job duration +12%","Auto-resolved","success"],
              ["INFO","Deploy glc-web v5.0.1","Success","info"],
              ["INFO","Certificate renewal complete","Success","info"],
            ].map(([s,t,r,tn],i)=>(
              <li key={i} className="rounded-md border border-border bg-surface/60 p-2.5"><div className="flex items-center justify-between"><Pill tone={tn as any}>{s}</Pill><span className="text-[10px] text-muted-foreground">{r}</span></div><div className="mt-1">{t}</div></li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </AppShell>
  );
}

function Chart({ data, k, color }: any) {
  return (
    <ResponsiveContainer>
      <AreaChart data={data}>
        <defs><linearGradient id={"g-"+color} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity={0.5} /><stop offset="100%" stopColor={color} stopOpacity={0} /></linearGradient></defs>
        <XAxis hide dataKey="t" /><YAxis hide />
        <Area dataKey={k} stroke={color} fill={`url(#g-${color})`} strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}