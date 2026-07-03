import { createFileRoute, Link } from "@tanstack/react-router";
import { Network, GitBranch, Plug, KeyRound, ServerCog, Printer, ArrowLeft } from "lucide-react";

// Import section renderers (we re-render simplified, print-optimized views)
export const Route = createFileRoute("/print")({
  component: PrintPage,
  head: () => ({ meta: [{ title: "Solution Architecture — Print / PDF" }] }),
});

const nfrs: [string, string, string][] = [
  ["Availability", "99.98%", "24×7 across primary & secondary DC"],
  ["RTO", "30 min", "Automated failover, tested quarterly"],
  ["RPO", "5 min", "Continuous sync replication"],
  ["p95 Latency", "240 ms", "End-to-end API"],
  ["Concurrent Users", "25,000", "Sustained peak"],
  ["Peak TPS", "4,200", "Payment + workflow"],
];

const principles = [
  ["Zero-Trust", "mTLS between every service · continuous verification"],
  ["Modular Services", "Independently deployable business services with clear domain boundaries"],
  ["Event-Driven", "Async messaging for scale, resilience, and eventual consistency"],
  ["Cloud-Portable", "On-premise, hybrid, or cloud with no rewrite · Terraform maintained"],
  ["Observable", "Metrics, traces, and logs on every service · SLO-driven operations"],
  ["Compliant by Design", "SOC 2, PCI DSS, NIST 800-53, FedRAMP-ready · immutable audit"],
];

const zones: [string, string, string[]][] = [
  ["Zone 1 · Public", "Untrusted internet — public traffic origin", ["Public Website", "Applicant Portal"]],
  ["Zone 2 · DMZ / Perimeter", "WAF · TLS termination · Rate limiting", ["Authentication Service", "2FA / MFA Service", "API Gateway"]],
  ["Zone 3 · Application", "Business services · Zero-trust mTLS", ["Business Services", "Workflow Engine", "Document Services", "Payment Services", "Notification Services", "Reporting Services", "Audit Services", "Integration Layer"]],
  ["Zone 4 · Data", "Encrypted at rest & in transit · Restricted", ["SQL Database", "Document Storage", "Encryption / KMS"]],
  ["Zone 5 · Observability", "Monitoring, logs, tracing", ["Monitoring Service", "Logging Service"]],
];

const workflowStages = [
  ["01", "Registration", "Applicant", "Applicant creates account and completes identity verification"],
  ["02", "2FA Verification", "System", "TOTP or WebAuthn factor enrolled and challenged"],
  ["03", "Application Creation", "Applicant", "New application initiated with license type and location"],
  ["04", "Owner Management", "Applicant", "Owner, officer, and beneficial-owner data captured"],
  ["05", "Document Upload", "Applicant", "Encrypted upload with malware scan and validation"],
  ["06", "Review & Submission", "Applicant", "Applicant reviews, signs, and submits"],
  ["07", "Application Processing", "GLC Reviewer", "Reviewer validates completeness and eligibility"],
  ["08", "Payment Processing", "Applicant / System", "MerchantOne payment request and confirmation"],
  ["09", "Compliance Review", "Compliance", "Background, tax, and regulatory checks; 4-eye approval"],
  ["10", "Final Processing", "GLC Reviewer", "License number issued and retailer activated"],
  ["11", "Completion", "System", "Notifications sent, audit trail sealed, retailer live"],
];

const partners = [
  ["Melissa Data", "HTTPS / REST", "PII", "Address validation"],
  ["MerchantOne", "HTTPS + Webhook", "Financial", "Payment processing"],
  ["ActivePDF", "gRPC (internal)", "Confidential", "PDF generation"],
  ["Voltage", "KMIP / mTLS", "Restricted", "Field encryption / KMS"],
  ["SMTP Relay", "SMTPS + DKIM", "Internal", "Email delivery"],
  ["State IdP", "OIDC · SAML 2.0", "Restricted", "Single sign-on"],
];

const encryptionSteps = [
  ["01", "User Upload", "Client-side pre-check · size, type, hash"],
  ["02", "File Validation", "MIME, signature, structural validation"],
  ["03", "Malware Scan", "Kaspersky · ClamAV dual engine"],
  ["04", "Voltage Encryption", "Format-preserving · FPE / SST · FIPS 140-2 L3"],
  ["05", "SQL Storage", "Encrypted blob + metadata · TDE"],
  ["06", "Access Request", "ABAC evaluation · dual-control on PII"],
  ["07", "Decryption", "Just-in-time · session-scoped keys"],
  ["08", "Audit Logging", "Immutable · signed · SIEM stream"],
];

function PrintPage() {
  return (
    <div className="print-doc bg-background text-foreground min-h-screen">
      {/* Screen-only toolbar */}
      <div className="print-hide sticky top-0 z-40 border-b border-border bg-surface/80 backdrop-blur px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-surface px-3 text-xs font-medium hover:bg-surface-2"><ArrowLeft className="size-3.5" /> Back to app</Link>
          <div className="text-xs text-muted-foreground">Print preview · use browser <span className="font-mono">Cmd/Ctrl + P</span> → <span className="font-semibold">Save as PDF</span></div>
        </div>
        <button onClick={() => window.print()} className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-3 text-xs font-semibold text-primary-foreground hover:brightness-105">
          <Printer className="size-3.5" /> Print / Save as PDF
        </button>
      </div>

      <div className="mx-auto max-w-[1000px] px-10 py-10 space-y-16 print-content">
        {/* Cover */}
        <section className="print-page print-cover">
          <div className="border border-border rounded-lg p-12 relative overflow-hidden bg-surface">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="absolute -top-24 -right-16 size-72 rounded-full blur-3xl bg-primary/20" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] uppercase tracking-widest text-primary font-semibold">Solution Architecture · RFA Submission</div>
              <h1 className="mt-8 text-5xl font-display font-semibold tracking-tight leading-[1.05]">Georgia Lottery Corporation</h1>
              <div className="mt-2 text-2xl font-display text-gradient-gold">Web-Based Retailer Licensing Platform</div>
              <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-4 text-sm max-w-xl">
                <Field label="Prepared for" value="Georgia Lottery Corporation" sub="RFA — WBRLPS Evaluation Committee" />
                <Field label="Prepared by" value="Solution Architecture Team" sub="Enterprise Delivery Practice" />
                <Field label="Version" value="v5.0" sub="Nov 15, 2026" />
                <Field label="Classification" value="Confidential" sub="For Evaluation Only" />
              </div>
              <div className="mt-12 pt-6 border-t border-border text-xs text-muted-foreground max-w-2xl leading-relaxed">
                This document presents the reference solution architecture for the Web-Based Retailer Licensing Platform — system topology, application workflow, third-party integrations, data protection, and disaster recovery — engineered for enterprise, state, and federal standards.
              </div>
            </div>
          </div>
        </section>

        {/* TOC */}
        <Section n="00" title="Table of Contents" subtitle="This document contains six sections">
          <ol className="text-sm space-y-2 list-decimal list-inside">
            {[
              ["Solution Overview & Architecture Principles", "Executive summary, NFRs, principles"],
              ["System Topology", "Trust zones, DMZ, physical & data-flow views"],
              ["Application Workflow", "End-to-end lifecycle across four swim lanes"],
              ["Integration Architecture", "Third-party systems, protocols, and classifications"],
              ["Data Protection", "Voltage field-level encryption and key management"],
              ["Resilience & Disaster Recovery", "Multi-site topology, RTO/RPO, failover"],
            ].map(([k, v], i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="font-semibold">{k}</span>
                <span className="flex-1 border-b border-dashed border-border" />
                <span className="text-muted-foreground text-xs">{v}</span>
              </li>
            ))}
          </ol>
        </Section>

        {/* 01 Overview */}
        <Section n="01" title="Solution Overview & Architecture Principles" subtitle="A modern, secure, cloud-portable licensing platform for the State of Georgia.">
          <div className="grid grid-cols-2 gap-3 mb-6">
            {principles.map(([k, v]) => (
              <div key={k} className="rounded-md border border-border bg-surface/60 p-3">
                <div className="text-sm font-semibold">{k}</div>
                <div className="text-[11px] text-muted-foreground mt-1">{v}</div>
              </div>
            ))}
          </div>
          <SubTitle icon={ArrowLeft} text="Non-Functional Requirements" />
          <dl className="grid grid-cols-3 gap-3">
            {nfrs.map(([k, v, d]) => (
              <div key={k} className="rounded-md border border-border bg-surface/60 p-3">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{k}</div>
                <div className="mt-1 font-display text-2xl font-semibold text-gradient-gold">{v}</div>
                <div className="text-[10.5px] text-muted-foreground mt-0.5">{d}</div>
              </div>
            ))}
          </dl>
        </Section>

        {/* 02 Topology */}
        <Section n="02" title="System Topology" subtitle="Five trust zones with clearly demarcated DMZ boundaries." icon={Network}>
          <div className="space-y-2">
            {zones.map(([zone, desc, nodes], i) => (
              <div key={zone} className="rounded-md border border-border bg-surface/60 p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-widest">{zone}</div>
                    <div className="text-[11px] text-muted-foreground">{desc}</div>
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {nodes.map((n) => (
                    <div key={n} className="rounded border border-border/60 bg-background/40 px-2 py-1.5 text-[11px] font-medium">{n}</div>
                  ))}
                </div>
                {i < zones.length - 1 && <div className="mt-2 text-center text-primary text-xs">↓</div>}
              </div>
            ))}
          </div>
        </Section>

        {/* 03 Workflow */}
        <Section n="03" title="Application Workflow" subtitle="End-to-end retailer licensing lifecycle." icon={GitBranch}>
          <table className="w-full text-xs border-collapse">
            <thead className="text-muted-foreground">
              <tr className="text-left border-b border-border">
                <th className="py-2 w-10">#</th><th>Stage</th><th className="w-32">Actor</th><th>Description</th>
              </tr>
            </thead>
            <tbody>
              {workflowStages.map(([n, k, actor, d]) => (
                <tr key={n} className="border-b border-border">
                  <td className="py-2 font-mono text-primary font-semibold">{n}</td>
                  <td className="font-semibold">{k}</td>
                  <td className="text-muted-foreground">{actor}</td>
                  <td className="text-muted-foreground">{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        {/* 04 Integrations */}
        <Section n="04" title="Integration Architecture" subtitle="Third-party and partner systems with protocols and data classification." icon={Plug}>
          <table className="w-full text-xs border-collapse">
            <thead className="text-muted-foreground">
              <tr className="text-left border-b border-border">
                <th className="py-2">System</th><th>Protocol</th><th>Data Class</th><th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              {partners.map(([k, proto, cls, purpose]) => (
                <tr key={k} className="border-b border-border">
                  <td className="py-2 font-semibold">{k}</td>
                  <td className="font-mono text-muted-foreground">{proto}</td>
                  <td><span className="inline-block rounded-full border border-primary/30 bg-primary/10 text-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">{cls}</span></td>
                  <td className="text-muted-foreground">{purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        {/* 05 Encryption */}
        <Section n="05" title="Data Protection" subtitle="Voltage field-level, format-preserving encryption. FIPS 140-2 Level 3, HSM-backed." icon={KeyRound}>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {encryptionSteps.map(([n, k, d]) => (
              <div key={n} className="rounded-md border border-border bg-surface/60 p-3">
                <div className="text-[10px] font-mono tracking-widest text-muted-foreground">STEP {n}</div>
                <div className="text-sm font-semibold mt-1">{k}</div>
                <div className="text-[11px] text-muted-foreground">{d}</div>
              </div>
            ))}
          </div>
          <SubTitle icon={KeyRound} text="Protected Fields" />
          <table className="w-full text-xs border-collapse">
            <thead className="text-muted-foreground"><tr className="text-left border-b border-border"><th className="py-2">Field</th><th>Classification</th><th>Method</th></tr></thead>
            <tbody>
              {[["SSN", "PII-Restricted", "FPE"], ["EIN", "Sensitive", "FPE"], ["DOB", "PII", "FPE"], ["Bank Account", "Financial", "Tokenized"], ["Address", "PII", "AES-GCM"], ["Documents", "Confidential", "Envelope"]].map((r) => (
                <tr key={r[0]} className="border-b border-border"><td className="py-1.5 font-medium">{r[0]}</td><td className="text-muted-foreground">{r[1]}</td><td className="text-muted-foreground font-mono">{r[2]}</td></tr>
              ))}
            </tbody>
          </table>
        </Section>

        {/* 06 DR */}
        <Section n="06" title="Resilience & Disaster Recovery" subtitle="Multi-site resilience with active replication, tested failover, and validated backups." icon={ServerCog}>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <StatBlock label="RTO" value="30 min" sub="Target ≤ 60 min" />
            <StatBlock label="RPO" value="5 min" sub="Continuous replication" />
            <StatBlock label="Availability" value="99.99%" sub="12-month rolling" />
          </div>
          <SubTitle icon={ServerCog} text="Failover Procedure" />
          <ol className="text-xs space-y-1.5 list-decimal list-inside text-muted-foreground">
            <li><span className="text-foreground font-medium">Detect</span> — automated health monitor triggers on 3 consecutive checks</li>
            <li><span className="text-foreground font-medium">Announce</span> — Incident Commander paged, comms channel opens</li>
            <li><span className="text-foreground font-medium">Freeze</span> — writes drained, in-flight jobs snapshotted</li>
            <li><span className="text-foreground font-medium">Promote</span> — secondary DB promoted, DNS flipped (60s TTL)</li>
            <li><span className="text-foreground font-medium">Verify</span> — smoke suite + synthetic monitor confirm</li>
            <li><span className="text-foreground font-medium">Announce</span> — platform available, post-mortem scheduled</li>
          </ol>
        </Section>

        {/* Footer */}
        <section className="print-page">
          <div className="border-t border-border pt-6 text-[10px] text-muted-foreground flex items-center justify-between">
            <span>Georgia Lottery Corporation · Solution Architecture v5.0 · Confidential</span>
            <span>Nov 15, 2026 · GLC-SA-2026-11-15</span>
          </div>
        </section>
      </div>
    </div>
  );
}

function Section({ n, title, subtitle, children, icon: Icon }: any) {
  return (
    <section className="print-page">
      <header className="mb-4 pb-3 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="text-[10px] font-mono tracking-widest text-muted-foreground">SECTION {n}</div>
          {Icon && <Icon className="size-4 text-primary" />}
        </div>
        <h2 className="mt-1 text-2xl font-display font-semibold tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </header>
      {children}
    </section>
  );
}

function SubTitle({ text }: any) {
  return <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mt-6 mb-2">{text}</h3>;
}

function Field({ label, value, sub }: any) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-sm font-semibold">{value}</div>
      {sub && <div className="text-[11px] text-muted-foreground">{sub}</div>}
    </div>
  );
}

function StatBlock({ label, value, sub }: any) {
  return (
    <div className="rounded-md border border-border bg-surface/60 p-4">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-1 font-display text-3xl font-semibold text-gradient-gold">{value}</div>
      <div className="text-[11px] text-muted-foreground mt-0.5">{sub}</div>
    </div>
  );
}
