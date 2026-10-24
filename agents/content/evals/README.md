# Bộ kiểm tra (evals) của Content agent

Mỗi file `*.md` ở đây là một **case**: brief + tiêu chí nghiệm thu. Nền tảng ("Chạy bộ kiểm tra" trên trang agent)
chạy lại từng case ở phiên bản hiện tại, rồi một giám khảo (cùng model) chấm PASS/FAIL theo tiêu chí.
Kết quả lưu theo SHA để so sánh hai phiên bản.

Định dạng:

```markdown
---
title: Tên case
criteria: [AC-1 có CTA mua hàng, AC-2 không hứa tốc độ mạng]
---
Brief như khi giao task thật.
```

Hoặc để tiêu chí ở cuối file dưới tiêu đề `## Tiêu chí` (mỗi dòng một tiêu chí).

Ngoài các file này, nền tảng tự thêm tối đa 3 task gần nhất đã được **chấp nhận** làm case.
Mỗi case tốn 2 lần gọi model (bài + chấm). README này không được tính là case.
