# Skills

Mỗi skill là một thư mục `skills/<tên-skill>/SKILL.md` (định dạng Claude Code; runner của nền tảng đọc cùng file). Front-matter tối thiểu: `name`, `description`; thân là hướng dẫn markdown thuần (ADR-108: không cú pháp riêng vendor). Runner nạp các SKILL.md theo thứ tự tên thư mục; đặt tiền tố số để kiểm soát thứ tự, ví dụ `10-brief-intake`, `20-draft-content`, `30-self-review`. Trong Claude Code, skill được gọi là `/<plugin>:<tên-skill>`.

Skill thật được viết ở TASK-103. Các bộ nền (marketingskills, superpowers, humanizer) được vendored vào `base/` ở TASK-104 và tham chiếu từ đây bằng tên.
