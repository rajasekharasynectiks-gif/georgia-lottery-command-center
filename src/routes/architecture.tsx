import { createFileRoute } from "@tanstack/react-router";
import { AppShell, SectionCard, Pill } from "@/components/shell/AppShell";
import { Globe, User, Fingerprint, Lock, Router, Cpu, Workflow, FileText, CreditCard, Bell, BarChart3, ScrollText, Boxes, Database, HardDrive, ShieldCheck, Activity, FileClock, Plug } from "lucide-react";

export const Route = createFileRoute("/architecture")({ component: Page,
  head: () => ({ meta: [{ title: "Solution Architecture — GLC" }, { name: "description", content: "Enterprise architecture for the Georgia Lottery Retailer Licensing Platform." }] }),
});

type Node = { key: string; label: string; icon: any; tone?: string };
const zones: { zone: string; tone: string; desc: string; nodes: Node[] }[] = [
  { zone: "Public Zone", tone: "border-info/40 bg-info/5", desc: "Untrusted internet — public traffic origin", nodes: [
    { key: "web", label: "Public Website", icon: Globe },
    { key: "portal", label: "Applicant Portal", icon: User },
  ]},
  { zone: "DMZ / Perimeter", tone: "border-warning/40 bg-warning/5", desc: "WAF · TLS termination · Rate limiting", nodes: [
    { key: "auth", label: "Authentication Svc", icon: Fingerprint },
    { key: "mfa", label: "2FA / MFA Service", icon: Lock },
    { key: "gw", label: "API Gateway", icon: Router },
  ]},
  { zone: "Application Trust Zone", tone: "border-primary/40 bg-primary/5", desc: "Business services · Zero-trust mTLS", nodes: [
    { key: "biz", label: "Business Services", icon: Cpu },
    { key: "wf", label: "Workflow Engine", icon: Workflow },
    { key: "doc", label: "Document Services", icon: FileText },
    { key: "pay", label: "Payment Services", icon: CreditCard },
    { key: "not", label: "Notification Services", icon: Bell },
    { key: "rpt", label: "Reporting Services", icon: BarChart3 },
    { key: "aud", label: "Audit Services", icon: ScrollText },
    { key: "int", label: "Integration Layer", icon: Plug },
  ]},
  { zone: "Data Trust Zone", tone: "border-success/40 bg-success/5", desc: "Encrypted at rest & in transit · Restricted", nodes: [
    { key: "sql", label: "SQL Database", icon: Database },
    { key: "obj", label: "Document Storage", icon: HardDrive },
    { key: "enc", label: "Encryption / KMS", icon: ShieldCheck },
  ]},
  { zone: "Observability", tone: "border-accent/40 bg-accent/5", desc: "Monitoring, logs, tracing", nodes: [
    { key: "mon", label: "Monitoring Svc", icon: Activity },
    { key: "log", label: "Logging Svc", icon: FileClock },
  ]},
  { zone: "External Integrations", tone: "border-border bg-surface/40", desc: "Third-party & partner systems", nodes: [
    { key: "ext", label: "Melissa · MerchantOne · ActivePDF · Voltage · SMTP · IdP", icon: Boxes },
  ]},
];

function Page() {
  return (
    <AppShell title="Enterprise Solution Architecture" subtitle="Cloud-ready, hybrid, and on-premise deployment architecture with clearly demarcated trust zones and DMZ boundaries." breadcrumb={["Architecture", "Solution"]}
      actions={<><Pill tone="primary">Reference Architecture</Pill><Pill tone="info">v5.0</Pill></>}>
      <div className="grid xl:grid-cols-[1.6fr_1fr] gap-4">
        <SectionCard title="Trust-zoned System Topology" description="Interactive diagram — hover a component for details" right={<div className="flex gap-1.5"><Pill tone="info">Cloud-Ready</Pill><Pill tone="success">Hybrid</Pill><Pill>On-Prem</Pill></div>}>
          <div className="relative rounded-md border border-border bg-background/40 p-4 overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
            <div className="relative space-y-3">
              {zones.map((z, i) => (
                <div key={z.zone} className={"rounded-lg border p-3 " + z.tone}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-widest">{z.zone}</div>
                      <div className="text-[11px] text-muted-foreground">{z.desc}</div>
                    </div>
                    <Pill tone={i === 0 ? "info" : i === 1 ? "warn" : i === 2 ? "primary" : i === 3 ? "success" : "muted"}>Zone {i + 1}</Pill>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {z.nodes.map((n) => (
                      <div key={n.key} className="group rounded-md border border-border/60 bg-surface hover:bg-surface-2 hover:border-primary/50 transition-colors p-2.5 flex items-center gap-2">
                        <div className="size-8 rounded-md bg-background/60 border border-border grid place-items-center"><n.icon className="size-4 text-primary" /></div>
                        <div className="text-xs font-medium truncate">{n.label}</div>
                      </div>
                    ))}
                  </div>
                  {i < zones.length - 1 && (
                    <div className="flex justify-center mt-2">
                      <svg width="28" height="18" viewBox="0 0 28 18"><path d="M14 0 V16 M6 10 L14 18 L22 10" stroke="var(--color-primary)" strokeWidth="1.5" fill="none" className="flow-line" /></svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <div className="space-y-4">
          <SectionCard title="Deployment Modes">
            <div className="space-y-2">
              {[
                { k: "On-Premise", d: "GLC state data center primary · secondary at Perimeter DC", p: "success" },
                { k: "Hybrid Cloud", d: "Burst analytics & DR to Azure Gov · state secrets remain on-prem", p: "info" },
                { k: "Cloud-Ready (Future)", d: "Azure Gov / AWS GovCloud terraform modules maintained", p: "primary" },
              ].map((r) => (
                <div key={r.k} className="rounded-md border border-border bg-surface/60 p-3">
                  <div className="flex items-center justify-between"><div className="text-xs font-semibold">{r.k}</div><Pill tone={r.p as any}>Supported</Pill></div>
                  <div className="text-[11px] text-muted-foreground mt-1">{r.d}</div>
                </div>
              ))}
            </div>
          </SectionCard>
          <SectionCard title="Data Flow Legend">
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2"><svg width="30" height="6"><line x1="0" y1="3" x2="30" y2="3" stroke="var(--color-primary)" strokeWidth="2" className="flow-line" /></svg> Encrypted API request</li>
              <li className="flex items-center gap-2"><svg width="30" height="6"><line x1="0" y1="3" x2="30" y2="3" stroke="var(--color-success)" strokeWidth="2" /></svg> mTLS internal service call</li>
              <li className="flex items-center gap-2"><svg width="30" height="6"><line x1="0" y1="3" x2="30" y2="3" stroke="var(--color-info)" strokeWidth="2" strokeDasharray="4 4" /></svg> Async event / message bus</li>
              <li className="flex items-center gap-2"><svg width="30" height="6"><line x1="0" y1="3" x2="30" y2="3" stroke="var(--color-warning)" strokeWidth="2" /></svg> Third-party integration (HTTPS)</li>
            </ul>
          </SectionCard>
          <SectionCard title="Non-Functional SLAs">
            <dl className="grid grid-cols-2 gap-2 text-xs">
              {[["Availability","99.98%"],["RTO","30 min"],["RPO","5 min"],["p95 Latency","240 ms"],["Concurrent Users","25,000"],["Peak TPS","4,200"]].map(([k,v]) => (
                <div key={k} className="rounded-md border border-border bg-surface/50 p-2.5"><div className="text-[10px] uppercase tracking-widest text-muted-foreground">{k}</div><div className="font-display text-lg font-semibold">{v}</div></div>
              ))}
            </dl>
          </SectionCard>
        </div>
      </div>
    </AppShell>
  );
}