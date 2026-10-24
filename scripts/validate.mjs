// Kiểm tra cấu trúc repo gohub-agents. Chạy: node scripts/validate.mjs
// Không phụ thuộc package nào (parser front-matter tối giản, đủ cho các khoá phẳng + tools: []).
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warn = [];

const REQUIRED_AGENT_KEYS = ["name", "role", "model", "max_tokens_per_run", "max_usd_per_day", "tools", "version"];
const REQUIRED_DIRS = ["skills", "examples/good", "examples/bad", "checklists", "knowledge"];
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function frontMatter(file) {
  const text = readFileSync(file, "utf8");
  if (!text.startsWith("---\n") && !text.startsWith("---\r\n")) return null;
  const end = text.indexOf("\n---", 4);
  if (end < 0) return null;
  const block = text.slice(4, end).replace(/\r/g, "");
  const data = {};
  for (const line of block.split("\n")) {
    const m = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (m) data[m[1]] = m[2].trim();
  }
  return data;
}

function checkAgent(dir, slug) {
  if (!SLUG.test(slug)) errors.push(`${slug}: tên thư mục agent phải là slug chữ thường, gạch nối`);
  const agentMd = join(dir, "agent.md");
  if (!existsSync(agentMd)) return errors.push(`${slug}: thiếu agent.md`);
  const fm = frontMatter(agentMd);
  if (!fm) return errors.push(`${slug}: agent.md không có front-matter YAML`);
  for (const k of REQUIRED_AGENT_KEYS) if (!(k in fm)) errors.push(`${slug}: agent.md thiếu khoá '${k}'`);
  if (fm.name && fm.name !== slug) errors.push(`${slug}: front-matter name='${fm.name}' khác tên thư mục`);
  for (const n of ["max_tokens_per_run", "max_usd_per_day"]) {
    if (fm[n] !== undefined && !(Number(fm[n]) > 0)) errors.push(`${slug}: '${n}' phải là số dương`);
  }
  for (const d of REQUIRED_DIRS) if (!existsSync(join(dir, d))) errors.push(`${slug}: thiếu thư mục ${d}`);
  const skillsDir = join(dir, "skills");
  if (existsSync(skillsDir)) {
    const skills = readdirSync(skillsDir).filter((f) => statSync(join(skillsDir, f)).isDirectory());
    if (skills.length === 0) warn.push(`${slug}: chưa có skill nào — dự kiến TASK-103`);
    for (const f of skills) {
      if (!SLUG.test(f)) errors.push(`${slug}/skills/${f}: tên thư mục skill phải là slug`);
      const skillMd = join(skillsDir, f, "SKILL.md");
      if (!existsSync(skillMd)) { errors.push(`${slug}/skills/${f}: thiếu SKILL.md`); continue; }
      const sfm = frontMatter(skillMd);
      if (!sfm || !sfm.name || !sfm.description) errors.push(`${slug}/skills/${f}/SKILL.md: cần front-matter name + description`);
    }
  }
  const sub = join(dir, "agents", `${slug}.md`);
  if (!existsSync(sub)) warn.push(`${slug}: không có subagent agents/${slug}.md cho Claude Code`);
  else {
    const afm = frontMatter(sub);
    if (!afm || !afm.name || !afm.description) errors.push(`${slug}/agents/${slug}.md: cần front-matter name + description`);
    if (afm && afm.name && afm.name.includes(":")) errors.push(`${slug}/agents/${slug}.md: name không được chứa ':'`);
  }
  const checklist = join(dir, "checklists", "pre-submit.md");
  if (!existsSync(checklist)) errors.push(`${slug}: thiếu checklists/pre-submit.md`);
}

function checkMarketplace() {
  const mp = join(root, ".claude-plugin", "marketplace.json");
  if (!existsSync(mp)) return errors.push("thiếu .claude-plugin/marketplace.json");
  let json;
  try { json = JSON.parse(readFileSync(mp, "utf8")); } catch (e) { return errors.push(`marketplace.json không phải JSON hợp lệ: ${e.message}`); }
  if (!json.name || !SLUG.test(json.name)) errors.push("marketplace.json: 'name' phải là slug");
  if (!Array.isArray(json.plugins) || json.plugins.length === 0) return errors.push("marketplace.json: 'plugins' rỗng");
  for (const p of json.plugins) {
    if (!p.name || !SLUG.test(p.name)) errors.push(`marketplace.json: plugin name '${p.name}' phải là slug`);
    const src = typeof p.source === "string" ? p.source : null;
    if (!src || !src.startsWith("./")) { errors.push(`marketplace.json: plugin '${p.name}' cần source dạng './...' trỏ vào thư mục trong repo`); continue; }
    const dir = resolve(root, src);
    if (!existsSync(dir) || !statSync(dir).isDirectory()) errors.push(`marketplace.json: source '${src}' của '${p.name}' không tồn tại`);
    const pj = join(dir, ".claude-plugin", "plugin.json");
    if (!existsSync(pj)) errors.push(`${src}: thiếu .claude-plugin/plugin.json`);
    else {
      try { const j = JSON.parse(readFileSync(pj, "utf8")); if (j.name !== p.name) errors.push(`${src}/plugin.json: name '${j.name}' khác marketplace '${p.name}'`); }
      catch (e) { errors.push(`${src}/plugin.json không hợp lệ: ${e.message}`); }
    }
  }
}

function checkPins() {
  const pins = join(root, "base", "PINS.md");
  if (!existsSync(pins)) return warn.push("base/PINS.md chưa có — tạo ở TASK-104");
  const rows = readFileSync(pins, "utf8").split("\n").filter((l) => l.startsWith("| ") && !l.startsWith("| Pack") && !l.startsWith("|--"));
  for (const r of rows) {
    const cells = r.split("|").map((c) => c.trim());
    const sha = cells[3];
    if (!/^[0-9a-f]{40}$/.test(sha || "")) errors.push(`PINS.md: SHA không hợp lệ ở dòng: ${r.slice(0, 60)}`);
  }
}

const agentsDir = join(root, "agents");
const agents = existsSync(agentsDir) ? readdirSync(agentsDir).filter((d) => statSync(join(agentsDir, d)).isDirectory()) : [];
if (agents.length === 0) errors.push("không có agent nào trong agents/");
for (const a of agents) checkAgent(join(agentsDir, a), a);
checkMarketplace();
checkPins();

for (const w of warn) console.log(`WARN  ${w}`);
for (const e of errors) console.log(`ERROR ${e}`);
console.log(`${agents.length} agent, ${errors.length} lỗi, ${warn.length} cảnh báo`);
process.exit(errors.length ? 1 : 0);
