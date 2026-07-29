# Engagement root — the isolation contract

Every GDD command and agent operates on exactly one engagement, and its
location is not negotiable:

**ENGAGEMENT ROOT = `<current working directory>/.diligence`.** It
either exists at exactly that path or the engagement does not exist.

## Rules (all commands, all agents)

1. **Never search for `.diligence/` anywhere else.** No globbing parent
   directories, no scanning sibling folders, no "the user probably
   meant that one over there". A `.diligence/` visible in a parent or
   sibling directory belongs to a DIFFERENT engagement — on real client
   work, a different client. Treat it as confidential material behind
   an information barrier: do not read it, do not write it, do not
   summarize it, do not adopt its state.
2. **If the root is absent, stop and route.** The engagement does not
   exist here. Say so and point at `/gdd:scope-deal <target>` (create
   one) or `/gdd:start` (choose the right first action). Never proceed
   against another folder's engagement instead.
3. **Only `/gdd:scope-deal` creates the root**, and only at exactly
   `<CWD>/.diligence` — never in a parent or sibling folder.
4. **Every subagent prompt carries the engagement root as an absolute
   path.** Orchestrators resolve the root once, from CWD, and pass it
   explicitly in every spawn prompt; subagents never re-derive it by
   searching. A subagent given no root reports its prompt as defective
   rather than guessing.
5. **Every artifact read or write stays under the root.** An artifact
   path outside the engagement root is a defect: refuse the write,
   report the read. Reports stamp their `engagement_root:` header at
   write time; the verifier's D5 fails any report whose stamp does not
   match the current root ("foreign artifact").
