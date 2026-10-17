# Start from a statement of work

In a private deal folder, run `/gdd:ingest-sow <file>` with your SOW.
GDD extracts the source into `.diligence/SOW.md` and gives each question a
stable ID in `.diligence/QUESTIONS.md`. Ingestion does not start research.

1. Review the source-to-question coverage, ambiguities, proposed answer criteria
   and module assignments. Confirm them when they reflect the agreed scope.
2. Use `/gdd:sow-status` to review gaps or propose amendments. Accepted changes
   retain question IDs and history; an unchanged re-ingestion creates no duplicates.
3. Run `/gdd:scope-deal <target>` when ready to scope the engagement, or use
   `/gdd:pause-work` and `/gdd:resume-work` to continue intake in another session.

Word, PDF, text and Markdown depend on the host's available readers. For email
or a linked document, supply accessible text or an exported file when the host
cannot read it directly. Unreadable sections remain explicit gaps, not guesses.

Keep source documents and generated work private. With your authorization,
local Git checkpoints record agreed workpaper changes and exclude source files;
GDD reports when a checkpoint cannot be made. Folder access and saving/resuming
must work in your app: check with a synthetic document before confidential use.

See [installation](install.md) and [how SOW intake works](design.md#sow-intake).
