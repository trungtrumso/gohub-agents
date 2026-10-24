---
name: propose-skill-change
description: Skill duy nhất của Coach — biến một lần từ chối thành một đề xuất thay đổi skill, checklist hoặc ví dụ nhỏ nhất có thể, kèm diff và lý do. Dùng khi nhận một review bị từ chối.
uses: []
---

# Đề xuất thay đổi skill

## Phân loại lý do từ chối trước

| Reviewer chê | Sửa ở đâu | Không sửa ở đâu |
|---|---|---|
| Sai sự thật, thiếu nguồn | `skills/20-draft-content` mục số liệu, hoặc thêm ví dụ bad | Không thêm "hãy chính xác" vào agent.md |
| Giọng văn, câu máy | `knowledge/style-guide-<lang>.md` (thêm mẫu sai → đúng), ví dụ bad | Không đổi hợp đồng output |
| Sai cấu trúc loại nội dung | Bảng khung trong `skills/20-draft-content` | — |
| Bỏ sót tiêu chí | `skills/30-self-review` hoặc `checklists/pre-submit.md` | — |
| Thiếu bối cảnh sản phẩm | Ghi đề xuất là **cần người điền `knowledge/product-context.md`**, `risk: medium`, diff có thể rỗng | Không bịa bối cảnh |

## Viết đề xuất

1. Trích đúng câu hoặc đoạn trong artifact bị từ chối minh hoạ lỗi; đặt vào `examples/bad/<task-id>.md` cùng ghi chú reviewer.
2. Nếu reviewer đưa bản sửa, đặt vào `examples/good/<task-id>.md`.
3. Sửa **một** file hướng dẫn, thêm tối đa 5 dòng, ưu tiên dạng "sai → đúng" có ví dụ.
4. Viết unified diff (`git apply` được), lý do một đoạn, `risk` theo checklist.
5. Chạy `checklists/pre-submit.md` của Coach.

## Không làm

- Không xoá luật bảo mật hay dữ liệu khách hàng.
- Không sửa nhiều agent trong một đề xuất.
- Không thêm câu lệnh chung chung ("viết hay hơn", "cẩn thận hơn"); nếu không chỉ ra được lỗi cụ thể, ghi `summary: không đủ thông tin để sửa skill` và chỉ thêm ví dụ bad.
