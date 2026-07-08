---
template: state
template_version: 2
---

# Deal state — {DEAL_NAME}

<!-- The session-continuity artifact: what a fresh session must know to
continue without re-deriving anything. Lossy human projection of
state.json — when they disagree, report it (resume-work) and let the
librarian reconcile toward machine truth.

Keep under ~120 lines: this file is read at the start of every session,
so bloat here is a context tax on everything. Move stale detail to
Archive; /gdd:pause-work and module agents update it, nobody narrates in
it. Write positions, not prose. -->

## Position

<!-- One paragraph, present tense: where the engagement stands right
now. e.g.: "Scoped and planned; market module reconciled and in the
ledger; competition module in flight (researcher outputs in, share math
pending); triangulation not yet run. 9 days to interim readout." -->

## Module status

<!-- One row per module. Status ∈ pending / in-progress / done /
blocked. Note = one line max, what a colleague needs ("blocked: churn
data needs data-room access"). -->

| Module | Status | Note |
|--------|--------|------|

## Gates

<!-- Mirror of state.json.gates — human-readable.
Triangulation: not-run / PASS / FAIL (n checks) / WAIVED · date
Red team: not-run / done (n kills, m dispositions open) · date -->

## Open questions

<!-- Live blockers and unknowns only (settled ones move to Session log).
Each: the question · what evidence/decision would settle it · who owns
it (a module, the user, an external party). -->

## Handoff

<!-- Written by /gdd:pause-work, consumed and cleared by
/gdd:resume-work (content moves to Session log on confirmed resume).
Four fields, always:
- Position: exact stopping point (file + section if mid-artifact)
- In-flight: partial work and where it lives
- Open decisions: what awaits the user, phrased as questions
- Next step: the single concrete action to take first -->

## Session log

<!-- One line per session, newest first: date · what moved. This is the
engagement's velocity record — keep it honest, including "no progress,
blocked on X". -->

## Archive

<!-- Older detail moved out of the sections above, most recent first. -->
