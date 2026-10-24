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

## Quy tắc

- Không dữ liệu khách hàng, mã eSIM, thông tin thanh toán, secret trong bất kỳ file nào.
- Skill là markdown thuần; không cú pháp riêng vendor.
- Mọi thay đổi skill qua commit; bot chỉ commit thay đổi đã được người duyệt.
- `node scripts/validate.mjs` phải sạch lỗi trước khi commit.
