import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, SectionCard, Pill } from "@/components/shell/AppShell";
import { Network, GitBranch, Plug, KeyRound, ServerCog, ShieldCheck, Layers, Zap, Cloud, Eye, BadgeCheck, ArrowRight, Printer } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({ meta: [{ title: "Solution Architecture Overview - GLC" }, { name: "description", content: "Georgia Lottery Retailer Licensing Platform - Solution Architecture submission." }] }),
});

const principles = [
  { i: ShieldCheck, k: "Zero-Trust", d: "mTLS between every service · continuous verification · no implicit trust" },
  { i: Layers, k: "Modular Services", d: "Independently deployable business services with clear domain boundaries" },
  { i: Zap, k: "Event-Driven", d: "Async messaging for scale, resilience, and eventual consistency" },
  { i: Cloud, k: "Cloud-Portable", d: "On-premise, hybrid, or cloud with no rewrite · Terraform maintained" },
  { i: Eye, k: "Observable", d: "Metrics, traces, and logs on every service · SLO-driven operations" },
  { i: BadgeCheck, k: "Compliant by Design", d: "SOC 2, PCI DSS, NIST 800-53, FedRAMP-ready · immutable audit" },
];

const nfrs: [string, string, string][] = [
  ["Availability", "99.98%", "24×7 across primary & secondary DC"],
  ["RTO", "30 min", "Automated failover, tested quarterly"],
  ["RPO", "5 min", "Continuous sync replication"],
  ["p95 Latency", "240 ms", "End-to-end API"],
  ["Concurrent Users", "25,000", "Sustained peak"],
  ["Peak TPS", "4,200", "Payment + workflow"],
];

const jumpTo: { to: string; icon: any; label: string; desc: string }[] = [
  { to: "/architecture", icon: Network, label: "System Topology", desc: "Trust zones, DMZ boundaries, logical, physical, data-flow, and integration views" },
  { to: "/workflow", icon: GitBranch, label: "Application Workflow", desc: "End-to-end BPMN swim lanes, decision nodes, escalation and retry paths" },
  { to: "/integrations", icon: Plug, label: "Integration Architecture", desc: "Melissa, MerchantOne, ActivePDF, Voltage, SMTP, and IdP with protocols and SLAs" },
  { to: "/encryption", icon: KeyRound, label: "Data Protection", desc: "Voltage field-level encryption, HSM-backed keys, dual-control decryption" },
  { to: "/disaster-recovery", icon: ServerCog, label: "Resilience & DR", desc: "Multi-site topology, RTO/RPO, backup validation, failover procedure" },
];

function Index() {
  return (
    <AppShell
      title="Solution Architecture Overview"
      subtitle="Georgia Lottery Corporation · Web-Based Retailer Licensing Platform · Enterprise architecture prepared for RFA submission."
      breadcrumb={["Overview"]}
      actions={
        <>
          <Pill tone="primary">RFA Submission</Pill>
          <Pill tone="info">v5.0 · Nov 2026</Pill>
          <Link to="/print" className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-3 text-xs font-semibold text-primary-foreground hover:brightness-105">
            <Printer className="size-3.5" /> Print / PDF
          </Link>
        </>
      }
    >
      {/* Cover / hero */}
      <section className="relative overflow-hidden panel">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="absolute -top-24 -right-16 size-72 rounded-full blur-3xl bg-primary/20" />
        <div className="relative p-8 md:p-10 grid lg:grid-cols-[1.5fr_1fr] gap-8 items-start">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Pill tone="primary">Georgia Lottery Corporation</Pill>
              <Pill tone="info">RFA · Solution Architecture</Pill>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-semibold tracking-tight leading-[1.05]">
              A <span className="text-gradient-gold">secure, scalable, cloud-portable</span> licensing platform for the State of Georgia.
            </h2>
            <p className="mt-4 text-sm text-muted-foreground max-w-2xl leading-relaxed">
              This document presents the reference solution architecture for the Web-Based Retailer Licensing Platform. It describes system topology, trust zones, application workflow, third-party integrations, data protection, and disaster recovery — engineered to meet enterprise, state, and federal standards for multi-decade operation.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link to="/architecture" className="h-9 inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 text-xs font-medium hover:bg-surface-2">Begin with Topology <ArrowRight className="size-3.5" /></Link>
              <Link to="/print" className="h-9 inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 text-xs font-medium hover:bg-surface-2"><Printer className="size-3.5" /> Print Full Document</Link>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-surface/70 backdrop-blur p-5 text-xs space-y-3">
            <div>
              <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Prepared for</div>
              <div className="mt-1 text-sm font-semibold">Georgia Lottery Corporation</div>
              <div className="text-muted-foreground">RFA — WBRLPS · Evaluation Committee</div>
            </div>
            <div className="border-t border-border pt-3">
              <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Prepared by</div>
              <div className="mt-1 text-sm font-semibold">Solution Architecture Team</div>
              <div className="text-muted-foreground">Enterprise Delivery Practice</div>
            </div>
            <div className="border-t border-border pt-3 grid grid-cols-2 gap-2">
              <div><div className="text-[10px] uppercase tracking-widest text-muted-foreground">Version</div><div className="font-mono">v5.0</div></div>
              <div><div className="text-[10px] uppercase tracking-widest text-muted-foreground">Revision</div><div className="font-mono">2026-11-15</div></div>
              <div><div className="text-[10px] uppercase tracking-widest text-muted-foreground">Classification</div><div>Confidential</div></div>
              <div><div className="text-[10px] uppercase tracking-widest text-muted-foreground">Status</div><div>For Evaluation</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture principles */}
      <SectionCard title="Architecture Principles" description="Six commitments that shape every design decision in this platform">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
          {principles.map((p) => (
            <div key={p.k} className="rounded-md border border-border bg-surface/60 p-4">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-md bg-primary/10 border border-primary/20 grid place-items-center text-primary"><p.i className="size-4" /></div>
                <div className="text-sm font-semibold">{p.k}</div>
              </div>
              <div className="mt-2 text-[11.5px] text-muted-foreground leading-relaxed">{p.d}</div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* NFR strip */}
      <SectionCard title="Non-Functional Requirements" description="Design targets validated against load models and DR testing">
        <dl className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          {nfrs.map(([k, v, d]) => (
            <div key={k} className="rounded-md border border-border bg-surface/60 p-3">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{k}</div>
              <div className="mt-1 font-display text-2xl font-semibold text-gradient-gold">{v}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{d}</div>
            </div>
          ))}
        </dl>
      </SectionCard>

      {/* Jump-to tiles */}
      <SectionCard title="Solution Architecture Sections" description="Six sections that comprise the full submission package">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
          {jumpTo.map((j, i) => (
            <Link key={j.to} to={j.to} className="group rounded-lg border border-border bg-surface/60 hover:bg-surface-2 hover:border-primary/50 transition-colors p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="size-10 rounded-md bg-primary/10 border border-primary/20 grid place-items-center text-primary"><j.icon className="size-5" /></div>
                <Pill>{String(i + 1).padStart(2, "0")}</Pill>
              </div>
              <div>
                <div className="text-sm font-semibold">{j.label}</div>
                <div className="text-[11.5px] text-muted-foreground mt-1 leading-relaxed">{j.desc}</div>
              </div>
              <div className="mt-auto text-[11px] text-primary inline-flex items-center gap-1.5 group-hover:gap-2 transition-[gap]">Open section <ArrowRight className="size-3.5" /></div>
            </Link>
          ))}
        </div>
      </SectionCard>
    </AppShell>
  );
}
