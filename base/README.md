# Bộ skill nền (base)

Các bộ upstream được **fork vào org GOHUB và vendored** vào đây theo ADR-109: chỉ chép những thư mục skill dùng tới, ghi SHA upstream, license và ngày review vào `PINS.md`. Không dùng submodule.

Quy trình (TASK-104):
1. Chủ dự án fork repo upstream vào org GOHUB trên GitHub.
2. Đọc từng `SKILL.md` và mọi script kèm theo trước khi chép.
3. Chép thư mục skill vào `base/<pack>/<skill>/`, giữ nguyên file LICENSE của pack.
4. Ghi một dòng vào `PINS.md`: pack, URL fork, SHA upstream, license, ngày review, người review.
5. Nâng cấp = lặp lại 2–4 trong một commit riêng.

Chưa có pack nào được vendored. `PINS.md` được tạo ở TASK-104.
