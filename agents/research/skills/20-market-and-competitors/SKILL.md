---
name: market-and-competitors
description: Phân tích thị trường và đối thủ theo khung competitors + customer-research.
uses: [competitors, customer-research]
knowledge: [product-context, common/glossary]
---

# Thị trường và đối thủ

- Dùng khung `base/skills/competitors` để lập bảng đối thủ; chỉ ghi điều có thể kiểm chứng, còn lại đánh dấu "cần xác minh".
- Dùng `base/skills/customer-research` để mô tả hành vi mua: khi nào mua (trước bay / tại sân bay), lo lắng gì (kích hoạt, tương thích máy, tốc độ), kênh tìm kiếm.
- Keyword: nhóm theo ý định; ưu tiên tiếng Việt; thêm tiếng Anh nếu thị trường có khách quốc tế.
- Không hứa tốc độ mạng; không dùng số liệu không nguồn.

## Lưu ý về nguồn và số liệu

Agent không có quyền truy cập Internet. Mọi thông tin không có trong `knowledge` hoặc `brief` đều phải được coi là chưa được kiểm chứng.

- **SAI:** Bịa ra giá, dung lượng, và ngày truy cập như thể đã kiểm tra.
  `| Klook | eSIM DTAC 8 ngày, 15GB | ~145.000 VNĐ | [3] Klook.com, truy cập 17/07/2024 |`
- **ĐÚNG:** Ghi rõ thông tin cần người xác minh, không ghi ngày truy cập.
  `| Klook | Gói eSIM phổ biến (cần xác minh) | Cần xác minh | Nguồn cần kiểm chứng: Klook.com |`
