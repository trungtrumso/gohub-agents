---
name: draft-content
description: Bước 2 của Content agent — viết bản nháp theo kết quả tiếp nhận brief, đúng loại nội dung và văn phong, có nguồn cho số liệu. Dùng sau brief-intake.
uses: [copywriting, content-strategy]
---

# Viết nháp

## Nguyên tắc chung (mọi ngôn ngữ)

- Mở đầu bằng điều người đọc được lợi, không bằng GOHUB.
- Một ý mỗi đoạn; đoạn ngắn; câu chủ động.
- Mọi số liệu thị trường, giá, tốc độ, vùng phủ đều có **nguồn và ngày** ngay cạnh, hoặc ghi rõ là ước tính. Không bịa số.
- Không hứa điều GOHUB không kiểm soát (ví dụ tốc độ mạng của nhà mạng địa phương); dùng cách nói có điều kiện.
- Không dùng các dấu hiệu văn AI: cấu trúc "không phải X, mà là Y", liệt kê ba ý ép buộc, câu kết một dòng sáo rỗng, dấu gạch ngang dày đặc, từ ngữ thổi phồng. Chi tiết trong `base/skills/humanizer` (tiếng Anh) và `knowledge/style-guide-vi.md` (tiếng Việt).
  - **Sai**: Với eSIM của GOHUB, bạn có ngay Internet tốc độ cao ngay khi máy bay hạ cánh.
  - **Đúng**: Mua eSIM GOHUB trước khi bay, quét mã cài trong 2 phút, hạ cánh là có mạng ngay.

## Theo loại nội dung

| content_type | Khung | Lưu ý |
|---|---|---|
| `seo-article` | Tiêu đề chứa từ khoá chính → mở bài trả lời thẳng câu hỏi tìm kiếm → các H2 theo ý định tìm kiếm → FAQ 3–5 câu → CTA một dòng | Từ khoá lấy từ brief; không nhồi; `meta_description` ≤ 155 ký tự ở front-matter |
| `social-post` | Hook một câu → 2–4 câu giá trị → CTA | Tối đa 3 hashtag; viết riêng cho từng nền tảng nếu brief nêu |
| `landing` | Hero (lợi ích + CTA) → 3 lợi ích có bằng chứng → cách hoạt động → FAQ → CTA lặp | Theo `base/skills/copywriting`: một trang, một hành động |
| `email` | Tiêu đề ≤ 50 ký tự → một ý → một CTA | `preheader` ở front-matter |
| `ads` | 3–5 biến thể tiêu đề + mô tả theo giới hạn ký tự của kênh | Ghi giới hạn ký tự đã áp dụng |
| `other` | Theo brief | Ghi khung đã chọn trong `assumptions` |

## Cấu trúc artifact

Tuân theo hợp đồng trong `agent.md`: front-matter (`task_id`, `agent`, `language`, `content_type`, `word_count`, `criteria_checked`, `assumptions`) rồi nội dung. `criteria_checked` điền ở bước self-review, nhưng bản nháp đã phải bám từng `AC-n`.

## Tham chiếu bộ nền

- `base/skills/copywriting`: cách viết tiêu đề, lợi ích, CTA, tránh AI tells.
- `base/skills/content-strategy`: khi brief yêu cầu đề xuất chủ đề hoặc cụm nội dung thay vì một bài cụ thể.

<!-- kiểm tra editor TASK-512 -->
