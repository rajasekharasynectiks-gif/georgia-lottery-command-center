
# Plan — Solution Architecture Submission Package

Reshape the current Command Center into a **focused Solution Architecture microsite** aligned to RFA scope, plus a **print-ready package** the evaluators can attach to the response.

## 1. Trim navigation to architecture-only

Keep and elevate the six routes that directly answer "Solution Architecture":

| Kept route | Purpose in RFA |
|---|---|
| `/` (Overview) | Repositioned as **Solution Architecture Overview** — one-glance summary with NFRs, deployment modes, tech stack |
| `/architecture` | Logical + physical topology, trust zones, DMZ |
| `/workflow` | End-to-end application lifecycle (BPMN swim lanes) |
| `/integrations` | External systems: Melissa, MerchantOne, ActivePDF, Voltage, SMTP, IdP |
| `/encryption` | Voltage field-level encryption + key management |
| `/disaster-recovery` | RTO/RPO, failover topology (architectural, not ops) |

Hide (do not delete — kept in code for future phases) from the sidebar:
`operations`, `devops`, `security`, `veracode`, `audit`, `knowledge-base`, `training`, `support`, `executive`, `presentation`, `roadmap`.

Rationale: `security` and `audit` are architecture-adjacent, but the RFA "Solution Architecture" section usually has separate response sections for Security and Compliance — keeping them out of this microsite avoids evaluator confusion. They stay reachable via direct URL for later phases.

## 2. Enhance `/architecture` with layered views

Add a tabbed switcher inside the existing Trust-zoned Topology card:

- **Logical view** — current trust-zone diagram (kept as-is)
- **Physical / Deployment view** — new: on-prem primary DC + secondary DC + Azure Gov burst, with load balancers, WAF, HSM, backup targets
- **Data-flow view** — new: numbered sequence from applicant → portal → API GW → workflow → payment → audit → notification
- **Integration view** — new: hub-and-spoke diagram with each third party, protocol (HTTPS/SFTP/SOAP), and data classification

All four views use the same enterprise design system (OKLCH tokens, gold/green accents, grid-bg, flow-line animation).

## 3. Add a Solution Architecture landing page

Rewrite `/` to a purpose-built RFA landing:

- Hero: "Georgia Lottery Retailer Licensing — Solution Architecture"
- Executive summary paragraph (3-4 lines)
- Architecture principles grid (Zero-trust, Modular, Event-driven, Cloud-portable, Observable, Compliant)
- NFR strip (Availability, RTO, RPO, Latency, Concurrent Users, Peak TPS)
- Six "Jump to" tiles linking to the kept routes
- Version, revision date, prepared-for/prepared-by block

## 4. Print / PDF mode

Add `?print` query param support (or `/print` route) that renders **all six architecture pages stacked vertically**, each fitting a landscape page. Print CSS:

```text
@page { size: Letter landscape; margin: 0.4in }
.section { page-break-after: always }
header.app-shell { display: none }  /* hide sidebar/topbar */
```

- Auto-injects a cover page (title, GLC seal placeholder, revision, date)
- Auto-injects a section divider before each route's content
- Uses light theme automatically for print (dark mode is on-screen only)
- Evaluators run **Cmd/Ctrl+P → Save as PDF** and get a submission-ready deck

Additionally, generate a **pre-built PDF artifact** at `/mnt/documents/GLC-Solution-Architecture-v5.pdf` using Playwright to print the `?print` route headlessly, so you have a downloadable file to attach to the RFA response immediately.

## 5. Design system

No changes. Same OKLCH tokens, same components (`SectionCard`, `Pill`, `StatCard`), same typography, same animations. Dark mode toggle stays.

## Technical details

- `src/components/shell/AppShell.tsx` — filter the nav array to the six kept routes; add a `?print` mode branch that hides shell chrome.
- `src/routes/index.tsx` — rewrite content to the RFA landing (keep file, keep route).
- `src/routes/architecture.tsx` — add a `useState` view switcher with 4 tabs; add three new diagram components below the existing one.
- New `src/routes/print.tsx` — imports and stacks the six route bodies with page-break dividers.
- New `src/styles.css` `@media print` block — page size, hide chrome, force light theme.
- New `scripts/build-architecture-pdf.mjs` — Playwright script that navigates to `/print`, waits for charts, saves PDF to `/mnt/documents/`.

## Out of scope

- No changes to security, audit, ops, devops, executive, presentation, roadmap pages (kept in code, hidden from nav).
- No new business logic or backend.
- No re-theming.

## Deliverables

1. Live microsite at 6 focused routes, matching Phases 1-4 design system.
2. `/print` route for browser-based PDF export.
3. `GLC-Solution-Architecture-v5.pdf` artifact in `/mnt/documents/` ready to attach to the RFA response.
