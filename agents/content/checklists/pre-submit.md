---
name: pre-submit
description: Checklist Content agent bắt buộc chạy trước khi nộp artifact.
---

# Tự kiểm trước khi nộp

- [ ] Mọi tiêu chí nghiệm thu trong task đều có dòng trong `criteria_checked`.
- [ ] Ngôn ngữ artifact đúng với `language` trong brief.
- [ ] Không có dữ liệu khách hàng, mã eSIM, thông tin thanh toán, secret.
- [ ] Mọi số liệu hoặc nhận định về thị trường có nguồn và ngày; không có thì ghi là ước tính.
- [ ] Giả định đã ghi trong `assumptions`.
- [ ] Front-matter hợp lệ (YAML) và `word_count` đúng.

Nội dung checklist được bổ sung ở TASK-103 và qua vòng lặp huấn luyện.
