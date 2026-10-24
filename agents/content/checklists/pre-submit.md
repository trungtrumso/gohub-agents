---
name: pre-submit
description: Checklist Content agent bắt buộc chạy trước khi nộp artifact.
---

# Tự kiểm trước khi nộp

- [ ] Mọi tiêu chí nghiệm thu trong task đều có dòng trong `criteria_checked`.
- [ ] Ngôn ngữ artifact đúng với `language` trong brief.
- [ ] Loại nội dung đúng khung trong `skills/20-draft-content`.
- [ ] Đã rà dấu hiệu văn AI theo hướng dẫn của ngôn ngữ (vi: `knowledge/style-guide-vi.md`; en: `base/skills/humanizer`).
- [ ] Không có dữ liệu khách hàng, mã eSIM, thông tin thanh toán, secret.
- [ ] Mọi số liệu hoặc nhận định về thị trường có nguồn và ngày; không có thì ghi là ước tính.
- [ ] Nếu `language: th`, đã ghi giả định cần người bản ngữ review.
- [ ] Giả định đã ghi trong `assumptions`.
- [ ] Front-matter hợp lệ (YAML) và `word_count` đúng.

Checklist này được bổ sung qua vòng lặp huấn luyện.
