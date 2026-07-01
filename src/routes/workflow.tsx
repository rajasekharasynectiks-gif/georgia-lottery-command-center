import { createFileRoute } from "@tanstack/react-router";
import { AppShell, SectionCard, Pill } from "@/components/shell/AppShell";
import { UserPlus, ShieldCheck, FilePlus2, Save, Users2, Upload, Eye, Send, Cog, CreditCard, Wallet, Gavel, CheckCheck, Award } from "lucide-react";

export const Route = createFileRoute("/workflow")({ component: Page,
  head: () => ({ meta: [{ title: "Application Workflow — GLC" }, { name: "description", content: "End-to-end retailer licensing workflow with swim lanes and decision paths." }] }),
});

const lanes = ["Applicant", "System", "GLC Reviewer", "Compliance"] as const;
type Lane = typeof lanes[number];

const steps: { key: string; label: string; lane: Lane; icon: any; state?: "done"|"active"|"pending"|"decision"; note?: string }[] = [
  { key: "reg", label: "Registration", lane: "Applicant", icon: UserPlus, state: "done" },
  { key: "2fa", label: "2FA Verification", lane: "System", icon: ShieldCheck, state: "done" },
  { key: "create", label: "Application Creation", lane: "Applicant", icon: FilePlus2, state: "done" },
  { key: "draft", label: "Save Draft", lane: "System", icon: Save, state: "done" },
  { key: "own", label: "Owner Management", lane: "Applicant", icon: Users2, state: "done" },
  { key: "doc", label: "Document Upload", lane: "Applicant", icon: Upload, state: "done" },
  { key: "rev", label: "Review", lane: "Applicant", icon: Eye, state: "active" },
  { key: "sub", label: "Submission", lane: "Applicant", icon: Send, state: "pending" },
  { key: "proc", label: "Application Processing", lane: "GLC Reviewer", icon: Cog, state: "pending", note: "Decision node" },
  { key: "payreq", label: "Payment Request", lane: "System", icon: CreditCard, state: "pending" },
  { key: "pay", label: "Payment Processing", lane: "Applicant", icon: Wallet, state: "pending" },
  { key: "comp", label: "Compliance Review", lane: "Compliance", icon: Gavel, state: "pending", note: "Escalation gate" },
  { key: "final", label: "Final Processing", lane: "GLC Reviewer", icon: CheckCheck, state: "pending" },
  { key: "done", label: "Completion", lane: "System", icon: Award, state: "pending" },
];

function Page() {
  return (
    <AppShell title="Application Workflow" subtitle="Registration → Completion. BPMN-style swim lanes, decision nodes, error handling and escalation paths." breadcrumb={["Architecture", "Workflow"]}
      actions={<><Pill tone="info">BPMN 2.0</Pill><Pill>14 stages</Pill></>}>
      <SectionCard title="End-to-End Workflow" description="Applicant · System · Reviewer · Compliance swim lanes">
        <div className="overflow-x-auto">
          <div className="min-w-[1080px] grid grid-cols-[140px_1fr] gap-2">
            {lanes.map((lane) => (
              <FragmentRow key={lane} lane={lane} steps={steps.filter(s => s.lane === lane)} />
            ))}
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3 text-[11px]">
          <LegendDot color="var(--color-success)" label="Completed" />
          <LegendDot color="var(--color-primary)" label="Active" />
          <LegendDot color="var(--color-muted-foreground)" label="Pending" />
          <LegendDot color="var(--color-warning)" label="Decision" />
          <LegendDot color="var(--color-destructive)" label="Escalation / retry" />
        </div>
      </SectionCard>

      <div className="grid lg:grid-cols-3 gap-4">
        <SectionCard title="Decision Nodes">
          <ul className="text-xs space-y-2">
            {[
              ["Eligibility Check","Automated · rules engine · 12 rules"],
              ["Document Validation","AI-assisted OCR + manual review"],
              ["Compliance Gate","4-eye approval required"],
              ["Payment Verification","MerchantOne callback confirmation"],
            ].map(([k,v]) => (
              <li key={k} className="rounded-md border border-border bg-surface/60 p-2.5">
                <div className="font-semibold">{k}</div>
                <div className="text-muted-foreground">{v}</div>
              </li>
            ))}
          </ul>
        </SectionCard>
        <SectionCard title="Error & Retry Paths">
          <ul className="text-xs space-y-2">
            <li className="flex items-start gap-2"><span className="mt-1 status-dot text-warning" /> Payment failure → automatic retry (3x, exponential backoff) → alternate rail</li>
            <li className="flex items-start gap-2"><span className="mt-1 status-dot text-warning" /> Document rejection → applicant re-upload with review notes</li>
            <li className="flex items-start gap-2"><span className="mt-1 status-dot text-destructive" /> Compliance rejection → appeal workflow (30d SLA)</li>
            <li className="flex items-start gap-2"><span className="mt-1 status-dot text-info" /> Integration timeout → circuit breaker + queue for replay</li>
          </ul>
        </SectionCard>
        <SectionCard title="Escalation Matrix">
          <table className="w-full text-xs">
            <thead className="text-muted-foreground"><tr className="text-left"><th className="py-1.5">Level</th><th>Role</th><th>SLA</th></tr></thead>
            <tbody className="[&_tr]:border-t [&_tr]:border-border">
              {[["L1","Reviewer","4h"],["L2","Sr. Reviewer","1 business day"],["L3","Compliance Lead","2 business days"],["L4","Program Director","3 business days"]].map((r)=>(
                <tr key={r[0]}><td className="py-1.5 font-medium">{r[0]}</td><td>{r[1]}</td><td className="text-muted-foreground">{r[2]}</td></tr>
              ))}
            </tbody>
          </table>
        </SectionCard>
      </div>
    </AppShell>
  );
}

function FragmentRow({ lane, steps }: { lane: Lane; steps: any[] }) {
  return (
    <>
      <div className="rounded-md border border-border bg-sidebar/50 p-3 flex items-center text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{lane}</div>
      <div className="rounded-md border border-border bg-background/40 p-3 flex items-center gap-2 overflow-x-auto">
        {steps.map((s, i) => (
          <div key={s.key} className="flex items-center gap-2 shrink-0">
            <StepNode s={s} />
            {i < steps.length - 1 && <Arrow />}
          </div>
        ))}
        {steps.length === 0 && <span className="text-[11px] text-muted-foreground">—</span>}
      </div>
    </>
  );
}

function StepNode({ s }: { s: any }) {
  const tone =
    s.state === "done" ? "border-success/50 bg-success/10" :
    s.state === "active" ? "border-primary bg-primary/15 shadow-[var(--shadow-glow)]" :
    s.state === "decision" ? "border-warning/50 bg-warning/10" :
    "border-border bg-surface";
  return (
    <div className={"min-w-[170px] rounded-md border p-2.5 " + tone}>
      <div className="flex items-center gap-2">
        <s.icon className="size-4" />
        <div className="text-xs font-semibold truncate">{s.label}</div>
      </div>
      {s.note && <div className="mt-1 text-[10px] text-muted-foreground">{s.note}</div>}
    </div>
  );
}

function Arrow() { return <svg width="24" height="10"><path d="M0 5 H20 M16 1 L22 5 L16 9" stroke="var(--color-primary)" strokeWidth="1.4" fill="none" className="flow-line" /></svg>; }
function LegendDot({ color, label }: { color: string; label: string }) { return <span className="inline-flex items-center gap-2"><span className="size-2 rounded-full" style={{ background: color, boxShadow: `0 0 0 3px ${color}22` }} />{label}</span>; }