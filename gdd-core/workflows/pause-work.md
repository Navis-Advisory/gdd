# Workflow: pause-work

Complete the mandatory boundary metadata preflight in
`references/engagement-root.md` before source-document reads, engagement
inventory or content access. Stop if any required check or approval is missing. Use that same absolute path throughout this workflow;
never search parent/sibling engagements or derive the root from the install.

After preflight, use a host-approved tool that can read and save directly in
the selected root, including a connected-device shell when authorized. Permit
only the reads and continuity edits below; no Git, source/question edits,
out-of-root staging or trial writes. Confirm the tool's target filesystem
before drafting a save. Missing access or a refused/unclear result stops the
dependent work; never switch routes to bypass it. These limits also apply
when this workflow is followed directly without a slash command.

1. Read `references/sow-register.md` and classify the selected root using
   its Intake and core-state classification before writing. For absent,
   incomplete, malformed or unsupported state, report the exact issue and
   recommendation, then return without writes. Do not initialize or repair
   core state as part of pausing.
2. From the current conversation and readable artifacts modified this
   session, draft the handoff:
   - position: intake/module/analysis in flight and its exact stopping point
   - in-flight: partial work and where it lives (file + section)
   - open decisions: anything awaiting the user, phrased as questions
   - next step: the single concrete action to take on resume
3. Send the complete draft in a standalone assistant message before any
   artifact-writing operation, including a shell save or writer-stamp edit.
   Use these visible labels:
   **Position:** ...; **In-flight:** ...; **Open decisions:** ...;
   **Next step:** ... . Internal reasoning, a tool payload and a saved file
   are not that message. If the user already authorized the save, continue to
   step 4 or 5 after sending it without asking again. Otherwise wait for the
   missing save authorization; apply any requested adjustments before saving.
4. **Staged intake:** follow the reference's Staged continuity contract.
   Save only QUESTIONS.md's Intake handoff and Intake session log (and writer
   stamp); preserve the previous handoff in that log before replacement.
   Preserve review status, Q blocks and every source snapshot. Do not create
   any core artifact. If a save fails, stop and report what was saved or is
   unverified; do not try an alternate write route. On success, proceed to step 6.
5. **Full engagement:** preserve an existing handoff with its date in
   STATE.md's Session log before replacing the Handoff section. Add a dated
   progress line and mirror `state.json.continuation.{handoff,next_step}`.
   Change no other machine state. If write access or either save fails, report
   exactly what was saved and what remains inconsistent; do not claim a clean
   pause or attempt an alternate write route.
6. Read back the changed continuity sections at the saved paths and compare
   them with the draft and intended preservation. If this cannot complete,
   report the save result and unverified content separately. Confirm only the
   observed paths, saved handoff and checks, including any failures. Do not call
   the pause clean if the visible preview, required boundary checks or readback
   was missed; disclose the missed step without inventing a prior message or
   retrying a refused operation. A saved pause is not a Git checkpoint; claim
   a commit only if one was separately made and verified.
