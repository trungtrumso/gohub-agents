---
name: lam-viec
description: Làm một việc của GOHUB AI Office từ máy này — kéo việc đang chờ qua tools/gohub.mjs, nhập vai đúng agent của bước đó (agents/<slug>), viết bài, tự kiểm theo checklist, hỏi người dùng rồi nộp. Dùng khi người dùng gõ /gohub-work:lam-viec, "làm việc", "kéo việc", "nộp bài".
---

# Làm việc cho GOHUB AI Office

Bạn đang ở trong kho `gohub-agents` trên máy của một nhân viên GOHUB. Nền tảng (GOHUB AI Office) giữ brief, dây chuyền, duyệt bài và huấn luyện; bạn làm phần viết thay cho Gemini trên máy chủ. Mọi trao đổi với nền tảng đi qua `node tools/gohub.mjs` (API + mã kết nối của người dùng); bạn không bao giờ chạm database.

## Quy trình

1. **Xem việc chờ:** chạy `node tools/gohub.mjs work`. Nếu lỗi "Chưa login" → bảo người dùng tạo mã ở trang *Kết nối Claude Code* rồi chạy `node tools/gohub.mjs login <apiUrl>` (họ dán mã, bạn không được hỏi mã để dán hộ). Nếu người dùng đã nói id việc, bỏ qua bước chọn.
2. **Chọn một việc** (hỏi người dùng nếu có nhiều) và **nhận:** `node tools/gohub.mjs pull <taskId>` → in ra đường dẫn `.gohub/<taskId>/brief.md` và thư mục agent.
3. **Đọc brief.md** trọn vẹn: mô tả, tiêu chí nghiệm thu, dữ liệu đầu vào, bài các bước trước, và — nếu có — *lần duyệt gần nhất bị từ chối* với ghi chú của người duyệt và bản cũ. Bản mới phải sửa đúng những gì bị chê.
4. **Nhập vai agent của bước:** đọc `agents/<slug>/agent.md` (vai trò, nguyên tắc, hợp đồng output), rồi **tất cả** `agents/<slug>/skills/*/SKILL.md` theo thứ tự tên thư mục, `agents/<slug>/checklists/pre-submit.md`, vài ví dụ trong `agents/<slug>/examples/good` (và `bad` để tránh), và `agents/<slug>/knowledge/` nếu có. Các skill nền dùng chung nằm trong `base/`. Làm đúng như agent đó sẽ làm; không đổi hợp đồng output.
5. **Viết bài** vào `.gohub/<taskId>/deliverable.md`: đúng loại bài và front-matter bắt buộc ghi trong brief; tiếng Việt trừ khi brief nói khác; không bịa số liệu hay nguồn — thiếu dữ liệu thì nói rõ trong bài, không đoán.
6. **Tự kiểm:** rà từng dòng của `checklists/pre-submit.md` và từng tiêu chí nghiệm thu; sửa cho đạt. Không có thông tin khách hàng, mã eSIM, thanh toán, mật khẩu trong bài.
7. **Hỏi trước khi nộp:** tóm tắt 3–5 dòng (bài gì, dài bao nhiêu, đã đạt tiêu chí nào, điểm còn băn khoăn) và hỏi người dùng "Nộp không?". Chỉ khi họ đồng ý: `node tools/gohub.mjs submit <taskId> .gohub/<taskId>/deliverable.md`. Nộp xong, nói bài đã vào *Chờ duyệt*; người duyệt sẽ chấp nhận hoặc trả về (khi đó chạy lại `work` sẽ thấy việc với ghi chú).

## Không làm

- Không tự nộp khi chưa được đồng ý; không nộp bài rỗng hay dở dang.
- Không sửa file trong `agents/`, `base/` hay `plugins/` khi đang làm việc (huấn luyện agent đi qua Coach trên nền tảng).
- Không copy mã kết nối ra bất cứ đâu; không in `~/.gohub/config.json`.
- Không dùng dữ liệu ngoài brief và kho agent trừ khi skill của agent cho phép tìm web; khi tìm, ghi nguồn.
