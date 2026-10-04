# Workflow: start

Engagement root: `<CWD>/.diligence` — it exists at exactly that path or
the engagement does not exist here. Never search parent or sibling
directories for `.diligence/`; never read or write another folder's
engagement. Full contract: references/engagement-root.md.

Router. Read-only.

1. Check for `.diligence/` at exactly `<CWD>/.diligence` — no broader
   glob, no parent/sibling search.
2. **No `.diligence/`**: report that no engagement exists here. Offer:
   `/gdd:scope-deal <target>` to start one; `/gdd:tour` first if the user
   is new. If the folder contains deal documents (PDFs, spreadsheets),
   note that scope-deal will register them as inputs.
3. **`.diligence/` present and well-formed** (has ENGAGEMENT.md,
   TAXONOMY.md, STATE.md, state.json — the same core set step 4 checks):
   read STATE.md's Position and Handoff sections only;
   summarize in ≤8 sentences, one flowing summary — no multi-section
   briefing (the full readback belongs to `/gdd:resume-work`);
   recommend `/gdd:resume-work`.
4. **`.diligence/` present but malformed**: list exactly which core
   files are missing/empty (ENGAGEMENT.md, TAXONOMY.md, STATE.md,
   state.json) and suggest the narrowest repair — do not initialize or
   overwrite anything from start.

Never write files.
