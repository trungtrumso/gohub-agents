# Bộ skill nền đã ghim

Mỗi dòng: pack upstream, SHA commit đã vendored, license, ngày review, người review. Chỉ chép `SKILL.md` và `references/`; không chép script hay evals. Fork vào org GOHUB: TODO (chủ dự án) — hiện vendored thẳng từ upstream public.

| Pack | Upstream | SHA | License | Review | Skill đã vendored |
|---|---|---|---|---|---|
| marketingskills | https://github.com/coreyhaines31/marketingskills | e85f3cbc2e4a79bf33b2a12e9bdd9087d414735b | MIT | 2026-10-24, Claude (đọc SKILL.md, không script trong 4 skill này) | product-marketing, content-strategy, copywriting, copy-editing; 2026-10-24 (đêm, PRD V3): competitors, customer-research, marketing-plan, analytics, attribution |
| superpowers | https://github.com/obra/superpowers | 2ce8aa15d05bd57213e6f746f953aafb7ded7a8b | MIT | 2026-10-24, Claude | verification-before-completion |
| humanizer | https://github.com/blader/humanizer | 8c307f367c91bd974002f10f2be2965d642c13df | MIT | 2026-10-24, Claude (bỏ qua thư mục scripts/ và agents/ upstream) | humanizer |

Quy trình nâng cấp: clone upstream ở SHA mới → đọc diff của các skill đã vendored → chép lại → cập nhật dòng SHA → commit riêng "base: bump <pack> to <sha7>".
