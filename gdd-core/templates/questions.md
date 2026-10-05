---
template: questions
template_version: 3
---

# SOW question register — {DEAL_NAME}

engagement_root: {ABSOLUTE_PATH_TO}/.diligence
written_by: {COMMAND} / {DATE}
GDD version: {VERSION}
Source: {ORIGINAL_FILENAME_OR_PASTED_TEXT_LABEL}
Extraction: .diligence/SOW.md
Review: draft

## Extraction history

<!-- Exact immutable extraction paths with source revision/date and locators.
The top Source/Extraction fields identify the active accepted source. Retain
older entries on replacement. Agreed wording amendments do not alter source
text. This is provenance in the existing register, not a second status store. -->

| Source revision / date | Extraction path | Note |
|---|---|---|

## Constraints and deliverables

{DEADLINE, DELIVERABLES, ACCESS, GEOGRAPHY, PERIOD, EXCLUSIONS; UNKNOWN IF UNSUPPLIED}

## Source coverage

| SOW locator | Question IDs or disposition | Note |
|---|---|---|

<!-- Account for every substantive bullet, including tasks, exclusions, and
unreadable sections. This table checks omissions; it is not a status store. -->

## {SOW_SECTION}

### Q001

Source: {FILENAME, PAGE/SECTION/BULLET}
Original: {VERBATIM_SOURCE_BULLET}
Question: {SEPARATELY_ANSWERABLE_QUESTION}
Answer criterion: {WHAT_A_SUFFICIENT_ANSWER_CONTAINS}
Modules: {MODULE_NAMES_OR_UNMAPPED_WITH_REASON}
Status: pending
Evidence: none
Answer / gap: {OPEN_QUESTIONS_OR_MISSING_INPUTS}
Changes: {DATE — INITIAL_EXTRACTION; LATER CONFIRMED OLD/NEW WORDING, CRITERIA,
SOURCE REVISION, SUPERSESSION/REMOVAL REASON AND AFFECTED WORK AS APPLICABLE}

<!-- Repeat one block per Q-id. Use multi-line values when helpful. Never
reuse IDs, silently drop a question, or mark answered from module status. -->

## Intake handoff

<!-- Staged-intake continuation only; not question or module status. Written
by /gdd:pause-work, read without clearing by /gdd:resume-work. Keep after full
scoping as intake history; subsequent full pauses use STATE.md/state.json.
Use pointers to Q-ids and files instead of duplicating register content. -->

Date: {DATE_OR_NONE}
Position: {EXACT_STOPPING_POINT_OR_NONE}
In-flight: {PARTIAL_WORK_AND_FILE_SECTION_OR_NONE}
Open decisions: {QUESTIONS_AWAITING_THE_USER_OR_NONE}
Next step: {ONE_CONCRETE_ACTION_OR_NONE}

## Intake session log

<!-- Dated progress entries, newest first. Before replacing an intake handoff,
retain its date and full four fields here. Preserve this section on re-ingest,
amendment and full scoping; do not copy question statuses into it. -->
