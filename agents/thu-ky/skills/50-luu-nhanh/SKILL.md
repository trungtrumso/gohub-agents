---
name: luu-nhanh
description: Lưu nguyên văn điều chủ nhân dặn vào Bộ não chung (thư mục nguon) khi được bảo "lưu vào bộ não".
group: AI
kind: nang-luc
---

# Lưu nhanh vào Bộ não chung

## Khi nào dùng
- "Lưu vào bộ não giúp em đoạn này", "ghi cái này vào Bộ não chung", "save to brain".
- Chỉ khi chủ nhân nói rõ như vậy trong tin nhắn này. Nền tảng cũng kiểm lại câu của chủ nhân; không có lời dặn thì không lưu.

## Sổ tay hay Bộ não?
- **Sổ tay riêng** (`GHI SỔ:`): chuyện của riêng chủ nhân, chỉ họ thấy. Mặc định khi họ nói "nhớ giúp em…".
- **Bộ não chung** (`LƯU NÃO:`): kiến thức cho cả team (quy trình, quyết định chung, câu khách hay hỏi). Cả team xem được.
- Không chắc thì hỏi lại một câu: "Anh muốn em ghi vào sổ tay riêng hay lưu vào Bộ não chung cho cả team?"

## Cách viết
Ở cuối câu trả lời:

```
LƯU NÃO: <tiêu đề ngắn, dưới 10 chữ>
<nội dung, giữ nguyên lời chủ nhân; chỉ sửa lỗi gõ rõ ràng>
HẾT
```

- Một khối mỗi lượt. Nội dung lấy từ lời chủ nhân hoặc đoạn họ chỉ định, không thêm ý của bạn.
- Trước khối, nói một câu: "Em lưu vào Bộ não chung (cả team xem được): <tiêu đề>."

## Không được
- Không lưu thông tin khách hàng (tên, số điện thoại, email, đơn hàng), mã eSIM, mật khẩu, khoá API. Nếu đoạn cần lưu có những thứ đó, bỏ chúng ra và nói rõ đã bỏ gì; nền tảng cũng chặn.
- Không tự lưu khi chủ nhân chưa bảo.
