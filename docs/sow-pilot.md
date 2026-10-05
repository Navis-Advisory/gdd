# Test the SOW pilot

Candidate: GDD 0.2.4. The first pilot target is Claude Cowork, installed from
the public GitHub marketplace. Claude Code has its own acceptance checks;
test Codex and ChatGPT Work after incorporating feedback from both Claude apps.
No worked engagement is bundled. Antigravity support is discontinued.

## Candidate availability and acceptance

The corrected candidate is under review. Version 0.2.4 alone does not identify
its contents: rebuilt candidates can share that version. Before installing,
obtain the maintainer's reviewed public commit and confirm it is available at
the repository marketplace. An older public revision is not this pilot.

Repository/package checks and bounded Claude Code behavior checks do not prove
Cowork installation or intake acceptance. Cowork's complete synthetic run,
installed revision, restart persistence and update behavior remain to be
verified. Use a development subscription account first. After Cowork passes,
install the same revision in the second account, run a clean synthetic smoke,
and only then use a real SOW in a separate private engagement folder.

This pilot uses the native marketplace; no ZIP handoff, npm release or official
directory listing is required. Keep paid usage credits disabled if using only
included subscription usage. Stop at a plan limit; do not switch to API billing.

## Claude Cowork — repository installation

1. Sign in to the intended development account in Claude Desktop. Verify the
   account and subscription before starting; a Claude Code login does not
   establish which account Cowork uses.
2. Open **Cowork → Customize → Plugins**. Choose **Add → Add marketplace** and
   enter `Navis-Advisory/gdd` or `https://github.com/Navis-Advisory/gdd`.
   Select GDD from that marketplace and install/enable it. If the interface
   differs or adding a repository is unavailable, record the app version and
   what the interface offers; do not treat a CLI install as Cowork acceptance.
3. Open GDD's details. Confirm version **0.2.4** and discovery of `ingest-sow`
   and `sow-status`. Record the marketplace source and resolved public revision
   where available. If the installed revision cannot be established, keep
   candidate identity unverified rather than inferring it from the version.
4. Create a new private `GDD-SOW-Pilot` folder outside the GDD code checkout.
   Start a Cowork task and explicitly select/grant access to that folder.
   Supply a short private synthetic SOW and paste the extraction prompt below.
   If slash commands are available, use `/gdd:ingest-sow` with the same request.
5. Complete the intake checks below, then close/reopen Cowork and verify that
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
After the reviewed candidate is available in the public repository, enter these
one at a time **inside Claude Code**, not in PowerShell:

```text
/plugin marketplace add Navis-Advisory/gdd
/plugin install gdd@gdd
```

Choose user scope for all projects or local scope for this pilot folder. For
an existing installation, update the marketplace and plugin through `/plugin`
and start a new session. Confirm the installed revision as well as version
0.2.4. Then use `/gdd:ingest-sow sow.pdf`, replacing the filename with your
synthetic SOW. Perform the same lifecycle checks and record results separately.

Native marketplace setup is documented in
[Claude Code marketplaces](https://code.claude.com/docs/en/plugin-marketplaces).
Code installation/discovery does not establish Cowork installation or behavior.

## Extraction prompt — copy and paste

```text
Use GDD 0.2.4 to ingest the SOW I supplied into this selected deal folder.
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

## Codex — after Claude feedback

1. Extract `gdd-openai-0.2.4.zip` into a tool folder. Keep that folder intact.
   Its root contains `plugin.json`, `.agents/`, and `skills/`.
2. In a terminal, add the extracted folder's absolute path:

```text
codex plugin marketplace add <absolute-path-to-gdd-openai>
codex plugin add gdd@gdd
```

Replace the angle-bracket path with your actual extracted folder path. If
your CLI lacks these commands, update it or use the desktop marketplace UI;
do not substitute the old CLI-adapter installer and count it as native success.
After merge, `codex plugin marketplace add Navis-Advisory/gdd` is the Git route.

3. Open Codex in a fresh deal folder, enable GDD from the plugin picker, and
   invoke `$gdd` with the extraction prompt. Run the same save/resume/amend/Git
   checks; record results independently of Claude.

## ChatGPT Work — separate from Codex

Use the desktop app with local execution and an explicitly selected deal
folder for this Git-based pilot. A web chat without local execution is not an
equivalent test of folder persistence and local commits.

1. Use the same extracted OpenAI plugin folder and add its marketplace as
   above. Open/select that folder as a trusted local project so the repo
   marketplace is visible. Restart the desktop app if needed.
2. Open **Plugins**, select the **GDD** marketplace source, and install/enable
   GDD. If GDD is missing, report the app version and missing UI rather than
   assuming a CLI install made it available in Work.
3. Start a **Work** task using local execution in your separate deal folder.
   Select GDD in the plugin picker; paste the extraction prompt and supply
   the SOW. Repeat all seven checks above.

OpenAI documents local marketplaces and desktop installation in
[Package your plugin](https://developers.openai.com/plugins/build/plugins).
Git marketplaces and local ZIPs do not create a public directory listing.
Universal directory submission is a later step after pilot feedback.

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
