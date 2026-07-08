# Workflow: start

Router. Read-only.

1. Glob for `.diligence/` in the current working directory.
2. **No `.diligence/`**: report that no engagement exists here. Offer:
   `/gdd:scope-deal <target>` to start one; `/gdd:tour` first if the user
   is new. If the folder contains deal documents (PDFs, spreadsheets),
   note that scope-deal will register them as inputs.
3. **`.diligence/` present and well-formed** (has ENGAGEMENT.md +
   STATE.md): read STATE.md's Position and Handoff sections only;
   summarize in ≤4 sentences; recommend `/gdd:resume-work`.
4. **`.diligence/` present but malformed**: list exactly which core
   files are missing/empty (ENGAGEMENT.md, TAXONOMY.md, STATE.md,
   state.json) and suggest the narrowest repair — do not initialize or
   overwrite anything from start.

Never write files.
