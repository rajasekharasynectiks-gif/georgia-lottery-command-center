import { createFileRoute } from "@tanstack/react-router";
import { AppShell, SectionCard, Pill } from "@/components/shell/AppShell";
import { Rocket, ShieldCheck, TrendingUp, Cloud, Wrench, Users, DollarSign, Award, Cpu, GaugeCircle } from "lucide-react";

export const Route = createFileRoute("/presentation")({ component: Page, head: () => ({ meta: [{ title: "Executive Presentation - GLC" }] }) });

function Page() {
  return (
    <AppShell title="Executive Presentation" subtitle="A concise, high-signal narrative for the Georgia Lottery executive review, evaluation committees, and RFP final presentation." breadcrumb={["Overview", "Presentation"]}
      actions={<><Pill tone="primary">Slide-ready</Pill><button className="h-9 rounded-md bg-primary px-3 text-xs font-semibold text-primary-foreground">Enter Full-screen</button></>}>
      {/* Hero slide */}
      <section className="panel relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute -top-24 -right-16 size-80 rounded-full blur-3xl bg-primary/25" />
        <div className="relative p-10 md:p-14">
          <Pill tone="primary">Georgia Lottery Corporation · RFP Final Presentation</Pill>
          <h1 className="mt-6 text-5xl md:text-6xl font-display font-semibold tracking-tight leading-[1.05]">
            A modern licensing platform - <span className="text-gradient-gold">built to secure, scale, and serve the State of Georgia.</span>
          </h1>
          <p className="mt-4 text-base text-muted-foreground max-w-3xl">Enterprise architecture, Voltage field-level encryption, Veracode-verified pipelines, 99.98% availability, and a delivery playbook designed for multi-decade operation.</p>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl">
            {[["99.98%","Availability"],["$27.6M","Annual Revenue"],["4.2 d","Avg Turnaround"],["A+","Security Score"]].map(([v,l])=>(
              <div key={l} className="rounded-lg border border-border bg-surface/60 backdrop-blur p-4"><div className="text-3xl font-display font-semibold text-gradient-gold">{v}</div><div className="text-[11px] uppercase tracking-widest text-muted-foreground mt-1">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* Slide 2 */}
      <Slide n="02" title="Business Benefits" icon={TrendingUp}>
        <div className="grid md:grid-cols-3 gap-3">
          {[["Faster Onboarding","Applications completed in 4.2 days - down from 6.2"],["Higher Approval Throughput","+22% applications processed per FTE"],["Revenue Assurance","End-to-end reconciliation with MerchantOne · zero unmatched"],["Better Applicant Experience","NPS +18 vs legacy portal"],["Auditability","Immutable trail meets state & federal audit standards"],["Cost of Operations","-34% $/application over 3 years"]].map((r,i)=>(
            <div key={i} className="rounded-md border border-border bg-surface/60 p-4"><div className="text-sm font-semibold">{r[0]}</div><div className="text-xs text-muted-foreground mt-1">{r[1]}</div></div>
          ))}
        </div>
      </Slide>

      <Slide n="03" title="Process & Operational Improvements" icon={GaugeCircle}>
        <div className="grid md:grid-cols-4 gap-3">
          {[["Digital-first","100% paperless workflow"],["Automation","70% of steps automated"],["Straight-through","Payments STP > 92%"],["SLA","Compliance decisions ≤ 5 business days"]].map(([k,v],i)=>(
            <div key={i} className="rounded-md border border-border bg-surface/60 p-4"><div className="text-xs uppercase tracking-widest text-muted-foreground">{k}</div><div className="mt-1 text-lg font-display font-semibold">{v}</div></div>
          ))}
        </div>
      </Slide>

      <Slide n="04" title="Security Benefits" icon={ShieldCheck}>
        <div className="grid md:grid-cols-3 gap-3">
          {[["Zero-trust architecture","mTLS between every service · continuous verification"],["Voltage field-level encryption","PII protected with format-preserving encryption"],["Continuous scanning","Veracode SAST/DAST/SCA on every commit"],["Immutable audit","7-year WORM retention · signed events"],["Threat detection","MTTD 42s · auto-mitigation for common patterns"],["Compliance","SOC 2, PCI DSS, NIST 800-53, FedRAMP-ready"]].map((r,i)=>(
            <div key={i} className="rounded-md border border-border bg-surface/60 p-4"><div className="text-sm font-semibold">{r[0]}</div><div className="text-xs text-muted-foreground mt-1">{r[1]}</div></div>
          ))}
        </div>
      </Slide>

      <Slide n="05" title="Technology Architecture" icon={Cpu}>
        <div className="grid md:grid-cols-4 gap-3">
          {[["Modular Services","Independently deployable business services"],["Event-driven","Async messaging for scale & resilience"],["Cloud-Ready","Azure Gov / AWS GovCloud terraform"],["Portable","On-prem, hybrid, or cloud with no rewrite"]].map(([k,v],i)=>(
            <div key={i} className="rounded-md border border-border bg-surface/60 p-4"><Cloud className="size-4 text-primary" /><div className="mt-2 text-sm font-semibold">{k}</div><div className="text-xs text-muted-foreground mt-1">{v}</div></div>
          ))}
        </div>
      </Slide>

      <Slide n="06" title="Business Value & ROI" icon={DollarSign}>
        <div className="grid md:grid-cols-4 gap-3">
          {[["3-year TCO","-34% vs legacy"],["Payback Period","14 months"],["Productivity Uplift","+22% per FTE"],["Risk Reduction","Insurance premium -12%"]].map(([k,v],i)=>(
            <div key={i} className="rounded-md border border-border bg-surface/60 p-4"><div className="text-[10px] uppercase tracking-widest text-muted-foreground">{k}</div><div className="mt-1 text-3xl font-display font-semibold text-gradient-gold">{v}</div></div>
          ))}
        </div>
      </Slide>

      <Slide n="07" title="Success Metrics - 12 months after go-live" icon={Award}>
        <ul className="grid md:grid-cols-2 gap-2 text-xs">
          {["≥ 99.95% platform availability","≤ 5 business day compliance decisions","≥ 95% first-time-right documentation","0 critical security findings for 90 days rolling","NPS ≥ 50 for applicants","100% audit coverage on regulated actions"].map((t,i)=>(
            <li key={i} className="rounded-md border border-border bg-surface/60 p-3 flex items-center gap-2"><span className="status-dot text-success" /> {t}</li>
          ))}
        </ul>
      </Slide>
    </AppShell>
  );
}

function Slide({ n, title, icon: Icon, children }: any) {
  return (
    <section className="panel overflow-hidden">
      <header className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-md bg-primary/10 border border-primary/20 grid place-items-center text-primary"><Icon className="size-5" /></div>
          <div><div className="text-[10px] font-mono tracking-widest text-muted-foreground">SLIDE {n}</div><h2 className="text-lg font-display font-semibold">{title}</h2></div>
        </div>
        <Pill>Executive</Pill>
      </header>
      <div className="p-6">{children}</div>
    </section>
  );
}