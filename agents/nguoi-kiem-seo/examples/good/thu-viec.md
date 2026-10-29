---
reviewer_note: "Bài thử việc 2026-10-29, admin đánh dấu là ví dụ tốt khi tuyển."
task_id: thu-viec
agent: nguoi-kiem-seo
agent_commit: f9a1b2c
language: vi
content_type: review
word_count: 158
score: 40
criteria_checked:
  - { id: "Mở bài trả lời thẳng ý định tìm kiếm", status: pass, note: "Bài viết giới thiệu ngay sản phẩm, giá và nơi mua." }
  - { id: "Số liệu có nguồn", status: fail, note: "Các số liệu (giá, 5G) không có nguồn." }
  - { id: "Không hứa điều chưa xác nhận", status: fail, note: "Nhiều khẳng định chưa được xác minh." }
  - { id: "Có FAQ", status: fail, note: "Bài viết không có mục FAQ." }
  - { id: "CTA nêu nơi mua", status: pass, note: "CTA rõ ràng: Mua tại gohub.com." }
assumptions:
  - Bài viết được cung cấp là một đoạn trích, không phải toàn bộ nội dung. Việc đánh giá tiêu chí "Có FAQ" dựa trên đoạn trích này.
---

# Đánh giá bài viết: eSIM Singapore 4 ngày

Bài viết chưa đạt yêu cầu nghiệm thu. Dù có mở bài và CTA tốt, bài viết chứa nhiều khẳng định chưa được xác minh, vi phạm chính sách của GOHUB, và thiếu các thành phần quan trọng như nguồn và FAQ.

## Đánh giá chi tiết theo rubric

| Tiêu chí | Kết quả | Bằng chứng / Ghi chú |
|---|---|---|
| Mở bài trả lời thẳng ý định tìm kiếm | **Đạt** | Đoạn mở đầu nêu được sản phẩm, nơi mua, giá và tính năng chính. |
| Số liệu có nguồn | **Chưa đạt** | Các khẳng định như "5G phủ khắp đảo" và "Giá chỉ 120.000đ" không có nguồn xác thực. |
| Không hứa điều chưa xác nhận | **Chưa đạt** | Trích dẫn: "tốc độ không giới hạn, hỗ trợ 24/7". Đây là những cam kết mạnh, chưa được xác minh. |
| Có FAQ | **Chưa đạt** | Đoạn trích được cung cấp không có mục Hỏi-Đáp (FAQ). |
| CTA nêu nơi mua | **Đạt** | Trích dẫn: "Mua tại gohub.com". |

## Danh sách việc cần sửa (theo thứ tự ưu tiên)

1.  **Xóa/sửa các khẳng định chưa xác minh:** Các tuyên bố "tốc độ không giới hạn" và "hỗ trợ 24/7" cần được xác minh với bộ phận sản phẩm hoặc xóa bỏ theo `knowledge/common/claims-policy`. Giá "120.000đ" cũng cần được kiểm tra lại tính chính xác tại thời điểm đăng bài.
2.  **Bổ sung nguồn cho các số liệu:** Cần thêm nguồn cho các thông tin như "5G phủ khắp đảo" (ví dụ: dẫn link từ nhà mạng địa phương).
3.  **Thêm mục FAQ:** Bổ sung một mục Hỏi-Đáp để trả lời các câu hỏi thường gặp của người dùng về eSIM Singapore, cách cài đặt, xử lý sự cố...
