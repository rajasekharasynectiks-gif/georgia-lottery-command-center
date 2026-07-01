import { createFileRoute } from "@tanstack/react-router";
import { AppShell, SectionCard, StatCard, Pill } from "@/components/shell/AppShell";
import { LifeBuoy, Ticket, PhoneCall, MessageSquare, Wrench, CalendarClock, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/support")({ component: Page, head: () => ({ meta: [{ title: "Warranty & Support — GLC" }] }) });

function Page() {
  return (
    <AppShell title="Warranty & Support Portal" subtitle="Enterprise support plans, SLA-tracked tickets, escalation, planned maintenance, and 24×7 coverage." breadcrumb={["Support", "Warranty"]}
      actions={<><Pill tone="primary">Platinum Plan</Pill><Pill tone="success">24×7×365</Pill></>}>
      <div className="grid md:grid-cols-4 gap-4">
        <StatCard label="Open Tickets" value="7" tone="warn" icon={Ticket} delta="2 P2 · 5 P3" />
        <StatCard label="Closed (30d)" value="248" tone="up" icon={ShieldCheck} delta="98% within SLA" />
        <StatCard label="Avg Response" value="14 min" tone="up" delta="P1 target ≤ 30 min" />
        <StatCard label="CSAT" value="4.8 / 5" tone="up" delta="Last 90 days" />
      </div>

      <div className="grid xl:grid-cols-[1.4fr_1fr] gap-4">
        <SectionCard title="Support Plans & Warranty">
          <table className="w-full text-xs">
            <thead className="text-muted-foreground border-b border-border"><tr className="text-left [&_th]:py-2"><th>Tier</th><th>Coverage</th><th>Response</th><th>Included</th></tr></thead>
            <tbody className="[&_tr]:border-b [&_tr]:border-border/60">
              {[
                ["Platinum","24×7×365","P1: 15 min","On-site TAM · unlimited"],
                ["Gold","24×5","P1: 30 min","Named TAM"],
                ["Silver","Business hrs","P1: 1 h","Shared queue"],
                ["Warranty","1 yr defects","N/A","Included w/ delivery"],
              ].map(r=>(<tr key={r[0]}><td className="py-2.5 font-semibold">{r[0]}</td><td>{r[1]}</td><td className="font-mono text-[11px]">{r[2]}</td><td className="text-muted-foreground">{r[3]}</td></tr>))}
            </tbody>
          </table>
        </SectionCard>
        <SectionCard title="Contact Support">
          <div className="space-y-2 text-xs">
            <a className="flex items-center gap-3 rounded-md border border-border bg-surface/60 p-3 hover:bg-surface-2"><PhoneCall className="size-4 text-primary" /><div className="flex-1"><div className="font-semibold">Priority Hotline</div><div className="text-muted-foreground">1-800-GLC-SUPPORT · 24×7</div></div></a>
            <a className="flex items-center gap-3 rounded-md border border-border bg-surface/60 p-3 hover:bg-surface-2"><MessageSquare className="size-4 text-primary" /><div className="flex-1"><div className="font-semibold">Live Chat</div><div className="text-muted-foreground">Avg wait: 42s · L2 engineers</div></div></a>
            <a className="flex items-center gap-3 rounded-md border border-border bg-surface/60 p-3 hover:bg-surface-2"><Ticket className="size-4 text-primary" /><div className="flex-1"><div className="font-semibold">Submit Ticket</div><div className="text-muted-foreground">Portal · Slack Connect · Teams</div></div></a>
          </div>
        </SectionCard>
      </div>

      <div className="grid xl:grid-cols-[1.4fr_1fr] gap-4">
        <SectionCard title="Open Tickets & Escalations">
          <table className="w-full text-xs">
            <thead className="text-muted-foreground border-b border-border"><tr className="text-left [&_th]:py-2"><th>ID</th><th>Subject</th><th>Priority</th><th>Owner</th><th>Age</th><th>SLA</th></tr></thead>
            <tbody className="[&_tr]:border-b [&_tr]:border-border/60">
              {[
                ["INC-48221","Payment latency at MerchantOne","P2","T. Nguyen","2h 14m","On track","success"],
                ["INC-48219","Report export edge case","P3","M. Alvarez","1d 3h","On track","success"],
                ["INC-48214","MFA re-enrollment workflow","P3","R. Kim","6h","At risk","warn"],
                ["INC-48210","Bulk applicant upload","P3","J. Chen","2d","On track","success"],
              ].map(r=>(<tr key={r[0]} className="hover:bg-surface/60"><td className="py-2.5 font-mono">{r[0]}</td><td>{r[1]}</td><td><Pill tone={r[2]==="P2"?"warn":"info"}>{r[2]}</Pill></td><td>{r[3]}</td><td className="text-muted-foreground">{r[4]}</td><td><Pill tone={r[6] as any}>{r[5]}</Pill></td></tr>))}
            </tbody>
          </table>
        </SectionCard>
        <SectionCard title="Planned Maintenance">
          <ul className="text-xs space-y-2">
            {[
              ["Nov 30 · 02:00-03:00 ET","SQL failover drill","No downtime expected","info"],
              ["Dec 07 · 22:00-23:30 ET","Voltage HSM firmware","Read-only window","warn"],
              ["Dec 15 · 02:00-04:00 ET","Q4 patch cycle","Rolling · zero downtime","success"],
            ].map((r,i)=>(
              <li key={i} className="rounded-md border border-border bg-surface/60 p-2.5">
                <div className="flex items-center justify-between"><div className="font-semibold flex items-center gap-2"><CalendarClock className="size-3.5 text-primary" />{r[0]}</div><Pill tone={r[3] as any}>{r[2]}</Pill></div>
                <div className="text-muted-foreground mt-0.5">{r[1]}</div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </AppShell>
  );
}