import assert from "node:assert/strict";
import { chmodSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFileSync, spawnSync } from "node:child_process";

const repo = process.cwd();

function shellPath(value) {
  return process.platform === 'win32'
    ? execFileSync('bash', ['-c', 'cygpath -u "$1"', '--', value], {encoding: 'utf8'}).trim()
    : value;
}

function runBootstrap(runtime, extraEnv = {}) {
  const temp = mkdtempSync(join(tmpdir(), "gdd-cloud-bootstrap-"));

  try {
  const bin = join(temp, "bin");
  const log = join(temp, "node.log");
  mkdirSync(bin);
  const fakeNode = join(bin, "node");
  writeFileSync(fakeNode, "#!/usr/bin/env bash\nprintf '%s\\n' \"$*\" > \"$GDD_TEST_LOG\"\n");
  chmodSync(fakeNode, 0o755);

  const result = spawnSync("bash", ['-c', 'export PATH="$1:$PATH"; exec bash scripts/cloud-bootstrap.sh "$2"', '--', shellPath(bin), runtime], {
    cwd: repo,
    env: {
      ...process.env,
      ...extraEnv,
      GDD_TEST_LOG: shellPath(log),
    },
    encoding: "utf8",
  });

  assert.equal(result.status, 0, result.stderr);
  return { log, temp };
  } catch (error) {
    rmSync(temp, { recursive: true, force: true });
    throw error;
  }
}

const codex = runBootstrap("codex");
try {
  assert.equal(
    readFileSync(codex.log, "utf8").trim(),
    `${shellPath(join(repo, "bin", "install.js"))} --codex --local`,
  );
} finally {
  rmSync(codex.temp, { recursive: true, force: true });
}

const claude = runBootstrap("claude", { CLAUDE_CODE_REMOTE: "true" });
try {
  assert.equal(
    readFileSync(claude.log, "utf8").trim(),
    `${shellPath(join(repo, "bin", "install.js"))} --claude --local`,
  );
} finally {
  rmSync(claude.temp, { recursive: true, force: true });
}
