import { createFileRoute } from "@tanstack/react-router";
import { AppShell, SectionCard, Pill } from "@/components/shell/AppShell";
import { BookOpen, HelpCircle, ShieldCheck, PlayCircle, GraduationCap, FileText, Wrench, Search, Bookmark, Star } from "lucide-react";

export const Route = createFileRoute("/knowledge-base")({ component: Page, head: () => ({ meta: [{ title: "Knowledge Base - GLC" }] }) });

const cats = [
  { i: BookOpen, k: "User Guides", n: 42 },
  { i: HelpCircle, k: "FAQs", n: 128 },
  { i: ShieldCheck, k: "Policies", n: 24 },
  { i: PlayCircle, k: "Videos", n: 61 },
  { i: GraduationCap, k: "Training", n: 18 },
  { i: FileText, k: "Release Notes", n: 47 },
  { i: Wrench, k: "Troubleshooting", n: 89 },
  { i: FileText, k: "Documentation", n: 214 },
];

const featured = [
  { t: "Retailer onboarding - complete walkthrough", cat: "User Guides", read: "12 min", tag: "success" },
  { t: "Understanding license renewal windows", cat: "Policies", read: "6 min", tag: "info" },
  { t: "Troubleshooting document uploads", cat: "Troubleshooting", read: "8 min", tag: "warn" },
  { t: "Payment failed - next steps", cat: "FAQ", read: "3 min", tag: "info" },
  { t: "What's new in Phase 5", cat: "Release Notes", read: "10 min", tag: "primary" },
  { t: "Configuring 2FA on your account", cat: "User Guides", read: "5 min", tag: "success" },
];

function Page() {
  return (
    <AppShell title="Knowledge Base" subtitle="Self-serve documentation, training, FAQs, and troubleshooting for applicants, retailers, administrators, and support." breadcrumb={["Support", "Knowledge Base"]}>
      <div className="panel p-8 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-2xl">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Search across 645 articles, 61 videos, and 89 troubleshooting guides</div>
          <div className="mt-3 h-12 flex items-center gap-3 rounded-lg border border-border bg-background/60 px-4">
            <Search className="size-4 text-muted-foreground" />
            <input className="flex-1 bg-transparent outline-none text-sm" placeholder="How do I renew a license, upload documents, reset MFA?" />
            <span className="text-[10px] font-mono text-muted-foreground">Enter ↵</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] text-muted-foreground">
            {["renew license","reset MFA","upload documents","payment failed","2FA setup","refund policy"].map(t=>(<span key={t} className="rounded-full border border-border bg-surface/60 px-2.5 py-1">{t}</span>))}
          </div>
        </div>
      </div>

      <SectionCard title="Categories">
        <div className="grid md:grid-cols-4 gap-3">
          {cats.map(c=>(
            <div key={c.k} className="group rounded-md border border-border bg-surface/60 p-4 hover:border-primary/50 hover:bg-surface-2 transition-colors cursor-pointer">
              <div className="flex items-center justify-between"><c.i className="size-5 text-primary" /><span className="text-[11px] text-muted-foreground">{c.n} articles</span></div>
              <div className="mt-3 text-sm font-semibold">{c.k}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">Browse →</div>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="grid xl:grid-cols-[1.4fr_1fr] gap-4">
        <SectionCard title="Featured Articles" right={<Pill tone="info">Editor's pick</Pill>}>
          <ul className="divide-y divide-border -my-2">
            {featured.map((a,i)=>(
              <li key={i} className="py-3 flex items-start gap-3">
                <div className="size-9 rounded-md bg-primary/10 border border-primary/20 grid place-items-center text-primary shrink-0"><BookOpen className="size-4" /></div>
                <div className="flex-1 min-w-0"><div className="text-sm font-semibold truncate">{a.t}</div><div className="text-[11px] text-muted-foreground">{a.cat} · {a.read} read</div></div>
                <Pill tone={a.tag as any}>{a.tag==="warn"?"Fix":a.tag==="primary"?"New":"Guide"}</Pill>
              </li>
            ))}
          </ul>
        </SectionCard>
        <SectionCard title="Your Bookmarks & Favorites">
          <ul className="space-y-2 text-xs">
            {["Retailer onboarding","Renewal windows","Payment troubleshooting","Voltage encryption FAQ"].map((t,i)=>(
              <li key={i} className="flex items-center gap-2 rounded-md border border-border bg-surface/60 px-3 py-2"><Bookmark className="size-3.5 text-primary" /><span className="flex-1">{t}</span><Star className="size-3.5 text-warning" /></li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </AppShell>
  );
}