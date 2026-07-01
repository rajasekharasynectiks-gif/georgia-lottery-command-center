import { createFileRoute } from "@tanstack/react-router";
import { AppShell, SectionCard, Pill, StatCard } from "@/components/shell/AppShell";
import { PlayCircle, FileText, MousePointerClick, Award, GraduationCap, CheckCircle2, Users, Timer } from "lucide-react";

export const Route = createFileRoute("/training")({ component: Page, head: () => ({ meta: [{ title: "Training Portal — GLC" }] }) });

const modules = [
  { k: "Platform Fundamentals", d: "System overview & navigation", dur: "45 min", cov: 100, tone: "success" },
  { k: "Applicant Journey", d: "End-to-end retailer onboarding", dur: "1h 20m", cov: 82, tone: "info" },
  { k: "Reviewer Workbench", d: "Application processing & decisions", dur: "2h", cov: 64, tone: "info" },
  { k: "Compliance Officer Path", d: "Escalations, appeals, sanctions", dur: "1h 40m", cov: 40, tone: "warn" },
  { k: "Administrator Certification", d: "RBAC, config, integrations", dur: "3h", cov: 22, tone: "warn" },
  { k: "Security Awareness", d: "Phishing, PII, incident response", dur: "30 min", cov: 96, tone: "success" },
];

function Page() {
  return (
    <AppShell title="Training Portal" subtitle="Role-based training with interactive walkthroughs, video, assessments, and certification tracking." breadcrumb={["Support", "Training"]}
      actions={<Pill tone="primary">Enterprise LMS</Pill>}>
      <div className="grid md:grid-cols-4 gap-4">
        <StatCard label="Learners" value="1,204" icon={Users} delta="Across all roles" />
        <StatCard label="Completion Rate" value="87%" tone="up" icon={CheckCircle2} delta="▲ 12 pts YoY" />
        <StatCard label="Avg Time to Certify" value="4.6 h" icon={Timer} delta="▼ 22% w/ walkthroughs" tone="up" />
        <StatCard label="Certificates Issued" value="912" icon={Award} delta="This year" />
      </div>

      <SectionCard title="Learning Modules">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
          {modules.map(m=>(
            <div key={m.k} className="rounded-md border border-border bg-surface/60 p-4">
              <div className="flex items-center justify-between"><div className="text-sm font-semibold">{m.k}</div><Pill tone={m.tone as any}>{m.cov}%</Pill></div>
              <div className="text-[11px] text-muted-foreground mt-1">{m.d}</div>
              <div className="mt-3 h-1 bg-muted rounded-full overflow-hidden"><div className="h-full" style={{ width: m.cov+"%", background: m.tone==="success"?"var(--color-success)":m.tone==="warn"?"var(--color-warning)":"var(--color-info)" }} /></div>
              <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1"><PlayCircle className="size-3.5" /> Video</span>
                <span className="inline-flex items-center gap-1"><FileText className="size-3.5" /> Docs</span>
                <span className="inline-flex items-center gap-1"><MousePointerClick className="size-3.5" /> Walk-through</span>
                <span className="ml-auto">{m.dur}</span>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="grid xl:grid-cols-3 gap-4">
        {[
          ["Administrator Training","23 modules · 12 hours · certification","primary"],
          ["Applicant Training","6 modules · self-paced · 45 min","info"],
          ["Support Training","14 modules · escalation matrices · scripts","success"],
        ].map((r,i)=>(
          <SectionCard key={i} title={r[0]}>
            <div className="text-xs text-muted-foreground">{r[1]}</div>
            <div className="mt-3 flex gap-2"><button className="h-8 rounded-md bg-primary px-3 text-[11px] font-semibold text-primary-foreground">Start Track</button><button className="h-8 rounded-md border border-border px-3 text-[11px]">Preview</button></div>
          </SectionCard>
        ))}
      </div>
    </AppShell>
  );
}