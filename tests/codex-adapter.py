"""Parse installed artifacts with Python 3.11+ tomllib; no runtime dependency."""
import json
from pathlib import Path
import re
import shutil
import subprocess
import tempfile
import tomllib
import unittest

REPO = Path(__file__).resolve().parents[1]
NODE = shutil.which("node")
TOKEN = "${CLAUDE_PLUGIN_ROOT}"


def read(path):
    return path.read_bytes().decode("utf-8")


def project(text, config):
    return text.replace(TOKEN, str(config)).replace("/gdd:", "$gdd-")


def install(repo, config):
    return subprocess.run([NODE, str(repo / "scripts/install.js"), "--codex",
                           "--config-dir", str(config)], capture_output=True,
                          encoding="utf-8", errors="replace", check=False)


class CodexAdapter(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix="gdd-codex-adapter-")
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name).resolve()
        self.config = self.root / "config with spaces — café"

    def fixture(self):
        repo = self.root / "source"
        for directory in ("scripts", "commands", "agents", "gdd-core/references", "gdd-core/workflows"):
            (repo / directory).mkdir(parents=True, exist_ok=True)
        for file in ("scripts/install.js", "package.json", "runtime-catalog.json"):
            shutil.copyfile(REPO / file, repo / file)
        return repo

    def test_every_installed_agent_parses_and_preserves_instructions(self):
        result = install(REPO, self.config)
        self.assertEqual(result.returncode, 0, result.stderr)
        authored = sorted((REPO / "agents").glob("*.md"))
        self.assertEqual(len(authored), 10)
        for source in authored:
            with self.subTest(agent=source.name):
                data = tomllib.loads(read(self.config / "agents" / (source.stem + ".toml")))
                _, frontmatter, body = read(source).split("---", 2)
                self.assertEqual(data["name"], re.search(r"^name: (.+)$", frontmatter, re.M)[1].strip())
                self.assertIsInstance(data["description"], str)
                self.assertTrue(data["description"])
                self.assertEqual(data["developer_instructions"], project(body.strip(), self.config))
                self.assertEqual(set(data), {"name", "description", "developer_instructions"})

    def test_strings_round_trip_without_interpreting_paths_or_delimiters(self):
        repo = self.fixture()
        description = 'Paths C:\\Users\\Example, "quotes", café and control \x7f'
        body = "\r\n".join([
            "<role>", r"Windows: C:\Users\Example\new\tests\work", r"Literal escape: \n",
            'Three double quotes: """', "Three single quotes: '''",
            "Unicode: café 日本語 🧭", "Controls: \t\b\f\x01\x7f", "Backslash at line end: \\",
            f"Read {TOKEN}/gdd-core/references/sample.md; invoke /gdd:help.", "</role>",
        ])
        (repo / "agents/gdd-sample.md").write_bytes(
            (f"---\r\nname: gdd-sample\r\ndescription: {description}\r\n---\r\n{body}\r\n").encode("utf-8"))
        result = install(repo, self.config)
        self.assertEqual(result.returncode, 0, result.stderr)
        data = tomllib.loads(read(self.config / "agents/gdd-sample.toml"))
        self.assertEqual(data["description"], description)
        self.assertEqual(data["developer_instructions"], project(body, self.config))

    def test_multiple_contexts_expand_in_order_and_preserve_surrounding_text(self):
        repo = self.fixture()
        first = "First contract: dollar $& and literal \\n.\n"
        second = "Second workflow: /gdd:help then " + TOKEN + "/gdd-core/templates/example.md\n"
        (repo / "gdd-core/references/first.md").write_bytes(first.encode("utf-8"))
        (repo / "gdd-core/workflows/second.md").write_bytes(second.encode("utf-8"))
        command = ("---\nname: ignored\ndescription: Context fixture\n---\n"
                   f"<execution_context>\nBefore\n@{TOKEN}/gdd-core/references/first.md\n"
                   f"Between\n@{TOKEN}/gdd-core/workflows/second.md\nAfter\n</execution_context>\n"
                   f"<execution_context>@{TOKEN}/gdd-core/references/first.md</execution_context>\n"
                   f"Outside context: {TOKEN}/gdd-core/references/first.md\n")
        (repo / "commands/sample.md").write_bytes(command.encode("utf-8"))
        result = install(repo, self.config)
        self.assertEqual(result.returncode, 0, result.stderr)
        skill = read(self.config / "skills/gdd-sample/SKILL.md")
        expected = project(f"Before\n{first.strip()}\nBetween\n{second.strip()}\nAfter", self.config)
        self.assertIn(expected, skill)
        self.assertEqual(skill.count(first.strip()), 2)
        self.assertIn(f"Outside context: {self.config}/gdd-core/references/first.md", skill)

    def test_invalid_or_missing_includes_fail_before_writing(self):
        repo = self.fixture()
        self.config.mkdir()
        sentinel = self.config / "settings.json"
        sentinel.write_text('{"keep": true}', encoding="utf-8")
        for reference in ("../package.json", "references/missing.md"):
            with self.subTest(reference=reference):
                (repo / "commands/sample.md").write_text(
                    f"---\ndescription: Broken include\n---\n<execution_context>\n"
                    f"@{TOKEN}/gdd-core/{reference}\n</execution_context>\n", encoding="utf-8")
                result = install(repo, self.config)
                self.assertNotEqual(result.returncode, 0)
                self.assertEqual(list(self.config.iterdir()), [sentinel])
                self.assertEqual(json.loads(read(sentinel)), {"keep": True})


if __name__ == "__main__":
    unittest.main(verbosity=2)
