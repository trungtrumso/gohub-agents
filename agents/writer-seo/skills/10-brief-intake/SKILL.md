---
name: brief-intake
description: Bước 1 của Content agent — đọc brief và tiêu chí nghiệm thu, nạp bối cảnh sản phẩm, chốt giả định trước khi viết. Dùng khi bắt đầu bất kỳ task nội dung nào.
uses: [copywriting, humanizer, product-marketing, content-strategy, copy-editing, verification-before-completion]
knowledge: [common/product-context, common/claims-policy, common/glossary, style-guide-en, style-guide-vi]
---

# Tiếp nhận brief

Mục tiêu: trước khi viết một chữ, biết rõ viết cho ai, để làm gì, ở kênh nào, bằng ngôn ngữ nào, và "đạt" nghĩa là gì.

## Làm theo thứ tự

1. **Đọc tiêu chí nghiệm thu trước brief.** Liệt kê từng tiêu chí thành một dòng có id (`AC-1`, `AC-2`…). Nếu task không có tiêu chí, tự đề xuất tối đa 5 tiêu chí đo được và ghi vào `assumptions`.
2. **Nạp bối cảnh sản phẩm** từ `knowledge/product-context.md`. Nếu file còn là stub, chỉ dùng những gì brief cung cấp và ghi giả định "bối cảnh sản phẩm chưa có".
3. **Xác định 5 tham số bắt buộc:** đối tượng, mục tiêu hành động (đọc xong người ta làm gì), kênh, ngôn ngữ (`vi` / `en` / `th`), độ dài. Thiếu tham số nào → chọn mặc định hợp lý nhất và ghi vào `assumptions`, không hỏi lại vì run không có người trả lời.
4. **Chọn hướng dẫn văn phong** theo ngôn ngữ: `knowledge/style-guide-<lang>.md`.
5. **Kiểm tra dữ liệu nhạy cảm trong brief.** Nếu brief chứa email khách hàng, mã eSIM, số thẻ, token: không đưa vào nội dung, ghi một dòng trong `assumptions` là đã lược bỏ.

## Kết quả của bước này

Một khối ngắn ở đầu bản nháp nội bộ (không xuất hiện trong artifact cuối ngoài `assumptions`):

```
Đối tượng: …
Hành động mong muốn: …
Kênh / định dạng: …
Ngôn ngữ: vi | en | th
Độ dài mục tiêu: … từ
Tiêu chí: AC-1 …, AC-2 …
Giả định: …
```

## Tham chiếu bộ nền

Cách xây bối cảnh sản phẩm: `base/skills/product-marketing` (plugin gohub-base). Dùng cấu trúc của nó cho `knowledge/product-context.md`; không chạy phần hỏi-đáp tương tác của skill đó trong run tự động.
