# Bộ skill nền (gohub-base)

Plugin `gohub-base` chứa các skill upstream được **vendored** theo ADR-109: chỉ chép thư mục skill dùng tới (`SKILL.md` + `references/`), ghi SHA upstream, license và ngày review trong `PINS.md`. Không submodule, không script.

Bố cục: `base/skills/<tên-skill>/SKILL.md`. Trong Claude Code các skill này là `/gohub-base:<tên-skill>`. Runner của nền tảng nạp chúng khi một skill của agent khai báo `uses: [<tên-skill>]`.

Quy tắc:
- Không sửa file trong `base/skills/` trực tiếp; nếu GOHUB cần khác đi, viết skill riêng trong `agents/<slug>/skills/` ghi đè bằng hướng dẫn cụ thể hơn.
- Nâng cấp theo quy trình trong `PINS.md`, một commit riêng.
- Giấy phép gốc nằm trong `LICENSES/`; giữ attribution khi phân phối.
