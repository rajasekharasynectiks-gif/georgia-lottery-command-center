import { createFileRoute } from "@tanstack/react-router";
import { AppShell, SectionCard, StatCard, Pill } from "@/components/shell/AppShell";
import { GitBranch, PlayCircle, Rocket, ShieldCheck, TestTube, Package, Undo2, CheckCircle2, CircleDot } from "lucide-react";

export const Route = createFileRoute("/devops")({ component: Page, head: () => ({ meta: [{ title: "DevOps - GLC" }] }) });

const stages = [
  { k: "Source", i: GitBranch, s: "main @ b8241fa", tone: "success" },
  { k: "Build", i: Package, s: "6m 12s · passed", tone: "success" },
  { k: "Test", i: TestTube, s: "1,842 tests · 100%", tone: "success" },
  { k: "Security", i: ShieldCheck, s: "Veracode · 0 critical", tone: "success" },
  { k: "Artifact", i: Package, s: "glc-web:5.0.1", tone: "success" },
  { k: "Deploy", i: Rocket, s: "prod · rolling", tone: "info" },
];

const envs = [
  { k: "Development", v: "5.1.0-alpha.14", dep: "20 min ago", tone: "info" },
  { k: "QA", v: "5.0.4-rc.2", dep: "3h ago", tone: "success" },
  { k: "UAT", v: "5.0.2", dep: "1d ago", tone: "success" },
  { k: "Production", v: "5.0.1", dep: "22 min ago", tone: "success" },
];

function Page() {
  return (
    <AppShell title="DevOps Dashboard" subtitle="Source, build, test, security scan, and release pipeline with environment gates, rollback, and approvals." breadcrumb={["Operations", "DevOps"]}
      actions={<><Pill tone="success">Green Build</Pill><Pill tone="info">Release Train #48</Pill></>}>
      <div className="grid md:grid-cols-4 gap-4">
        <StatCard label="Deploys (30d)" value="128" tone="up" delta="8× per day avg" icon={Rocket} />
        <StatCard label="Change Failure Rate" value="0.9%" tone="up" delta="Elite (DORA)" />
        <StatCard label="Lead Time" value="4h 12m" tone="up" delta="Commit → prod" />
        <StatCard label="MTTR" value="18 min" tone="up" delta="Elite (DORA)" />
      </div>

      <SectionCard title="Release Pipeline - glc-web v5.0.1" description="Every stage automated · human approval at prod gate">
        <div className="grid md:grid-cols-6 gap-2">
          {stages.map((s,i)=>(
            <div key={s.k} className={"rounded-lg border p-3 relative " + (s.tone==="success"?"border-success/40 bg-success/5":"border-info/40 bg-info/5")}>
              <div className="absolute -top-2 left-3 text-[10px] font-mono tracking-widest bg-background px-1.5 rounded text-muted-foreground">STAGE {i+1}</div>
              <div className="flex items-center gap-2"><s.i className="size-4 text-primary" /><div className="text-xs font-semibold">{s.k}</div></div>
              <div className="mt-2 text-[11px] text-muted-foreground">{s.s}</div>
              <div className="mt-2 flex items-center gap-1.5 text-[11px]">{s.tone==="success" ? <><CheckCircle2 className="size-3.5 text-success" /> <span className="text-success">Passed</span></> : <><CircleDot className="size-3.5 text-info" /> <span className="text-info">Running</span></>}</div>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="grid xl:grid-cols-[1.4fr_1fr] gap-4">
        <SectionCard title="Environment Status">
          <table className="w-full text-xs">
            <thead className="text-muted-foreground border-b border-border"><tr className="text-left [&_th]:py-2"><th>Environment</th><th>Version</th><th>Last Deploy</th><th>Health</th><th>Actions</th></tr></thead>
            <tbody className="[&_tr]:border-b [&_tr]:border-border/60">
              {envs.map(e=>(
                <tr key={e.k} className="hover:bg-surface/60">
                  <td className="py-2.5 font-medium">{e.k}</td>
                  <td className="py-2.5 font-mono">{e.v}</td>
                  <td className="py-2.5 text-muted-foreground">{e.dep}</td>
                  <td className="py-2.5"><Pill tone={e.tone as any}>Healthy</Pill></td>
                  <td className="py-2.5"><button className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground"><Undo2 className="size-3" /> Rollback</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </SectionCard>
        <SectionCard title="Build Quality">
          <ul className="text-xs space-y-2">
            <li className="rounded-md border border-border bg-surface/60 p-2.5"><div className="flex justify-between"><span>Code coverage</span><span className="font-display">87.4%</span></div><div className="mt-1.5 h-1 bg-muted rounded-full"><div className="h-full bg-success rounded-full" style={{width:"87.4%"}} /></div></li>
            <li className="rounded-md border border-border bg-surface/60 p-2.5"><div className="flex justify-between"><span>Static analysis</span><span className="font-display">A</span></div></li>
            <li className="rounded-md border border-border bg-surface/60 p-2.5"><div className="flex justify-between"><span>Security scan</span><span className="font-display">Passed</span></div></li>
            <li className="rounded-md border border-border bg-surface/60 p-2.5"><div className="flex justify-between"><span>Artifact repository</span><span className="font-mono text-[10px]">registry.glc.ga.gov</span></div></li>
          </ul>
        </SectionCard>
      </div>

      <SectionCard title="Release Approval Chain">
        <div className="flex flex-wrap gap-2 text-xs">
          {["Engineering Lead","QA Lead","Security","Compliance","Program Director"].map((r,i)=>(
            <div key={r} className="rounded-md border border-success/30 bg-success/5 px-3 py-2 flex items-center gap-2"><CheckCircle2 className="size-3.5 text-success" /><span className="font-semibold">{r}</span><span className="text-muted-foreground">approved · {i+1}h ago</span></div>
          ))}
        </div>
      </SectionCard>
    </AppShell>
  );
}