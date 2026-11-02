# gohub-agents

Repo chứa đội agent của GOHUB (PRD V2 §6 của GOHUB AI Office). Một bộ file phục vụ hai nơi:

- **Claude Code** nạp repo như một plugin marketplace: mỗi thư mục `agents/<slug>/` là một plugin với `skills/`, `agents/<slug>.md` (subagent) và `checklists/`.
- **Runner của GOHUB AI Office** clone repo, đọc `agents/<slug>/agent.md` (front-matter: model, trần token, ngân sách; thân: system prompt) và lắp prompt từ `skills/*/SKILL.md`, `checklists/`, `examples/`, rồi gọi Gemini. Mỗi run ghi SHA của repo.

Huấn luyện agent = sửa file trong repo này. Vòng lặp: reviewer từ chối → Coach đề xuất diff → chủ dự án duyệt → bot commit (TASK-301..304).

## Bố cục

```
.claude-plugin/marketplace.json   # danh sách plugin (content, coach)
agents/<slug>/
  .claude-plugin/plugin.json      # manifest plugin Claude Code
  agent.md                        # nguồn sự thật cho runner: model, ngân sách, system prompt, hợp đồng output
  agents/<slug>.md                # subagent mỏng cho Claude Code (chiếu từ agent.md)
  skills/<tên>/SKILL.md           # kiến thức và cách làm — nơi huấn luyện diễn ra
  checklists/pre-submit.md        # tự kiểm trước khi nộp
  examples/good|bad/              # artifact đã chấp nhận / bị từ chối kèm nhận xét
  knowledge/                      # markdown thêm tay
base/                             # bộ skill nền vendored, ghim SHA trong base/PINS.md
scripts/validate.mjs              # kiểm tra cấu trúc
```

## Dùng trong Claude Code

```bash
claude plugin validate .
claude plugin marketplace add ./gohub-agents      # từ thư mục cha
claude plugin install content@gohub-agents --scope project
```

Khi repo đã lên GitHub org, các dự án khai báo trong `.claude/settings.json`:

```json
{
  "extraKnownMarketplaces": {
    "gohub-agents": { "source": { "source": "github", "repo": "<org>/gohub-agents" } }
  },
  "enabledPlugins": { "content@gohub-agents": true, "coach@gohub-agents": true }
}
```

## Làm việc bằng Claude Code trên máy bạn (nhân viên)

Từ 2026-11-02 một bước của dây chuyền (hoặc một task) có thể chạy bằng **Claude Code của chính bạn** thay cho Gemini trên máy chủ: nền tảng vẫn giữ brief, duyệt bài và huấn luyện; máy bạn làm phần viết và nộp qua API bằng mã kết nối cá nhân. Cài một lần (~5 phút):

```bash
# 1. Cài Claude Code (https://claude.com/claude-code) và đăng nhập bằng tài khoản Claude của bạn.
# 2. Tải kho agent về máy
git clone https://github.com/trungtrumso/gohub-agents.git
cd gohub-agents
# 3. Trong GOHUB AI Office: menu trái → "Kết nối Claude Code" → Tạo mã (hiện một lần). Rồi:
node tools/gohub.mjs login https://<địa-chỉ-office>/api     # dán mã khi được hỏi; lưu vào ~/.gohub/config.json
node tools/gohub.mjs status
# 4. Làm việc
claude --plugin-dir ./plugins/gohub-work
#   trong Claude Code gõ:  /gohub-work:lam-viec
```

`tools/gohub.mjs` (Node 18+, không cần cài gì thêm): `work` (việc đang chờ bạn hoặc bước agent chạy bằng Claude Code), `pull <taskId>` (nhận việc, ghi `.gohub/<id>/brief.md` gồm brief, tiêu chí, bài các bước trước, ghi chú lần bị trả), `submit <taskId> <file>` (nộp → Chờ duyệt). Skill `lam-viec` dẫn Claude: đọc brief → nhập vai `agents/<slug>` (agent.md, skills, checklist, ví dụ) → viết `deliverable.md` → tự kiểm → hỏi bạn rồi nộp. Thư mục `.gohub/` không vào git. Mã kết nối thu hồi được ở cùng trang; mỗi máy một mã.

## Quy tắc

- Không dữ liệu khách hàng, mã eSIM, thông tin thanh toán, secret trong bất kỳ file nào.
- Skill là markdown thuần; không cú pháp riêng vendor.
- Mọi thay đổi skill qua commit; bot chỉ commit thay đổi đã được người duyệt.
- `node scripts/validate.mjs` phải sạch lỗi trước khi commit.
