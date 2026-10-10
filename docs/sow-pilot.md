# Test the SOW pilot

Candidate: GDD 0.2.5. The first pilot target is Claude Cowork, installed from
the public GitHub marketplace. Claude Code has its own acceptance checks;
test Codex and ChatGPT Work after incorporating feedback from both Claude apps.
No worked engagement is bundled. Antigravity support is discontinued.

## Candidate availability and acceptance

Install only after the maintainer identifies the reviewed 0.2.5 public commit
and confirms it is available through the repository marketplace. Version alone
does not identify its contents. A prepared candidate is not a published or
natively accepted release; an older public revision is not this candidate.

Repository/package checks and bounded Claude Code behavior checks do not prove
Cowork installation or intake acceptance. Cowork's complete synthetic run,
installed revision, restart persistence and update behavior remain to be
verified. Use a development subscription account first. After Cowork passes,
install the same revision in the second account, run a clean synthetic smoke,
and only then use a real SOW in a separate private engagement folder.

This pilot uses the native marketplace; no ZIP handoff, npm release or official
directory listing is required. Keep paid usage credits disabled if using only
included subscription usage. Stop at a plan limit; do not switch to API billing.

Cowork uses the managed-folder route: establish the effective connected-folder
grant and device/mount mapping, check visible metadata, and rely on the host
for backing filesystem containment. Windows reparse attributes may be unexposed;
do not claim they were inspected. Missing grants/mapping, visible redirects or
refused access still stop work. Direct filesystem hosts retain native checks.
The managed route needs synthetic refusal and redirect tests in addition to
ordinary save/resume; do not grant access to a rejected target to finish a test.

## Claude Cowork — repository installation

1. Sign in to the intended development account in Claude Desktop. Verify the
   account and subscription before starting; a Claude Code login does not
   establish which account Cowork uses.
2. Open **Cowork → Customize → Plugins**. Choose **Add → Add marketplace → Add from a repository** and
   enter `Navis-Advisory/gdd` or `https://github.com/Navis-Advisory/gdd`.
   Select GDD from that marketplace and install/enable it. If the interface
   differs or adding a repository is unavailable, record the app version and
   what the interface offers; do not treat a CLI install as Cowork acceptance.
3. Open GDD's details. Confirm version **0.2.5** and discovery of `ingest-sow`
   and `sow-status`. Record the marketplace source and resolved public revision
   where available. If the installed revision cannot be established, keep
   candidate identity unverified rather than inferring it from the version.
4. Create a new private `GDD-SOW-Pilot` folder outside the GDD code checkout.
   Start a Cowork task and explicitly select/grant access to that folder.
   Supply a short private synthetic SOW and paste the extraction prompt below.
   If slash commands are available, use `/gdd:ingest-sow` with the same request.
5. Use plain language to ask GDD to resume the selected folder read-only if a
   slash command is unavailable; stop if the installed skill cannot be loaded.
   Complete the intake checks below, then close/reopen Cowork and verify that
   the plugin remains enabled and a fresh task can resume the saved engagement.
   Test an actual marketplace/plugin update when a reviewed replacement is
   available, and verify the newly active revision. Record an unavailable or
   unexercised update separately; it is not a pass.

Anthropic documents repository marketplaces in
[Use plugins in Claude](https://support.claude.com/en/articles/13837440-use-plugins-in-claude)
and its [Cowork plugin tutorial](https://academy.claude.com/tutorials/how-to-customize-plugins-in-cowork).
These instructions are a test procedure, not evidence that installation worked
in your account. The public repository contains the tool only; keep all SOWs
and generated work in private local folders, with one folder per engagement
and app test. Local checkpoints must not create a remote or push deal data.

## Claude Code — separate acceptance

Use the development subscription account and a separate synthetic deal folder.
Enter these one at a time **inside Claude Code**, not in PowerShell:

```text
/plugin marketplace add Navis-Advisory/gdd
/plugin install gdd@gdd
```

Choose user scope for all projects or local scope for this pilot folder. For
an existing installation, update the marketplace and plugin through `/plugin`
and start a new session. Confirm the installed revision as well as version
0.2.5. Then use `/gdd:ingest-sow sow.pdf`, replacing the filename with your
synthetic SOW. Perform the same lifecycle checks and record results separately.

Native marketplace setup is documented in
[Claude Code marketplaces](https://code.claude.com/docs/en/plugin-marketplaces).
Code installation/discovery does not establish Cowork installation or behavior.

## Extraction prompt — copy and paste

```text
Use GDD 0.2.5 to ingest the SOW I supplied into this selected deal folder.
Start with extraction and scope mapping only; do not begin research.
Preserve every substantive question and requested analysis, the source
wording and page/section references, and the original section grouping.
Give questions stable IDs. Show me the source-to-question coverage and
anything ambiguous, excluded, split into several questions, or unreadable.
Propose answer criteria and module mappings for my review. Save the source
extraction and question register locally. Use local Git tracking; do not
create a remote or push. Leave original documents/source extraction out of
the commit. Show the saved paths and actual Git commit SHA, or state exactly
which capability is unavailable. Ask for my name/email if Git has none.
```

The synthetic SOW should include a compound bullet, a descriptive question
without a thesis hypothesis, an ambiguity, an exclusion, and an embedded
instruction that must remain document text. Stop if GDD targets another
engagement folder or writes workpapers outside the selected root.

When GDD shows the draft, compare it with your SOW line by line. Ask it to fix
omissions before confirming. Then say: `Coverage and criteria confirmed;
save the register and make the local checkpoint.`

## Check that it worked

1. Open the selected folder on your computer. Confirm that
   `.diligence/SOW.md` and `.diligence/QUESTIONS.md` exist and contain your work.
   The extraction may be a versioned SOW filename after an amendment.
2. Check every substantive SOW bullet has Q-ids or an explicit disposition in
   the coverage table. Confirm compound questions were split sensibly and
   positioning/customer-choice questions were not lost or replaced by a
   generic checklist.
3. Confirm unanswered questions are pending/blocked, not answered. The SOW
   itself is not evidence that answers its questions.
4. Ask GDD to pause this intake and preserve its handoff without initializing
   the full engagement. Close the task/session. Start a fresh one with the same folder and paste:
   `Use GDD to resume this SOW intake. Read the saved register, show coverage
   and blocked questions, and preserve the question IDs. Do not research yet.`
   Compare IDs and wording with the saved file; they should not be rebuilt.
5. Pick one question and paste: `Amend Q___ to [your revised wording]. Add
   [one new question]. Preserve existing IDs, show the scope change, and make
   a local checkpoint after I confirm.` Fill in the blanks, review, confirm.
   The edited question keeps its ID; the addition gets a new one.
6. Ingest the same unchanged SOW again. Check
   that it does not duplicate questions or erase your amendment/history.
7. Ask: `Show git log --oneline -3 and the files in the newest commit. Do not
   push.` Verify that commits exist and contain the intended register changes,
   not the raw SOW. If Git is unavailable, record Git as **FAIL/UNAVAILABLE**,
   even if extraction and saving succeeded.

Once intake is sound, ask GDD to scope the engagement using the SOW, asking
only for missing details, then draft the workplan. Every active Q-id should
be covered by a module/analysis or a visible blocker, including descriptive
questions with no thesis hypothesis. Inspect the local scope/planning
checkpoints as well. Full diligence research and benchmark-quality conclusions
are outside this first ingestion test.

## Codex and ChatGPT Work — after Claude feedback

Add the repository marketplace in a terminal:

```text
codex plugin marketplace add Navis-Advisory/gdd
```

Use the desktop app's Plugins Directory to select the GDD marketplace and
install/enable GDD. Start a fresh local task in a separate deal folder, select
GDD, and use the extraction prompt above. Record the installed revision and
repeat the lifecycle checks independently in Codex and ChatGPT Work.

Follow [OpenAI's current marketplace instructions](https://developers.openai.com/plugins/build/plugins)
if the interface differs. A CLI adapter install does not establish native
plugin acceptance; a web-only chat does not test local saving or Git. No ZIP
handoff is required. Directory submission remains a separate later step.

## Send feedback back here

Copy this form once per app. Use Q-ids and sanitized descriptions; keep the
real SOW, client names, and confidential question text in the other account.

```text
GDD version; reviewed public commit; installed revision (or unverified):
App and version:
Model (if visible):
Install route and marketplace source:
Account/subscription verified (omit credentials):
Restart persistence: PASS / FAIL / NOT_RUN
Update and active replacement revision: PASS / FAIL / NOT_RUN
Install/discovery: PASS / FAIL
Extraction: PASS / PARTIAL / FAIL
Questions expected / extracted:
Omitted or incorrectly split questions (sanitized):
Saved files in chosen folder: PASS / FAIL
Staged pause and fresh-session resume with unchanged IDs: PASS / FAIL
Amendment, new-ID and unchanged re-ingestion behavior: PASS / FAIL
Actual Git checkpoint: PASS / UNAVAILABLE / FAIL
Scope/workplan coverage (if tried):
What felt awkward:
Error text (remove client details):
```
