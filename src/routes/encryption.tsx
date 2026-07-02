import { createFileRoute } from "@tanstack/react-router";
import { AppShell, SectionCard, Pill, StatCard } from "@/components/shell/AppShell";
import { Upload, FileCheck2, Bug, ShieldCheck, Database, KeyRound, Unlock, ScrollText, EyeOff } from "lucide-react";

export const Route = createFileRoute("/encryption")({ component: Page, head: () => ({ meta: [{ title: "Voltage Encryption Architecture - GLC" }] }) });

const flow = [
  { i: Upload, k: "User Upload", d: "Client-side pre-check · size, type, hash", tone: "info" },
  { i: FileCheck2, k: "File Validation", d: "MIME, signature, structural validation", tone: "info" },
  { i: Bug, k: "Malware Scan", d: "Kaspersky · ClamAV dual engine", tone: "warn" },
  { i: ShieldCheck, k: "Voltage Encryption", d: "Format-preserving · FPE / SST · FIPS 140-2 L3", tone: "primary" },
  { i: Database, k: "SQL Storage", d: "Encrypted blob + metadata · TDE", tone: "success" },
  { i: KeyRound, k: "Access Request", d: "ABAC evaluation · dual-control on PII", tone: "info" },
  { i: Unlock, k: "Decryption", d: "Just-in-time · session-scoped keys", tone: "primary" },
  { i: ScrollText, k: "Audit Logging", d: "Immutable · signed · SIEM stream", tone: "success" },
];

function Page() {
  return (
    <AppShell title="Voltage Encryption Architecture" subtitle="Field-level, format-preserving encryption for PII and documents - FIPS 140-2, HSM-backed key management, dual-control decryption." breadcrumb={["Security", "Encryption"]}
      actions={<><Pill tone="success">FIPS 140-2</Pill><Pill tone="info">HSM-backed</Pill></>}>
      <div className="grid md:grid-cols-4 gap-4">
        <StatCard label="Encrypted Fields" value="147" delta="Across 42 tables" icon={EyeOff} />
        <StatCard label="Key Rotations (30d)" value="812" delta="0 manual" tone="up" icon={KeyRound} />
        <StatCard label="Decrypt Events (24h)" value="3,214" delta="All authorized" tone="up" icon={Unlock} />
        <StatCard label="Unauthorized Attempts" value="0" delta="Continuous baseline" tone="up" icon={ShieldCheck} />
      </div>

      <SectionCard title="Encryption Workflow" description="From upload through storage to access and audit">
        <div className="grid md:grid-cols-4 xl:grid-cols-8 gap-2">
          {flow.map((s, i) => (
            <div key={s.k} className="relative rounded-lg border border-border bg-surface/60 p-3">
              <div className="absolute -top-2 left-3 text-[10px] font-mono tracking-widest text-muted-foreground bg-background px-1.5 rounded">STEP {String(i+1).padStart(2,"0")}</div>
              <s.i className="size-5 text-primary" />
              <div className="mt-2 text-xs font-semibold">{s.k}</div>
              <div className="text-[10.5px] text-muted-foreground mt-0.5 leading-snug">{s.d}</div>
              {i < flow.length - 1 && <div className="hidden xl:block absolute top-1/2 -right-1.5 -translate-y-1/2 text-primary">→</div>}
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="grid lg:grid-cols-3 gap-4">
        <SectionCard title="Key Management">
          <ul className="text-xs space-y-2">
            <li className="rounded-md border border-border bg-surface/60 p-2.5"><div className="font-semibold">HSM Cluster</div><div className="text-muted-foreground">Thales Luna Network HSM · 3-node cluster · FIPS L3</div></li>
            <li className="rounded-md border border-border bg-surface/60 p-2.5"><div className="font-semibold">Rotation Policy</div><div className="text-muted-foreground">DEK 24h · KEK 90d · Master 12mo</div></li>
            <li className="rounded-md border border-border bg-surface/60 p-2.5"><div className="font-semibold">Custody</div><div className="text-muted-foreground">Dual-control · M-of-N (3-of-5) reconstruction</div></li>
          </ul>
        </SectionCard>
        <SectionCard title="Protected Fields & Classification">
          <table className="w-full text-xs">
            <thead className="text-muted-foreground"><tr className="text-left"><th className="py-1.5">Field</th><th>Class</th><th>Method</th></tr></thead>
            <tbody className="[&_tr]:border-t [&_tr]:border-border">
              {[["SSN","PII-Restricted","FPE"],["EIN","Sensitive","FPE"],["DOB","PII","FPE"],["Bank Acct","Financial","Tokenized"],["Address","PII","AES-GCM"],["Documents","Confidential","Envelope"]].map(r=>(
                <tr key={r[0]}><td className="py-1.5 font-medium">{r[0]}</td><td><Pill tone={r[1].includes("Restricted")?"danger":r[1]==="Sensitive"?"warn":"info"}>{r[1]}</Pill></td><td className="text-muted-foreground">{r[2]}</td></tr>
              ))}
            </tbody>
          </table>
        </SectionCard>
        <SectionCard title="Data Masking Preview">
          <div className="space-y-2 text-xs font-mono">
            {[["SSN","123-45-6789","***-**-6789"],["Account","4532 1234 5678 9010","•••• •••• •••• 9010"],["Email","jane.doe@example.com","j***.d**@example.com"],["Phone","(404) 555-0132","(404) ***-0132"]].map(([k,r,m])=>(
              <div key={k} className="rounded-md border border-border bg-surface/60 p-2.5">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{k}</div>
                <div className="flex items-center justify-between gap-3 mt-1"><span className="text-muted-foreground line-through">{r}</span><span className="text-primary">{m}</span></div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}