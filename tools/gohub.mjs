#!/usr/bin/env node
/**
 * gohub — Claude Code ↔ GOHUB AI Office (Phase 16 / CC-02). Node 18+, no dependencies.
 *
 *   node tools/gohub.mjs login <apiUrl>       lưu URL + mã kết nối vào ~/.gohub/config.json (hỏi mã, không echo ra màn hình)
 *   node tools/gohub.mjs status               em là ai, API nào
 *   node tools/gohub.mjs work                 việc đang chờ (của bạn, hoặc bước agent chạy bằng Claude Code)
 *   node tools/gohub.mjs pull <taskId>        nhận việc (Sẵn sàng → Đang làm) và ghi .gohub/<id>/brief.md + context.json
 *   node tools/gohub.mjs submit <taskId> <file>   nộp bài → Chờ duyệt
 *
 * Only the API is contacted (with your personal token); nothing touches the database directly.
 * Never put customer PII, eSIM codes, payment data or secrets into briefs, deliverables or this config.
 */
import { createInterface } from "node:readline";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { join, resolve } from "node:path";

const CONFIG_DIR = join(homedir(), ".gohub");
const CONFIG = join(CONFIG_DIR, "config.json");
const WORK_DIR = resolve(process.cwd(), ".gohub");

function out(s = "") {
  process.stdout.write(`${s}\n`);
}
function fail(msg, code = 1) {
  process.stderr.write(`✖ ${msg}\n`);
  process.exit(code);
}

async function loadConfig() {
  if (!existsSync(CONFIG)) fail(`Chưa login. Chạy: node tools/gohub.mjs login <apiUrl>`);
  const cfg = JSON.parse(await readFile(CONFIG, "utf8"));
  if (!cfg.apiUrl || !cfg.token) fail(`Config ${CONFIG} thiếu apiUrl hoặc token. Chạy login lại.`);
  return cfg;
}

async function api(cfg, method, path, body) {
  const res = await fetch(`${cfg.apiUrl.replace(/\/$/, "")}${path}`, {
    method,
    headers: { authorization: `Bearer ${cfg.token}`, "content-type": "application/json", accept: "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await res.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    /* not json */
  }
  if (!res.ok) fail(`${method} ${path} → ${res.status} ${json?.message ?? json?.error ?? text.slice(0, 200)}`);
  return json;
}

function ask(question, { hidden = false } = {}) {
  return new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    if (hidden) {
      // Hide the typed characters (the token is a secret).
      const onData = (ch) => {
        const c = String(ch);
        if (c === "\n" || c === "\r" || c === "\u0004") process.stdin.removeListener("data", onData);
        else process.stdout.write("\x1b[2K\x1b[200D" + question + "*".repeat(rl.line.length + 1));
      };
      process.stdin.on("data", onData);
    }
    rl.question(question, (answer) => {
      rl.close();
      process.stdout.write("\n");
      resolve(answer.trim());
    });
  });
}

async function login(apiUrl) {
  if (!apiUrl) fail("Dùng: login <apiUrl>  (ví dụ http://localhost:5173/api hoặc https://office.gohub.com/api)");
  const token = await ask("Dán mã kết nối (gh_…): ", { hidden: true });
  if (!token.startsWith("gh_")) fail("Mã kết nối phải bắt đầu bằng gh_ — tạo ở trang Kết nối Claude Code.");
  const cfg = { apiUrl, token };
  const me = await api(cfg, "GET", "/me");
  await mkdir(CONFIG_DIR, { recursive: true });
  await writeFile(CONFIG, JSON.stringify({ ...cfg, savedAt: new Date().toISOString() }, null, 2), { mode: 0o600 });
  out(`✓ Đã lưu ${CONFIG}. Xin chào ${me.user.name} (${me.user.email}).`);
}

async function status() {
  const cfg = await loadConfig();
  const me = await api(cfg, "GET", "/me");
  out(`API: ${cfg.apiUrl}\nTài khoản: ${me.user.name} (${me.user.email})${me.user.isAdmin ? " · admin" : ""}`);
}

function describeItem(it) {
  const step = it.chain ? ` · brief "${it.chain.brief}" bước ${it.chain.stepIndex + 1}/${it.chain.stepCount}` : "";
  const who = it.agent ? `agent ${it.agent.slug}` : "việc của bạn";
  return `${it.task.id}  [${it.task.status === "ready" ? "Sẵn sàng" : "Đang làm"}] ${it.task.title}  — ${it.project.title} · ${who}${step}`;
}

async function work() {
  const cfg = await loadConfig();
  const { items } = await api(cfg, "GET", "/me/work");
  if (!items.length) {
    out("Không có việc nào chờ bạn.");
    return;
  }
  out(`${items.length} việc đang chờ:`);
  for (const it of items) out(`  ${describeItem(it)}`);
  out(`\nNhận một việc: node tools/gohub.mjs pull <taskId>`);
}

function section(title, body) {
  return `\n## ${title}\n\n${body || "(không có)"}\n`;
}

function renderBrief(it, agentDir) {
  const t = it.task;
  const inputs = Object.entries(t.inputs ?? {})
    .filter(([, v]) => v !== null && v !== undefined && String(v).trim() !== "")
    .map(([k, v]) => `- **${k}**: ${String(v)}`)
    .join("\n");
  const briefInputs = it.chain
    ? Object.entries(it.chain.briefInputs ?? {})
        .filter(([, v]) => v !== null && v !== undefined && String(v).trim() !== "")
        .map(([k, v]) => `- **${k}**: ${String(v)}`)
        .join("\n")
    : "";
  let md = `# ${t.title}\n\nDự án: ${it.project.title}\nTask: ${t.id}\nLoại bài: ${it.artifactTypeDef.label} (${it.artifactTypeDef.id})${it.artifactTypeDef.frontMatter.length ? ` · front-matter bắt buộc: ${it.artifactTypeDef.frontMatter.join(", ")}` : ""}\n`;
  md += it.agent ? `Agent: ${it.agent.displayName} (${it.agent.slug}) — đọc ${agentDir}\n` : "Agent: (việc giao cho bạn, không có agent)\n";
  if (it.chain) md += `Dây chuyền: brief "${it.chain.brief}", bước ${it.chain.stepIndex + 1}/${it.chain.stepCount}\n`;
  md += section("Mô tả / brief", t.description);
  md += section("Tiêu chí nghiệm thu", t.acceptanceCriteria || it.artifactTypeDef.defaultCriteria.map((c) => `- ${c}`).join("\n"));
  if (inputs) md += section("Dữ liệu đầu vào của việc", inputs);
  if (briefInputs) md += section("Dữ liệu đầu vào của brief", briefInputs);
  for (const p of it.chain?.previous ?? []) md += section(`Bài bước trước: ${p.title}${p.agentSlug ? ` (${p.agentSlug})` : ""}`, p.content);
  if (it.lastReview) md += section(`Lần duyệt gần nhất: ${it.lastReview.decision === "rejected" ? "BỊ TỪ CHỐI" : it.lastReview.decision}`, `${it.lastReview.failedCriteria?.length ? `Tiêu chí không đạt: ${it.lastReview.failedCriteria.join(", ")}\n\n` : ""}${it.lastReview.notes}`);
  for (const v of it.previousVersions ?? []) md += section(`Bản v${v.version} trước đó (${v.by})`, v.content);
  return md;
}

async function pull(taskId) {
  if (!taskId) fail("Dùng: pull <taskId>");
  const cfg = await loadConfig();
  const { items } = await api(cfg, "GET", `/me/work?task=${encodeURIComponent(taskId)}`);
  const it = items[0];
  if (!it) fail("Không thấy việc này trong danh sách chờ của bạn (đã có người nhận, hoặc không ở Sẵn sàng / Đang làm).");
  await api(cfg, "POST", `/tasks/${taskId}/claim`, { runner: "claude-local" });
  const dir = join(WORK_DIR, taskId);
  await mkdir(dir, { recursive: true });
  const agentDir = it.agent ? `agents/${it.agent.slug}` : null;
  await writeFile(join(dir, "brief.md"), renderBrief(it, agentDir), "utf8");
  await writeFile(join(dir, "context.json"), JSON.stringify(it, null, 2), "utf8");
  out(`✓ Đã nhận việc "${it.task.title}" (Đang làm).`);
  out(`  Brief:      ${join(dir, "brief.md")}`);
  if (agentDir) out(`  Agent:      ${agentDir}/ (agent.md, skills/, checklists/, examples/, knowledge/)`);
  out(`  Nộp bài:    node tools/gohub.mjs submit ${taskId} ${join(dir, "deliverable.md")}`);
}

async function submit(taskId, file) {
  if (!taskId || !file) fail("Dùng: submit <taskId> <file.md>");
  const cfg = await loadConfig();
  const content = await readFile(resolve(file), "utf8");
  if (!content.trim()) fail("File rỗng.");
  const r = await api(cfg, "POST", `/tasks/${taskId}/artifacts`, { content });
  out(`✓ Đã nộp v${r.artifact.version} — việc chuyển sang ${r.task.status === "in_review" ? "Chờ duyệt" : r.task.status}. Người duyệt sẽ thấy trong Nhiệm vụ.`);
}

const [cmd, ...args] = process.argv.slice(2);
const commands = { login, status, work, pull, submit };
if (!cmd || !commands[cmd]) {
  out("gohub — Claude Code ↔ GOHUB AI Office\n\n  login <apiUrl>\n  status\n  work\n  pull <taskId>\n  submit <taskId> <file>\n");
  process.exit(cmd ? 1 : 0);
}
commands[cmd](...args).catch((e) => fail(e?.message ?? String(e)));
