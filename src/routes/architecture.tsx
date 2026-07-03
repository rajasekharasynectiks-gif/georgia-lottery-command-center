import { createFileRoute } from "@tanstack/react-router";
import { AppShell, SectionCard, Pill } from "@/components/shell/AppShell";
import { useState } from "react";
import { Globe, User, Fingerprint, Lock, Router, Cpu, Workflow, FileText, CreditCard, Bell, BarChart3, ScrollText, Boxes, Database, HardDrive, ShieldCheck, Activity, FileClock, Plug, Layers, Server, Cloud, ArrowRight, Building2, Mail, KeyRound } from "lucide-react";

export const Route = createFileRoute("/architecture")({ component: Page,
  head: () => ({ meta: [{ title: "Solution Architecture - GLC" }, { name: "description", content: "Enterprise architecture for the Georgia Lottery Retailer Licensing Platform." }] }),
});

type Node = { key: string; label: string; icon: any; tone?: string };
const zones: { zone: string; tone: string; desc: string; nodes: Node[] }[] = [
  { zone: "Public Zone", tone: "border-info/40 bg-info/5", desc: "Untrusted internet - public traffic origin", nodes: [
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
  const [view, setView] = useState<"logical" | "physical" | "dataflow" | "integration">("logical");
  return (
    <AppShell title="Enterprise Solution Architecture" subtitle="Cloud-ready, hybrid, and on-premise deployment architecture with clearly demarcated trust zones and DMZ boundaries." breadcrumb={["Architecture", "Solution"]}
      actions={<><Pill tone="primary">Reference Architecture</Pill><Pill tone="info">v5.0</Pill></>}>
      <div className="grid xl:grid-cols-[1.6fr_1fr] gap-4">
        <SectionCard title="System Topology" description="Switch between logical, physical, data-flow and integration views" right={
          <div className="flex flex-wrap gap-1">
            {([
              ["logical", "Logical"],
              ["physical", "Physical"],
              ["dataflow", "Data Flow"],
              ["integration", "Integration"],
            ] as const).map(([k, label]) => (
              <button key={k} onClick={() => setView(k)} className={"h-7 rounded-md border px-2.5 text-[11px] font-medium transition-colors " + (view === k ? "border-primary bg-primary/10 text-primary" : "border-border bg-surface hover:bg-surface-2 text-muted-foreground")}>{label}</button>
            ))}
          </div>
        }>
          {view === "logical" && <LogicalView />}
          {view === "physical" && <PhysicalView />}
          {view === "dataflow" && <DataFlowView />}
          {view === "integration" && <IntegrationView />}
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

function LogicalView() {
  return (
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
  );
}

function PhysicalView() {
  const sites: { name: string; role: string; tone: string; nodes: { i: any; k: string; d: string }[] }[] = [
    { name: "Primary DC — Atlanta", role: "Active", tone: "border-success/40 bg-success/5", nodes: [
      { i: Server, k: "WAF + Load Balancers", d: "F5 · redundant pair" },
      { i: Cpu, k: "App Server Cluster", d: "24 nodes · autoscale" },
      { i: Database, k: "SQL AlwaysOn AG", d: "Primary replica · sync" },
      { i: HardDrive, k: "Object Storage", d: "28 TB · versioned" },
      { i: KeyRound, k: "HSM Cluster", d: "Thales Luna · 3-node" },
    ]},
    { name: "Secondary DC — Perimeter", role: "Warm Standby", tone: "border-warning/40 bg-warning/5", nodes: [
      { i: Server, k: "WAF + Load Balancers", d: "Standby · DNS TTL 60s" },
      { i: Cpu, k: "App Server Cluster", d: "24 nodes · pre-warmed" },
      { i: Database, k: "SQL Secondary Replica", d: "Sync commit · promotable" },
      { i: HardDrive, k: "Object Storage", d: "Async replicated" },
      { i: KeyRound, k: "HSM Cluster", d: "Replicated key material" },
    ]},
    { name: "Azure Gov (Burst / DR)", role: "Cloud-Ready", tone: "border-info/40 bg-info/5", nodes: [
      { i: Cloud, k: "AKS Reserved Capacity", d: "On-demand scale-out" },
      { i: Database, k: "Azure SQL MI", d: "Restore target · encrypted" },
      { i: HardDrive, k: "Blob (GRS)", d: "Off-site copy · WORM" },
      { i: ShieldCheck, k: "Azure Firewall", d: "Private endpoints only" },
    ]},
  ];
  return (
    <div className="relative rounded-md border border-border bg-background/40 p-4 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="relative grid gap-3">
        {sites.map((s, i) => (
          <div key={s.name} className={"rounded-lg border p-3 " + s.tone}>
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-widest">{s.name}</div>
                <div className="text-[11px] text-muted-foreground">Layer {i + 1} · {s.role}</div>
              </div>
              <Pill tone={i === 0 ? "success" : i === 1 ? "warn" : "info"}>{s.role}</Pill>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {s.nodes.map((n) => (
                <div key={n.k} className="rounded-md border border-border/60 bg-surface p-2.5">
                  <div className="flex items-center gap-2"><n.i className="size-4 text-primary" /><div className="text-xs font-medium truncate">{n.k}</div></div>
                  <div className="text-[10.5px] text-muted-foreground mt-1">{n.d}</div>
                </div>
              ))}
            </div>
            {i < sites.length - 1 && (
              <div className="flex justify-center mt-2 text-[10px] text-muted-foreground font-mono">
                <svg width="28" height="18" viewBox="0 0 28 18"><path d="M14 0 V16 M6 10 L14 18 L22 10" stroke="var(--color-info)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" /></svg>
                <span className="ml-2 self-center">Async replication</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function DataFlowView() {
  const flow: { i: any; k: string; d: string; zone: string }[] = [
    { i: User, k: "Applicant Browser", d: "TLS 1.3 · CSP · WebAuthn", zone: "Public" },
    { i: Globe, k: "CDN / WAF", d: "OWASP top-10 rules · rate limiting", zone: "DMZ" },
    { i: Router, k: "API Gateway", d: "OAuth 2.0 · JWT · quotas", zone: "DMZ" },
    { i: Workflow, k: "Workflow Service", d: "State machine · SAGA orchestration", zone: "App" },
    { i: ShieldCheck, k: "Voltage Encryption", d: "FPE on PII · JIT decrypt", zone: "App" },
    { i: CreditCard, k: "Payment Service", d: "MerchantOne · idempotency keys", zone: "App" },
    { i: Database, k: "SQL + Object Store", d: "TDE at rest · signed writes", zone: "Data" },
    { i: ScrollText, k: "Immutable Audit", d: "WORM · signed events · 7y", zone: "Data" },
    { i: Bell, k: "Notification Service", d: "SMTP · SMS · webhook", zone: "App" },
  ];
  return (
    <div className="relative rounded-md border border-border bg-background/40 p-4 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <ol className="relative space-y-2">
        {flow.map((s, i) => (
          <li key={s.k} className="flex items-stretch gap-3">
            <div className="w-8 shrink-0 grid place-items-center">
              <div className="size-7 rounded-full border border-primary/40 bg-primary/10 text-primary text-[11px] font-mono font-semibold grid place-items-center">{String(i + 1).padStart(2, "0")}</div>
            </div>
            <div className="flex-1 rounded-md border border-border bg-surface/70 p-3 flex items-center gap-3">
              <div className="size-9 rounded-md bg-primary/10 border border-primary/20 grid place-items-center text-primary"><s.i className="size-4" /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2"><div className="text-sm font-semibold">{s.k}</div><Pill tone={s.zone === "Public" ? "info" : s.zone === "DMZ" ? "warn" : s.zone === "App" ? "primary" : "success"}>{s.zone}</Pill></div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{s.d}</div>
              </div>
              {i < flow.length - 1 && <ArrowRight className="size-4 text-muted-foreground shrink-0" />}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function IntegrationView() {
  const partners = [
    { i: Building2, k: "Melissa Data", proto: "HTTPS / REST", cls: "PII", purpose: "Address validation" },
    { i: CreditCard, k: "MerchantOne", proto: "HTTPS + Webhook", cls: "Financial", purpose: "Payment processing" },
    { i: FileText, k: "ActivePDF", proto: "gRPC (internal)", cls: "Confidential", purpose: "PDF generation" },
    { i: ShieldCheck, k: "Voltage", proto: "KMIP / mTLS", cls: "Restricted", purpose: "Field encryption / KMS" },
    { i: Mail, k: "SMTP Relay", proto: "SMTPS + DKIM", cls: "Internal", purpose: "Email delivery" },
    { i: Fingerprint, k: "State IdP", proto: "OIDC · SAML 2.0", cls: "Restricted", purpose: "Single sign-on" },
  ];
  return (
    <div className="relative rounded-md border border-border bg-background/40 p-4 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div className="grid gap-2">
          {partners.slice(0, 3).map((p) => <PartnerCard key={p.k} {...p} side="left" />)}
        </div>
        <div className="hidden md:grid place-items-center">
          <div className="rounded-full border-2 border-primary/40 bg-primary/10 text-primary size-32 grid place-items-center text-center px-2">
            <div>
              <Layers className="size-6 mx-auto" />
              <div className="text-[10px] uppercase tracking-widest mt-1 font-semibold">Integration Layer</div>
              <div className="text-[9px] text-muted-foreground">API GW · ESB · Queues</div>
            </div>
          </div>
        </div>
        <div className="grid gap-2">
          {partners.slice(3).map((p) => <PartnerCard key={p.k} {...p} side="right" />)}
        </div>
      </div>
    </div>
  );
}

function PartnerCard({ i: Icon, k, proto, cls, purpose, side }: any) {
  const cx = cls === "Restricted" ? "danger" : cls === "Financial" || cls === "PII" ? "warn" : cls === "Confidential" ? "primary" : "info";
  return (
    <div className={"rounded-md border border-border bg-surface p-3 flex items-center gap-3 " + (side === "right" ? "flex-row" : "")}>
      <div className="size-10 rounded-md bg-primary/10 border border-primary/20 grid place-items-center text-primary"><Icon className="size-5" /></div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2"><div className="text-sm font-semibold truncate">{k}</div><Pill tone={cx as any}>{cls}</Pill></div>
        <div className="text-[11px] text-muted-foreground">{purpose}</div>
        <div className="text-[10px] font-mono text-muted-foreground mt-0.5">{proto}</div>
      </div>
    </div>
  );
}