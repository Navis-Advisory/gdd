# Workflow: sow-status

Resolve ENGAGEMENT_ROOT per `references/engagement-root.md` before any
engagement access. Use that same absolute path throughout this workflow;
never search parent/sibling engagements or derive the root from the install.

Read exactly `<ENGAGEMENT_ROOT>/QUESTIONS.md` and
`references/sow-register.md`. If absent, recommend `/gdd:ingest-sow`.
Classify the root using that reference. This command works for staged intake
and full engagements; malformed/unsupported core stops before any amendment.

With no requested change: read only. Count active questions by status; report
answered / active, blocked IDs/reasons, out-of-scope count, unmapped questions,
and draft criteria. Check answered rows against the ledger/source registry;
flag unsupported answers without silently changing them. Recommend one next
action based on the largest gap. Missing WORKPLAN.md is normal before scoping.

For an explicit amendment or reconciliation request:

1. Read affected module briefs/findings and ledger/source rows before updating.
   Reconcile every requested question individually against its answer criterion.
   Do not infer completion from a module's `done` token. Show supporting F-ids,
   contrary evidence, and remaining gaps. Use only existing evidence.
2. Follow the reference's Re-ingestion and accepted amendments contract for
   wording/criteria or changed/replacement SOWs. Show the concrete proposal and
   downstream impact; apply only the confirmed changes. Status reconciliation
   against already agreed criteria does not need renewed scope approval.
   Never mark an ambiguity as resolved by assumption.
3. Apply the reference's Material change and invalidation contract, including
   actual gate/waiver resets and affected module reopening in full engagements.
   Preserve old evidence and snapshots; update affected existing planning files.
   Staged updates remain in the register/snapshot set without creating core.
   Read back saved results; report any partial failure without a completion claim.
4. After a successful changed-file save, make the bounded local Git checkpoint
   and show counts, changed IDs, affected/stale paths and actual SHA or limitation.
   An unchanged comparison creates no new snapshot, file edit or empty commit.

Do not reset or fabricate engagement state, silently repair conflicting files,
contact third parties, push a remote, or treat a criterion met as a passed gate.
