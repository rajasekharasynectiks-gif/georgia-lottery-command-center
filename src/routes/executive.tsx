import { createFileRoute } from "@tanstack/react-router";
import { AppShell, SectionCard, StatCard, Pill } from "@/components/shell/AppShell";
import { Users, DollarSign, CheckCircle2, Clock, ShieldCheck, TrendingUp } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";

export const Route = createFileRoute("/executive")({ component: Page, head: () => ({ meta: [{ title: "Executive Reporting — GLC" }] }) });

const _seed = [37, 112, 55, 168, 90, 22, 143, 78, 132, 45, 160, 100];
const _seed2 = [0.83, 0.86, 0.85, 0.84, 0.87, 0.83, 0.85, 0.86, 0.84, 0.87, 0.85, 0.86];
const submitted = Array.from({length:12},(_,i)=>({m:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i], v: 1200+i*140+_seed[i]}));
const approvals = submitted.map((s,i)=>({...s, approved: Math.round(s.v*_seed2[i])}));
const composition = [
  { name: "Convenience", value: 42, fill: "var(--color-primary)" },
  { name: "Grocery", value: 24, fill: "var(--color-accent)" },
  { name: "Restaurant/Bar", value: 18, fill: "var(--color-success)" },
  { name: "Big-box", value: 10, fill: "var(--color-warning)" },
  { name: "Other", value: 6, fill: "var(--color-info)" },
];
const _seed3 = [0.05, 0.12, 0.08, 0.15, 0.10, 0.18, 0.07, 0.14, 0.11, 0.16, 0.09, 0.13];
const revenueTrend = Array.from({length:12},(_,i)=>({m: submitted[i].m, r: +(1.6+i*0.18+_seed3[i]).toFixed(2)}));

function Page() {
  return (
    <AppShell title="Executive Reporting Dashboard" subtitle="Business, operational, security, and financial KPIs — one glance for the executive committee." breadcrumb={["Overview", "Executive"]}
      actions={<><Pill tone="primary">Fiscal 2026 · YTD</Pill><Pill tone="info">Auto-refresh · 5 min</Pill></>}>
      <div className="grid md:grid-cols-4 gap-4">
        <StatCard label="Applications Submitted" value="18,427" tone="up" icon={Users} delta="▲ 12.4% YoY" />
        <StatCard label="Applications Completed" value="14,902" tone="up" icon={CheckCircle2} delta="Approval 81%" />
        <StatCard label="Revenue Processed" value="$27.6M" tone="up" icon={DollarSign} delta="▲ 15.3% YoY" />
        <StatCard label="Avg Processing" value="4.2 days" tone="up" icon={Clock} delta="▼ 32% vs legacy" />
      </div>

      <div className="grid xl:grid-cols-[1.4fr_1fr] gap-4">
        <SectionCard title="Application Submissions vs Approvals (12mo)">
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={approvals}>
                <defs>
                  <linearGradient id="es1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.5} /><stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} /></linearGradient>
                  <linearGradient id="es2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-success)" stopOpacity={0.4} /><stop offset="100%" stopColor="var(--color-success)" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="m" tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Area dataKey="v" name="Submitted" stroke="var(--color-primary)" fill="url(#es1)" strokeWidth={2} />
                <Area dataKey="approved" name="Approved" stroke="var(--color-success)" fill="url(#es2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
        <SectionCard title="Retailer Composition">
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={composition} innerRadius={60} outerRadius={95} dataKey="value" paddingAngle={2}>
                  {composition.map((c,i)=>(<Cell key={i} fill={c.fill} />))}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <div className="grid xl:grid-cols-[1fr_1fr_1fr] gap-4">
        <SectionCard title="Revenue Trajectory ($M)">
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={revenueTrend}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="m" tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="r" fill="var(--color-primary)" radius={[3,3,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
        <SectionCard title="User Adoption (MAU)">
          <div className="h-56">
            <ResponsiveContainer>
              <LineChart data={submitted.map(x=>({...x, u: x.v*0.6}))}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="m" tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Line dataKey="u" stroke="var(--color-accent)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
        <SectionCard title="Strategic Scorecards">
          <ul className="text-xs space-y-2">
            {[["Security Score","A+ · 97","success",<ShieldCheck className="size-3.5" key="1" />],["Compliance Score","96 / 100","success",<CheckCircle2 className="size-3.5" key="2" />],["Operational Health","98 / 100","success",<TrendingUp className="size-3.5" key="3" />],["Financial KPI","+15.3% YoY","success",<DollarSign className="size-3.5" key="4" />],["Customer Sat","4.8 / 5","success",<Users className="size-3.5" key="5" />]].map((r,i)=>(
              <li key={i} className="flex items-center gap-2 rounded-md border border-border bg-surface/60 px-3 py-2">
                <span className="text-primary">{r[3]}</span><span className="flex-1">{r[0]}</span><span className="font-display">{r[1]}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard title="Forecast & Trend Analysis" description="Next 4 quarters">
        <div className="grid md:grid-cols-4 gap-3">
          {[["Q1 2026","Applications","+8.5%","success"],["Q2 2026","Revenue","+11.2%","success"],["Q3 2026","New Retailers","+6.4%","success"],["Q4 2026","Processing time","-14%","success"]].map((r,i)=>(
            <div key={i} className="rounded-md border border-border bg-surface/60 p-4"><div className="text-[10px] uppercase tracking-widest text-muted-foreground">{r[0]}</div><div className="mt-1 text-sm font-semibold">{r[1]}</div><div className="mt-2 text-2xl font-display font-semibold text-gradient-gold">{r[2]}</div><Pill tone={r[3] as any}>Forecast</Pill></div>
          ))}
        </div>
      </SectionCard>
    </AppShell>
  );
}