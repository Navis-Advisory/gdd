# Workflow: start

Resolve ENGAGEMENT_ROOT per `references/engagement-root.md` before any
engagement access. Use that same absolute path throughout this workflow;
never search parent/sibling engagements or derive the root from the install.

Router. Read-only.

1. Read `references/sow-register.md` and apply its Intake and core-state
   classification at ENGAGEMENT_ROOT. Do not infer a staged intake from
   filenames while ignoring partial core.
2. **Absent root**: report that no engagement exists here. Offer:
   `/gdd:ingest-sow <file>` as the default when an SOW exists; otherwise
   `/gdd:scope-deal <target>` for interview-based intake. `/gdd:tour` is
   available for a read-only walkthrough. Do not choose a document silently.
3. **Incomplete source-only intake**: report the missing QUESTIONS.md and
   recommend `/gdd:ingest-sow` with the recorded source; return.
4. **Staged intake**: read QUESTIONS.md; report draft vs confirmed coverage
   and the Intake handoff if present. Recommend `/gdd:resume-work` if a
   saved handoff needs readback, `/gdd:ingest-sow` for unfinished extraction
   or coverage review, otherwise `/gdd:scope-deal <target>`; return.
5. **Full engagement**:
   read STATE.md's Position and Handoff sections only;
   summarize in ≤8 sentences, one flowing summary — no multi-section
   briefing (the full readback belongs to `/gdd:resume-work`);
   recommend `/gdd:resume-work`.
6. **Malformed or unsupported state**: list exact missing, empty, invalid
   or unexpected paths and suggest the narrowest repair — do not initialize,
   migrate or overwrite anything from start.

Never write files.
