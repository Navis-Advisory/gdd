# Workflow: pause-work

Engagement root: `<CWD>/.diligence` — it exists at exactly that path or
the engagement does not exist here. Never search parent or sibling
directories for `.diligence/`; never read or write another folder's
engagement. Full contract: references/engagement-root.md.

1. From the current conversation and any artifacts modified this
   session, draft the handoff:
   - position: module/analysis in flight and its exact stopping point
   - in-flight: partial work and where it lives (file + section)
   - open decisions: anything awaiting the user, phrased as questions
   - next step: the single concrete action to take on resume
2. Show the draft to the user; adjust.
3. Write it into STATE.md's Handoff section; add a Session log line
   (date · what moved this session); mirror
   `state.json.continuation.{handoff,next_step}`.
4. Confirm written state, so the session can end safely.
