import { createFileRoute } from "@tanstack/react-router";
import { AppShell, SectionCard, Pill } from "@/components/shell/AppShell";
import { CheckCircle2, Circle, Rocket } from "lucide-react";

export const Route = createFileRoute("/roadmap")({ component: Page, head: () => ({ meta: [{ title: "Future Roadmap - GLC" }] }) });

const phases = [
  { n: "Phase 1", title: "Core Licensing", period: "2024 · Q3", state: "done", pts: ["Applicant portal","Workflow engine","Document services","Payment core"] },
  { n: "Phase 2", title: "Workflow Automation", period: "2024 · Q4", state: "done", pts: ["Rules engine v2","Owner management","Compliance gates"] },
  { n: "Phase 3", title: "Analytics", period: "2025 · Q1", state: "done", pts: ["Executive dashboards","Ad-hoc reports","Data warehouse"] },
  { n: "Phase 4", title: "AI Assistance", period: "2025 · Q3", state: "done", pts: ["OCR & doc classification","Applicant copilot","Reviewer suggestions"] },
  { n: "Phase 5", title: "Enterprise Ops & Security", period: "2025 · Q4 (current)", state: "active", pts: ["Voltage encryption","Veracode gates","Command center","DR & DevOps"] },
  { n: "Phase 6", title: "Cloud Migration", period: "2026 · Q2", state: "planned", pts: ["Azure Gov landing zone","Blue/green cut-over","FedRAMP Moderate ATO"] },
  { n: "Phase 7", title: "Mobile Applications", period: "2026 · Q3", state: "planned", pts: ["Native iOS/Android","Biometric auth","Offline drafts"] },
  { n: "Phase 8", title: "Predictive Analytics", period: "2026 · Q4", state: "planned", pts: ["Fraud detection ML","Renewal forecasting","Capacity planning"] },
];

function Page() {
  return (
    <AppShell title="Future Roadmap" subtitle="Multi-year delivery roadmap - from core licensing through cloud migration, mobile, and predictive analytics." breadcrumb={["Architecture", "Roadmap"]}
      actions={<><Pill tone="success">On Track</Pill><Pill tone="info">FY2026 · Q4</Pill></>}>
      <SectionCard title="Program Timeline">
        <div className="relative overflow-x-auto">
          <div className="min-w-[900px]">
            <div className="relative h-2 rounded-full bg-muted my-6"><div className="absolute inset-y-0 left-0 w-[62%] rounded-full bg-gradient-to-r from-success via-primary to-info" /></div>
            <div className="grid grid-cols-8 gap-2">
              {phases.map((p,i)=>(
                <div key={p.n} className="flex flex-col items-center text-center">
                  <div className={"size-8 rounded-full grid place-items-center border " + (p.state==="done"?"bg-success/20 border-success text-success":p.state==="active"?"bg-primary/20 border-primary text-primary shadow-[var(--shadow-glow)]":"bg-muted border-border text-muted-foreground")}>{p.state==="done"?<CheckCircle2 className="size-4" />:p.state==="active"?<Rocket className="size-4" />:<Circle className="size-4" />}</div>
                  <div className="mt-2 text-[10px] font-mono tracking-widest text-muted-foreground">{p.n}</div>
                  <div className="text-[11px] font-semibold leading-tight mt-0.5">{p.title}</div>
                  <div className="text-[10px] text-muted-foreground">{p.period}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-3">
        {phases.map(p=>(
          <div key={p.n} className={"rounded-lg border p-4 " + (p.state==="active"?"border-primary/50 bg-primary/5":"border-border bg-surface/60")}>
            <div className="flex items-center justify-between"><Pill tone={p.state==="done"?"success":p.state==="active"?"primary":"muted"}>{p.state==="done"?"Delivered":p.state==="active"?"In Progress":"Planned"}</Pill><span className="text-[10px] font-mono text-muted-foreground">{p.period}</span></div>
            <div className="mt-3 text-[10px] uppercase tracking-widest text-muted-foreground">{p.n}</div>
            <div className="text-sm font-semibold">{p.title}</div>
            <ul className="mt-3 space-y-1 text-[11px] text-muted-foreground">
              {p.pts.map((t,i)=>(<li key={i} className="flex items-start gap-1.5"><span className="mt-1.5 size-1 rounded-full bg-primary" />{t}</li>))}
            </ul>
          </div>
        ))}
      </div>
    </AppShell>
  );
}