import { createFileRoute } from "@tanstack/react-router";
import { AppShell, SectionCard, StatCard, Pill } from "@/components/shell/AppShell";
import { Server, ServerCog, Database, ShieldCheck, ArrowLeftRight, CheckCircle2, Clock } from "lucide-react";

export const Route = createFileRoute("/disaster-recovery")({ component: Page, head: () => ({ meta: [{ title: "Disaster Recovery - GLC" }] }) });

function Page() {
  return (
    <AppShell title="Disaster Recovery" subtitle="Multi-site resilience with active replication, tested failover, and validated backups. Business continuity certified." breadcrumb={["Operations", "DR"]}
      actions={<><Pill tone="success">Ready to Failover</Pill><Pill tone="info">Tested 2025-11-04</Pill></>}>
      <div className="grid md:grid-cols-4 gap-4">
        <StatCard label="RTO" value="30 min" tone="up" icon={Clock} delta="Target ≤ 60 min" />
        <StatCard label="RPO" value="5 min" tone="up" icon={Clock} delta="Continuous replication" />
        <StatCard label="Availability (12mo)" value="99.99%" tone="up" delta="1 planned window" />
        <StatCard label="Last DR Test" value="Passed" tone="up" icon={CheckCircle2} delta="Nov 04, 2025" />
      </div>

      <SectionCard title="Site Topology" description="Active-Warm with sync replication for tier-1 stores">
        <div className="grid md:grid-cols-3 gap-4 items-center">
          <SiteCard name="Primary - Atlanta DC" role="Active" tone="success" />
          <div className="flex items-center justify-center flex-col text-xs text-muted-foreground">
            <ArrowLeftRight className="size-8 text-primary" />
            <div className="mt-2">Sync: SQL · async: object storage</div>
            <div className="font-mono text-[10px]">lag 2.1s · target ≤ 5s</div>
          </div>
          <SiteCard name="Secondary - Perimeter DC" role="Warm Standby" tone="warn" />
        </div>
      </SectionCard>

      <div className="grid xl:grid-cols-3 gap-4">
        <SectionCard title="Backup Status">
          <ul className="text-xs space-y-2">
            {[["Nightly Full","02:14 · 82 min","success"],["Hourly Incremental","14:00 · 6 min","success"],["Config Snapshot","14:12 · 42 s","success"],["Off-site Copy","AWS S3 GovCloud","success"]].map((r,i)=>(
              <li key={i} className="rounded-md border border-border bg-surface/60 p-2.5 flex items-center justify-between"><div><div className="font-semibold">{r[0]}</div><div className="text-[10px] text-muted-foreground">{r[1]}</div></div><Pill tone={r[2] as any}>OK</Pill></li>
            ))}
          </ul>
        </SectionCard>
        <SectionCard title="Backup Validation">
          <div className="space-y-3">
            {[["Restore drill (weekly)","98.7% pass","success"],["Checksum integrity","100%","success"],["Encryption verified","AES-256","success"],["Ransomware immutability","WORM · 90d","success"]].map((r,i)=>(
              <div key={i} className="rounded-md border border-border bg-surface/60 p-3"><div className="flex items-center justify-between"><div className="text-xs font-semibold">{r[0]}</div><Pill tone={r[2] as any}>{r[1]}</Pill></div><div className="mt-2 h-1 bg-muted rounded-full overflow-hidden"><div className="h-full bg-success" style={{ width: "97%" }} /></div></div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Failover Procedure">
          <ol className="text-xs space-y-2 list-decimal list-inside">
            <li>Detect: automated health monitor triggers on 3 consecutive checks</li>
            <li>Announce: Incident Commander paged · comms opens</li>
            <li>Freeze: writes drained · in-flight jobs snapshotted</li>
            <li>Promote: secondary DB promoted · DNS flipped (60s TTL)</li>
            <li>Verify: smoke suite + synthetic monitor confirm</li>
            <li>Announce: platform available · post-mortem scheduled</li>
          </ol>
          <button className="mt-3 h-8 inline-flex items-center gap-2 rounded-md border border-primary/50 bg-primary/10 text-primary px-3 text-xs">Run Disaster Simulation</button>
        </SectionCard>
      </div>

      <SectionCard title="Business Continuity Attestation">
        <div className="grid md:grid-cols-3 gap-3">
          {[["BC Plan","Current · v4.2","success"],["Runbook Reviewed","Nov 2025","success"],["Tabletop Exercise","Q4 2025 · passed","success"],["Third-party audit","Passed","success"]].map((r,i)=>(
            <div key={i} className="rounded-md border border-border bg-surface/60 p-3"><Pill tone="success">Attested</Pill><div className="mt-2 text-sm font-semibold">{r[0]}</div><div className="text-xs text-muted-foreground">{r[1]}</div></div>
          ))}
        </div>
      </SectionCard>
    </AppShell>
  );
}

function SiteCard({ name, role, tone }: { name: string; role: string; tone: "success"|"warn" }) {
  return (
    <div className={"rounded-lg border p-4 " + (tone==="success"?"border-success/40 bg-success/5":"border-warning/40 bg-warning/5")}>
      <div className="flex items-center gap-3">
        <div className="size-11 rounded-md bg-background/60 border border-border grid place-items-center"><Server className="size-5 text-primary" /></div>
        <div><div className="text-sm font-semibold">{name}</div><Pill tone={tone}>{role}</Pill></div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
        <div><div className="text-muted-foreground">Nodes</div><div className="font-display text-base">24</div></div>
        <div><div className="text-muted-foreground">Storage</div><div className="font-display text-base">28 TB</div></div>
        <div><div className="text-muted-foreground">Load</div><div className="font-display text-base">{tone==="success"?"42%":"idle"}</div></div>
        <div><div className="text-muted-foreground">Health</div><div className="font-display text-base flex items-center gap-1.5"><ShieldCheck className="size-3.5 text-success" /> OK</div></div>
      </div>
    </div>
  );
}