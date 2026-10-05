# SOW register contract

QUESTIONS.md is the single question-status authority. Do not add a second
JSON store or copy its rows into state.json. Existing module/gate state stays
in state.json; module completion and question completion are different claims.
The orchestrator owns register writes; researchers return proposed updates.
Serialize these writes with ledger promotion. Git supplies the change history.

## Intake and core-state classification

Complete the mandatory boundary preflight in `references/engagement-root.md`
first; stop if its required metadata or approval is unavailable. Then inspect
only the verified root's direct inventory; never search another folder to complete it. Use
this classification for start, intake, scope, pause and resume, in this order.
If the root is a file rather than a directory, report it and stop without writes.

1. **Absent root:** no engagement exists at ENGAGEMENT_ROOT. Only intake or
   scope may create it. Other commands report the absence and recommend one
   of those commands without writing.
2. **Any core file present:** the core set is ENGAGEMENT.md, TAXONOMY.md,
   STATE.md and state.json. All four must be readable, nonempty files before
   this is a full engagement. state.json must parse as an object with
   `gdd_state_version: 1` and object-valued engagement, taxonomy_lock, gates,
   modules and continuation sections. Report a missing/empty/invalid file,
   missing section or unsupported version and stop without writes; never
   treat partial core as staged intake or create the missing core on pause.
   This is a bounded preflight, not full schema, gate or readiness validation.
   A full interview-based or older engagement without QUESTIONS.md is valid;
   do not manufacture a register. Missing WORKPLAN.md is normal before planning.
   Conflicting projections are reported, never silently repaired on resume.
3. **No core files:** the only staged-intake artifacts are QUESTIONS.md,
   SOW.md and versioned Markdown SOW extractions. Newly written snapshots use
   `SOW-vNNN.md` (starting at SOW-v002.md); never overwrite an existing version.
   Existing snapshots with other names are accepted only when their exact
   paths are recorded as extractions in QUESTIONS.md and their source metadata
   identifies them as SOW text. A name containing "SOW" alone is not proof.
   Snapshots never count as core state. Report unreadable/empty intake files,
   unrecognized entries;
   stop without repair or deletion.
   - A nonempty QUESTIONS.md plus at least one recognized extraction is
     **staged intake**. A legacy register without handoff sections remains
     valid. A draft review remains draft after pause/resume.
   - Recognized extraction(s) without QUESTIONS.md are **incomplete intake**.
     Report the missing register and recommend `/gdd:ingest-sow` with the
     recorded source to finish extraction/coverage review. Pause/resume must
     not create a register or core just to record a handoff.
   - QUESTIONS.md without a recognized extraction, an empty root, or other
     entries alone is **malformed/incomplete**: report the exact missing or
     unexpected paths; do not infer source text or initialize core.

Do not migrate legacy or unsupported core as a side effect of these commands.
Report what is readable and the narrowest repair needed. An unreadable state
is not permission to fall back to another state file or engagement.

## Staged continuity

Before full scoping, QUESTIONS.md also holds `## Intake handoff` and
`## Intake session log` sections from `templates/questions.md`. These contain
continuation notes, not duplicate question rows, statuses or module/gate state.
Pause may append these sections to a legacy register. It changes only those
sections and the register's writer stamp, preserving Q blocks, coverage,
review status, source metadata and all SOW extraction bytes. Record Position,
In-flight, Open decisions and one Next step; use file/section or Q-id pointers.
On a later pause, preserve the previous handoff with its date in the intake
session log before replacing it. Add an honest dated progress line even when
blocked. Never create STATE.md or state.json for staged continuity.

Resume reads these sections and returns after its staged summary/recommendation.
It never clears or moves a handoff, even when the user confirms resuming.
Re-ingestion and amendment preserve the intake continuity sections. On full
scoping, retain them as intake history and carry any saved handoff into the
new STATE.md Handoff and `state.json.continuation` without copying question
statuses. At scoping sign-off, record the transition in STATE.md's Session log
and set its next step to `/gdd:hypothesis-tree`, preserving the intake stopping
point and unresolved decisions in the handoff/history. Subsequent full pauses
use STATE.md and state.json only; QUESTIONS.md's intake notes remain history.

## Question blocks

Use the format in `templates/questions.md`. IDs are immutable Q001, Q002, ...
(continue beyond 999 if needed). Keep sections and original locators. Each block
has Source, Original, Question, Answer criterion, Modules, Status, Evidence,
Answer / gap, and Changes. Quote original text faithfully, apart from explicitly
recorded confidentiality redaction. Do not force a long SOW into 4–6 questions:
ENGAGEMENT.md may group them under KQs, but the register retains every Q-id.

Statuses: pending | in-progress | blocked | answered | out-of-scope.
`answered` requires a substantive answer, its criterion met, and existing
finding IDs in LEDGER.md with traceable source IDs in SOURCES.md. For intake
pilots without a ledger, keep status pending/blocked. A report being written,
a module marked done, or SOW/management assertions alone do not answer a Q.
Contradictory or contested findings must be disclosed; unresolved material
gaps remain blocked or in-progress. Completion is coverage of accepted scope,
not proof that the thesis is true. Excluded questions remain visible and are
excluded from the denominator; report their count and reasons separately.

## Re-ingestion and accepted amendments

The extracted source and the accepted register have different roles. Source /
Original retain what the SOW said; Question / Answer criterion retain the user's
agreed interpretation and amendments. Do not reconstruct an existing register
from source text. Read its complete blocks, dated Changes, coverage, constraints,
extraction history and intake continuity before proposing any update.

1. Compare the supplied source to the recorded immutable extraction for that
   revision, not to the amended Question field. Check substantive text, tables
   and locators; a filename match alone does not establish equality. Ignore only
   known extraction wrappers/line endings, not meaningful wording or numbers.
   If extraction is incomplete or matching uncertain, show the gap and stop
   before changing accepted scope. Do not infer removals from unreadable pages.
2. **Unchanged recorded source, no explicit amendment:** report no source change
   and return without writes or a new checkpoint. Preserve every byte of the
   register, its agreed wording/criteria, IDs, statuses, evidence, review and
   handoff, and all snapshots/core/planning files. An older recognized source
   revision is not a request to roll back newer accepted scope. For an unfinished
   draft, offer coverage review as the next action; only an explicit request to
   continue that review may change it. Source-only incomplete intake may finish
   its missing register without overwriting its extraction.
3. **Explicit amendment or changed/replacement SOW:** use the same change path.
   Show a concrete old/new proposal by Q-id: wording, criterion, owners,
   constraints, source revision/locator, addition/removal/supersession and why.
   Show affected workpapers, completion and gates before requesting confirmation.
   Keep proposals in the conversation until confirmed; preserve an existing
   confirmed register's review state rather than silently downgrading it. A
   confirmation already supplied for that exact change need not be requested
   again. Unconfirmed or rejected changes leave accepted files untouched.
4. On confirmation, retain the ID for the same intent; a materially different
   intent gets the next unused ID and visibly supersedes the old block. Mark
   that confirmed superseded block out-of-scope with a dated reason and the
   replacement Q-id, preserving its old evidence. Additions
   also use the next unused ID across all blocks, including out-of-scope ones.
   Never renumber, reuse, delete, or automatically reactivate an excluded ID.
   Confirm removals individually and retain them out-of-scope with a dated
   reason. Preserve original wording/locators and append new revision provenance
   in Source/Changes instead of erasing earlier provenance. Record old/new agreed
   wording and criteria plus the confirmation in dated Changes entries.
5. For accepted changed source, save one new unused versioned extraction, update
   the register's active Source/Extraction pointers and retain all exact previous
   paths/revisions in Extraction history. If the extraction already exists for
   that revision, reuse it unchanged. User amendments to agreed wording do not
   rewrite SOW.md or manufacture a revised source. Preserve intake continuity.

Unscoped initial intake may save a draft register before confirmation. A first
register added to an existing full engagement is proposed against its agreed
scope; newly accepted material scope/criteria require the same invalidation
below before saving. Draft saving does not allow repeat ingestion to replace
accepted content. Review: confirmed
describes scope/criteria agreement, not research completion or verification.

## Material change and invalidation

Before applying a confirmed change, inspect affected ENGAGEMENT.md KQ/Q mappings,
TREE.md where relevant, module BRIEF.md/FINDINGS.md, WORKPLAN.md dependencies,
LEDGER.md/SOURCES.md evidence links and state.json. Use only files that exist;
staged intake must not create full core or speculative planning files. Do not
alter the taxonomy lock outside the existing librarian supersession mechanism.

- A presentation-only correction that changes no intent, criterion, scope,
  evidence requirement or dependency preserves completion/gates. State the basis.
- Material changes include accepted additions, removals/supersessions, changed
  criteria, constraints/period/geography or evidence requirements. Re-evaluate
  affected answers against the new criterion. Preserve F/S links and old answers
  as historical evidence, but reopen answered Qs to pending/in-progress or blocked
  with the exact missing input unless cited existing evidence demonstrably still
  meets the revised criterion. Never erase evidence merely because scope changed.
  Unaffected questions retain their status and evidence.
- Update affected existing scope/mappings, briefs, analyses and schedule rows,
  including explicit downstream dependencies. A completed affected module reopens
  to in-progress if work can proceed, otherwise blocked with its missing input;
  mirror this in STATE.md and state.json.modules. Do not reset unrelated modules.
  A new owning module gets a brief/planning entry through the existing planning
  workflow, not an invented completed state; show any unplanned Q as blocked.
- These v1 gates cover the engagement as a whole. On any material accepted scope
  change, set `state.json.gates.triangulation` to status `not-run`, as_of null,
  waiver null, and `gates.red_team` to status `not-run`, as_of null. Preserve any
  extra historical fields; no previous pass, run or waiver certifies changed
  scope. Before clearing these fields, retain the previous gate/waiver record,
  date, affected Q-ids and reason in STATE.md's Session log. Mirror current Gates
  and Position there. Retain reports/readout as historical files; mark their paths
  stale in STATE.md and do not present them as current. Re-verification and any
  new waiver use existing workflows; the first-draft D6/D8 exception is unchanged.

Apply serially. Check necessary write access first. For material changes in full
engagements, preserve the prior gate record and invalidate machine gates before
changing accepted scope
or planning files, so an interrupted amendment cannot leave an old PASS current.
Then save register/planning/module projections and the dated session note. If any
save fails, stop, report exact saved/unsaved paths and keep gates invalidated; do
not announce a completed amendment/checkpoint or route around a denied write.
Read back affected files to verify the agreed change and matching projections.
This bounded manual contract is not the transactional writer or fingerprint
implementation of the later hardening tasks.

## Local Git checkpoints

The orchestrator applies this one contract after saved intake, confirmed
amendments, scope sign-off, accepted tree/module briefs and accepted workplan
milestones, when local Git tracking is authorized. A workflow's call to this
contract does not grant shell/Git access. Check the host's actual tool grants;
if unavailable or refused, report saved files and the missing checkpoint.
Agents return their written paths; they do not independently stage or commit.

1. Operate in the selected deal folder using `git -C <deal-folder>` on every
   call, never the GDD source/plugin install. Check `rev-parse --show-toplevel`
   and status. Distinguish "not a repository" from permission or other failures;
   failures do not justify initializing over an existing repository. Initialize
   locally only when no repository owns the folder and the user has authorized
   Git tracking. If an ancestor repository owns it, name that owner and obtain
   the user's choice before changing its index or recording confidential work.
   A previously supplied choice for that owner persists; do not ask again.
   Never silently create a nested repository to avoid that decision.
2. Check the effective author AND committer with `git var GIT_AUTHOR_IDENT`
   and `git var GIT_COMMITTER_IDENT` in that folder; environment overrides can
   differ from configured name/email. Both must be the user's authorized human
   identity. Missing/wrong identity requires correction before staging; do not
   invent one or change global configuration. No assistant attribution/trailers.
   Stop on an in-progress merge/rebase/cherry-pick or unresolved index entries.
3. Build a nonempty list of exact changed workpaper files under ENGAGEMENT_ROOT,
   relative to the selected deal folder. Include only files saved for this
   agreed milestone: for example QUESTIONS.md and affected core/planning files,
   or individually named module BRIEF.md files. Do not stage a directory, glob,
   `.` or every changed file. Exclude SOW.md, every registered/versioned source
   extraction (including legacy filenames), original/raw documents and
   IDENTITY.md by default. Excluding a file from this checkpoint preserves its
   existing tracked/index state; it does not untrack it or erase earlier history.
   Never force-add raw sources. Question/workpaper wording may itself be
   confidential; local checkpoints are not permission to disclose it.
4. Before staging, capture HEAD (or unborn status), working status, staged paths
   and their mode/blob entries (`git ls-files --stage -z`). Check the full index,
   not just selected paths. Defer if any selected path already has staged changes
   from before this checkpoint, or contains unrelated edits that cannot be
   separated safely. Report the exact conflict and preserve those bytes; do not
   reset, stash, unstage or overwrite protected staging. Preserve every unrelated
   staged entry and working file. Review the selected files' complete current
   contents/diff: the commit below records working-tree bytes, not selected hunks.
5. Use literal, quoted exact file arguments after `--`; these examples are a
   protocol, not a command to substitute arbitrary shell text into:

   ```text
   git -C <deal-folder> --literal-pathspecs add -- <exact-workpaper-files>
   git -C <deal-folder> --literal-pathspecs diff --cached -- <exact-workpaper-files>
   git -C <deal-folder> --literal-pathspecs commit --dry-run --only -- <exact-workpaper-files>
   git -C <deal-folder> --literal-pathspecs commit --only -m <factual-message> -- <exact-workpaper-files>
   ```

   Newly created files need the exact `add` before they are known to Git. If
   `.diligence/` is ignored, use `add -f --` only for the individually named,
   intended workpapers; keep the ignore rule intact. If the selected paths have
   no change, report "no checkpoint needed" and return without creating a commit,
   even when unrelated changes are staged. Immediately before committing,
   verify HEAD, selected working bytes and unrelated staging still match the
   reviewed state; unexpected concurrent changes defer the commit. `--only`
   excludes other staged paths; a bare commit or `-a` would violate isolation.
   Do not use `--allow-empty`, `--amend`, hook bypasses or history rewriting.
6. Check command results. Use factual messages such as `SOW: register 18
   questions`, `SOW: amend Q004; add Q019`, `Scope: agree engagement` or
   `Plan: agree workplan`. Verify the new SHA, complete commit message,
   author/committer and actual file list (including root commits, with
   `git diff-tree --root --no-commit-id --name-only -r <SHA>`). Confirm committed
   bytes match the reviewed files and unrelated index mode/blob entries and
   working bytes remain unchanged. Report any discrepancy without hiding it or
   rewriting history. On hook/signing/permission/commit failure, report the
   error, current HEAD and which intended files remain staged; preserve unrelated
   work and do not claim a checkpoint. A saved file/chat response is not a commit.

Never create a remote or push as a checkpoint side effect. Maintainer review
and any later landing/publication remain separate actions.
