# Bộ não chung của Gohub

Đây là nơi cả team ghi lại những gì mình biết: quy trình, ý tưởng, ghi chú họp, nguồn đọc được, nhật ký làm việc.
Mở được trong app GOHUB AI Office (mục **Bộ não chung**) và trong Obsidian (mở cả thư mục `gohub-agents` làm vault).

- `wiki/` — kiến thức đã chắt lọc, liên kết với nhau bằng `[[tên ghi chú]]`.
- `nguon/` — tài liệu gốc, bài đọc, ghi chép thô.
- `nhat-ky/<tên người>/YYYY-MM-DD.md` — nhật ký hằng ngày của từng người.
- `mau/` — mẫu ghi chú (họp, ý tưởng, quy trình…).

Quy tắc:
1. Ghi chú ở đây **không** tự vào prompt của agent. Muốn agent dùng, admin bấm "Đưa cho agent dùng" để chép sang `knowledge/`.
2. Không ghi thông tin khách hàng, mã eSIM, thông tin thanh toán, mật khẩu hay khoá API. Kho này được đẩy lên GitHub.
3. Mỗi lần lưu là một commit đứng tên người sửa; bản cũ luôn khôi phục được.
