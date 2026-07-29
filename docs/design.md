# GDD design overview

How Get Diligence Done encodes a commercial due-diligence engagement as an
agentic workflow: the hierarchy, the persistent state artifacts, the command
surface, the agents, and — most importantly — the verification semantics.

GDD follows the process-encoding pattern proven by
[GSD](https://github.com/open-gsd/get-shit-done-redux): a deterministic
engagement spine with open-ended analytical leaves, persistent state in
markdown plus a machine lock, and a verification gate run by a fresh-context
agent. Naming and installer conventions follow that precedent; the domain
content is GDD's own.

## The engagement hierarchy

GSD's Project → Milestone → Phase → Plan → Task becomes:

| GSD | GDD | Notes |
|---|---|---|
| Project | **Engagement** | one deal, one deadline |
| Milestone | **Sprint / review checkpoint** | week boundaries, IC pre-read, final readout |
| Phase | **Module** | market, competition, customers, company/moat, risks |
| Plan | **Module workplan** | hypotheses × analyses × sources for one module |
| Task | **Analysis** | one sizing, one profile, one interview synthesis |

Engagement state lives in a `.diligence/` directory inside the user's deal
folder — never in this repo (it's gitignored).

## Persistent state artifacts

Each artifact has a template in `gdd-core/templates/`; a command fills it.

| File in `.diligence/` | Purpose |
|---|---|
| `ENGAGEMENT.md` | Engagement brief: target, client context, investment thesis, key questions, deadline, scope in/out |
| `TAXONOMY.md` | The convention lock: segment definitions, geography, currency/units/FX, time basis (CY/FY), source hierarchy (filings > paid data > press > blogs), defined terms |
| `WORKPLAN.md` | Workstreams × weeks; module status; dependency order |
| `STATE.md` | Position in the loop, last-session summary, next actions |
| `LEDGER.md` | Findings ledger: numbered findings, each with claim, evidence, source citation, confidence (H/M/L), open questions |
| `SOURCES.md` | Source registry: every source, its tier per the taxonomy hierarchy, access date, reliability notes |
| `modules/<name>/BRIEF.md` | Module brief: hypotheses to test, analyses planned, sources to hit |
| `modules/<name>/FINDINGS.md` | Module output including the numbers, feeding the ledger |
| `reports/TRIANGULATION.md` | Verification report: unit checks, TD/BU reconciliation within tolerance, MECE audit, citation coverage, thesis sensitivity |
| `reports/REDTEAM.md` | Red-team pass: strongest case against the thesis; findings that don't survive scrutiny |
| `reports/STORYLINE.md` | Pyramid-principle storyline: governing thought, key line, supports mapped to ledger findings |

The taxonomy lock is also mirrored into `state.json` as machine truth, so a
fresh-context agent can enforce conventions without re-reading prose.

## Command surface

Namespace: `/gdd:*` in Claude Code; cross-runtime prefixes are applied by the
installer per `runtime-catalog.json`. The MVP path is in **bold**.

| Command | What it does |
|---|---|
| `/gdd:help`, `/gdd:start`, `/gdd:tour` | onboarding ladder |
| **`/gdd:scope-deal`** | interview the user → write `ENGAGEMENT.md` + initial `TAXONOMY.md`; locks conventions before any analysis |
| **`/gdd:hypothesis-tree`** | decompose the thesis into a MECE hypothesis tree → module briefs |
| **`/gdd:workplan`** | lay modules across the timeline → `WORKPLAN.md` |
| **`/gdd:size-market`** | flagship module: top-down AND bottom-up sizing in fresh, independent subagents, then reconcile |
| **`/gdd:map-competitors`** | competitive set, positioning, share estimates with citations |
| `/gdd:probe-customers` | customer evidence up the evidence ladders — retention, satisfaction, KPCs |
| `/gdd:assess-moat` | test moat claims mechanism by mechanism, kill-tests run at build time |
| `/gdd:scan-risks` | standing risk screens — trip conditions, bounded deep dives, evidence-of-search |
| **`/gdd:triangulate`** | run verifier agents → `reports/TRIANGULATION.md`; the consistency gate |
| **`/gdd:red-team`** | adversarial pass on thesis + ledger → `reports/REDTEAM.md` |
| **`/gdd:storyline`** | pyramid-principle synthesis from surviving findings |
| `/gdd:resume-work`, `/gdd:pause-work` | reload / hand off engagement state across sessions |

Post-MVP commands anticipated by the design (not yet shipped): interview-guide
and call-synthesis for expert programs, a data-room module family, and
report drafting.

## Agents

Ten fresh-context subagents, each with a narrow remit:

| Agent | Role |
|---|---|
| `gdd-scoper` | runs the engagement-brief interview, drafts the taxonomy |
| `gdd-planner` | hypothesis trees, module briefs, workplans |
| `gdd-researcher` | fresh-context evidence gathering; every claim cited per the source hierarchy |
| `gdd-sizer-topdown` / `gdd-sizer-bottomup` | independent market sizers — deliberately separate agents so estimates can't contaminate each other |
| `gdd-analyst` | general module executor (competitor profiles, moat analysis) |
| `gdd-verifier` | triangulation: units, TD/BU reconciliation, MECE audit, citation coverage, sensitivity |
| `gdd-red-teamer` | strongest case against; flags findings that die under scrutiny |
| `gdd-storyliner` | pyramid-principle synthesis |
| `gdd-librarian` | keeps `SOURCES.md` + `LEDGER.md` hygienic; checks taxonomy compliance |

The two independent sizers are the design's signature: forcing top-down and
bottom-up into separate contexts is what makes their reconciliation a real
check rather than a self-fulfilling average.

## Verification semantics — the honest claim

GDD's verification is **consistency and traceability, not truth.** The
verifier checks, mechanically where possible:

1. **Units / currency / time-basis** consistency with `TAXONOMY.md` — every
   number carries units; FX and CY/FY conversions are explicit.
2. **Top-down vs bottom-up reconciliation** within a declared tolerance
   (default ±30%); divergence forces a documented explanation or re-work,
   never a silent average.
3. **MECE audit** of segment trees against the taxonomy definitions.
4. **Citation coverage** — every ledger finding traces to a `SOURCES.md`
   entry, and the source tier matches the weight the claim carries.
5. **Thesis sensitivity** — the top assumptions are flexed; does the
   storyline survive?

GDD never claims "the market is actually $X." It claims the work product is
internally consistent and fully traceable — which is exactly the QA a good
engagement manager performs. That wording lives in the verifier prompts and
is the promise the tool is built to keep.
