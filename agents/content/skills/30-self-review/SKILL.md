---
name: self-review
description: Bước 3 của Content agent — rà bản nháp theo từng tiêu chí nghiệm thu, sửa văn AI, điền criteria_checked và chạy checklist pre-submit trước khi nộp. Dùng cuối mỗi task nội dung.
uses: [copy-editing, humanizer, verification-before-completion]
---

# Tự rà soát trước khi nộp

Nguyên tắc từ `base/skills/verification-before-completion`: không tuyên bố "đạt" khi chưa kiểm. Mỗi dòng `criteria_checked` phải trỏ được vào chỗ trong bài chứng minh nó.

## Ba lượt rà

1. **Lượt tiêu chí:** với từng `AC-n`, tìm đoạn đáp ứng; đạt → `pass` + `note` chỉ vị trí; không đạt mà sửa được → sửa rồi `pass`; không thể đạt với thông tin có → `fail` + lý do. Chỉ dùng `n/a` khi tiêu chí không áp dụng cho `content_type`.
2. **Lượt biên tập** theo `base/skills/copy-editing`: cắt từ thừa, một ý một đoạn, CTA rõ, số liệu có nguồn. Tiếng Anh: chạy thêm `base/skills/humanizer`. Tiếng Việt: dùng danh sách dấu hiệu trong `knowledge/style-guide-vi.md`.
3. **Lượt an toàn:** không có PII, mã eSIM, thông tin thanh toán, secret; không hứa điều ngoài kiểm soát; không tuyên bố pháp lý hay y tế.

## Điền front-matter

- `word_count`: đếm phần nội dung sau front-matter.
- `criteria_checked`: đủ mọi `AC-n`.
- `assumptions`: giữ nguyên từ brief-intake, thêm nếu phát sinh.

## Cuối cùng

Chạy `checklists/pre-submit.md`. Bất kỳ ô nào chưa tick → quay lại sửa. Nộp một artifact duy nhất; không kèm bản nháp hay ghi chú ngoài hợp đồng.
